// Stay Studio — file → plain text for the deck generator.
// .txt/.md are free; .docx uses mammoth; .pdf uses pdfjs-dist. Heavy parsers
// are dynamic-imported so they don't bloat the initial bundle.

export const MAX_TEXT_CHARS = 40_000;

export async function parseUpload(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt") || name.endsWith(".md") || file.type === "text/plain" || file.type === "text/markdown") {
    return cap(await file.text());
  }

  if (name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    // mammoth ships a browser build; its published types are for Node but the
    // browser bundle exposes the same extractRawText API.
    const mammothMod = (await import("mammoth/mammoth.browser.js")) as {
      extractRawText: (opts: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
    };
    const arrayBuffer = await file.arrayBuffer();
    const res = await mammothMod.extractRawText({ arrayBuffer });
    return cap(res.value ?? "");
  }

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    // Worker: disable for simplicity — pdfjs can run on the main thread for text-only extraction.
    (pdfjs as { GlobalWorkerOptions: { workerSrc: string } }).GlobalWorkerOptions.workerSrc = "";
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    const pdf = await loadingTask.promise;
    const parts: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      parts.push(
        textContent.items
          .map((it) => ("str" in it ? it.str : ""))
          .join(" "),
      );
      if (parts.join("\n").length >= MAX_TEXT_CHARS) break;
    }
    return cap(parts.join("\n\n"));
  }

  throw new Error(`Unsupported file type: ${file.name}`);
}

function cap(s: string): string {
  const trimmed = s.trim();
  return trimmed.length > MAX_TEXT_CHARS ? trimmed.slice(0, MAX_TEXT_CHARS) : trimmed;
}
