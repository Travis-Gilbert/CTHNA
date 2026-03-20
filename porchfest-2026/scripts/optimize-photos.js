import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = 'public/photos';
const OUTPUT_DIR = 'public/photos';

const SIZES = [
  { suffix: 'sm', width: 640, webpQuality: 75, jpgQuality: 78 },
  { suffix: 'md', width: 1280, webpQuality: 80, jpgQuality: 80 },
  { suffix: 'lg', width: 2000, webpQuality: 82, jpgQuality: 82 },
];

async function run() {
  const files = await readdir(INPUT_DIR);
  const jpgs = files.filter(f => /\.jpg$/i.test(f) && !/-sm\.|-md\.|-lg\./.test(f));

  console.log(`Found ${jpgs.length} source images`);

  for (const file of jpgs) {
    const { name } = parse(file);
    const inputPath = join(INPUT_DIR, file);
    const meta = await sharp(inputPath).metadata();
    console.log(`\n${file} (${meta.width}x${meta.height})`);

    for (const size of SIZES) {
      // Skip upscaling
      if (meta.width < size.width) {
        console.log(`  skip ${size.suffix} (source narrower than ${size.width}px)`);
        continue;
      }

      const webpOut = join(OUTPUT_DIR, `${name}-${size.suffix}.webp`);
      const jpgOut = join(OUTPUT_DIR, `${name}-${size.suffix}.jpg`);

      await sharp(inputPath)
        .resize(size.width)
        .webp({ quality: size.webpQuality })
        .toFile(webpOut);

      await sharp(inputPath)
        .resize(size.width)
        .jpeg({ quality: size.jpgQuality, mozjpeg: true })
        .toFile(jpgOut);

      console.log(`  ${size.suffix}: webp + jpg`);
    }
  }

  console.log('\nDone.');
}

run().catch(console.error);
