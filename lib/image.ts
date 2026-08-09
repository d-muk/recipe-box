export interface ProcessImageOptions {
  maxDimension?: number;
  quality?: number;
}

export async function processImageFile(
  file: File,
  opts: ProcessImageOptions = {}
): Promise<string> {
  const { maxDimension = 900, quality = 0.75 } = opts;

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl);

    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = src;
  });
}
