// Stay Studio — client-side image normalizer.
// We accept uploads up to 8MB but localStorage caps us at ~5MB, so before
// stashing a data URL we downscale oversized images and transcode to JPEG
// if still too large. PNGs with alpha are preserved when the result fits.

const MAX_DIMENSION = 2400;
const MAX_BYTES_AFTER = 1.5 * 1024 * 1024;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't decode image"));
    img.src = src;
  });
}

function estimateBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return dataUrl.length;
  return Math.floor((dataUrl.length - comma - 1) * 0.75);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Couldn't read file"));
    reader.readAsDataURL(file);
  });
}

/** Accept a File, return a storage-friendly data URL. SVG passes through as
 * text (vector, tiny); rasters get resized to fit MAX_DIMENSION and optionally
 * re-encoded as JPEG to stay under the localStorage budget. */
export async function normalizeUploadedImage(file: File): Promise<string> {
  if (file.type === "image/svg+xml") {
    return fileToDataUrl(file);
  }

  const originalDataUrl = await fileToDataUrl(file);

  if (estimateBytes(originalDataUrl) <= MAX_BYTES_AFTER) {
    const probe = await loadImage(originalDataUrl);
    if (probe.naturalWidth <= MAX_DIMENSION && probe.naturalHeight <= MAX_DIMENSION) {
      return originalDataUrl;
    }
  }

  const img = await loadImage(originalDataUrl);
  const ratio = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * ratio);
  const h = Math.round(img.naturalHeight * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(img, 0, 0, w, h);

  // Try PNG first (preserves alpha); fall back to JPEG if still too heavy.
  const png = canvas.toDataURL("image/png");
  if (estimateBytes(png) <= MAX_BYTES_AFTER) return png;
  return canvas.toDataURL("image/jpeg", 0.88);
}
