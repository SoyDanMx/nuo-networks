/**
 * Regenera favicon / apple-touch con lienzo cuadrado y el isotipo escalado (~90%),
 * para que en pestañas (16–32px) se lea mejor que un PNG rectangular fino.
 *
 * Fuente: public/icon.png (isotipo). Salida: public/icon.png, icon-48.png, icon-192.png, apple-touch-icon.png
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public", "icon.png");

const BG = { r: 2, g: 6, b: 23, alpha: 1 };
/** Fracción del lado del cuadrado que ocupa el lado mayor del logo */
const FILL = 0.9;

const raw = readFileSync(inputPath);
const meta = await sharp(raw).metadata();
if (!meta.width || !meta.height) {
  throw new Error("No se pudo leer dimensiones de public/icon.png");
}

async function squarePng(size) {
  const maxSide = Math.max(meta.width, meta.height);
  const scale = (size * FILL) / maxSide;
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await sharp(raw).resize(w, h).png().toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG
    }
  })
    .composite([{ input: resized, left: Math.floor((size - w) / 2), top: Math.floor((size - h) / 2) }])
    .png()
    .toBuffer();
}

const icon512 = await squarePng(512);
const icon192 = await squarePng(192);
const icon48 = await squarePng(48);
const apple180 = await squarePng(180);

writeFileSync(join(root, "public", "icon.png"), icon512);
writeFileSync(join(root, "public", "icon-192.png"), icon192);
writeFileSync(join(root, "public", "icon-48.png"), icon48);
writeFileSync(join(root, "public", "apple-touch-icon.png"), apple180);

console.log("OK: public/icon.png (512), icon-48.png, icon-192.png, apple-touch-icon.png");
