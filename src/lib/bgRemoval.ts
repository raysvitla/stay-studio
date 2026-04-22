// Stay Studio — client-side background removal.
// Thin wrapper over @imgly/background-removal (ONNX/WASM, ~8MB model cached
// in the browser Cache API after the first run). We dynamic-import it at
// call time so the model + runtime stay out of the initial bundle.

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Couldn't read bg-removal output"));
    reader.readAsDataURL(blob);
  });
}

type Progress = (ratio: number) => void;

/** Run background removal on a data URL. Returns a new PNG data URL with alpha.
 * First call downloads ~8MB model — surface progress via the callback. */
export async function removeImageBackground(dataUrl: string, onProgress?: Progress): Promise<string> {
  const mod = await import("@imgly/background-removal");
  const removeBackground = mod.removeBackground ?? (mod as unknown as { default: typeof mod.removeBackground }).default;

  const blob = await removeBackground(dataUrl, {
    progress: (_key: string, current: number, total: number) => {
      if (onProgress && total > 0) onProgress(current / total);
    },
    output: { format: "image/png" },
  });
  return blobToDataUrl(blob);
}
