import { writeFile } from 'node:fs/promises';
const ts = '20240925065523im_';
const base = `https://web.archive.org/web/${ts}/https://londonconcretesealing.ca/wp-content/uploads/2024/03/`;
const map = {
  'Concrete-Sealing-Drivweay.jpg': 'concrete-sealing-driveway.jpg',
  'London-Concrete-Sealing-Stamped-Concrete.jpg': 'stamped-concrete.jpg',
  'Sealing-Stampe-Concrete.jpg': 'sealing-stamped-concrete.jpg',
  'Ashlar-Slate-Stamped-Concrete-Sealing.webp': 'ashlar-slate-stamped.webp',
  'Concrete-Cleaning-and-Sealing-768x576.jpg': 'concrete-cleaning-sealing.jpg',
  'Concrete-Sealing-Coloured.jpg': 'concrete-sealing-coloured.jpg',
  'Concrete-Sealing-Services-St-Thomas.jpg': 'st-thomas-concrete-sealing.jpg',
  'Concrete-Sealing-in-Woostock-768x576.jpeg': 'woodstock-concrete-sealing.jpeg',
  'Exposed-Aggregate-Concrete-Sealing-768x576.jpg': 'exposed-aggregate-sealing.jpg',
  'Stamped-Concrete-6.jpg': 'stamped-concrete-2.jpg',
  'note-8667587539813806337-GALLERY-Broom-Finishes-image.jpg': 'broom-finishes.jpg',
  'London-Concrete-Sealing-Logo-1-copy.png': 'logo.png',
  'Favicon-300x300.png': 'favicon.png',
};
for (const [src, out] of Object.entries(map)) {
  try {
    const r = await fetch(base + src, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' });
    if (!r.ok) { console.log('HTTP', r.status, out); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    await writeFile('public/images/' + out, buf);
    console.log('OK', out, buf.length);
  } catch (e) { console.log('ERR', out, e.message); }
}
