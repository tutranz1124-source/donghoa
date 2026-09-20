const fs = require('fs');
const { execSync } = require('child_process');

const token = process.env.FIGMA_TOKEN || "";
const fileKey = 'Bnu9B1ayywc3WBtncYaFXO';

const nodeMap = {
  // Modern & Minimalist
  'modern_pendant': '135:112',
  'modern_bed': '135:114',
  'modern_arc_lamp': '135:115',
  'modern_armchair': '135:116',
  'modern_sofa': '135:117',
  
  // Cozy & Warm
  'cozy_slat_lamp': '135:120',
  'cozy_armchair': '135:123',
  'cozy_tables': '135:125',

  // Luxury & Classic
  'luxury_palm_lamp': '135:129',
  'luxury_bed': '135:130',
  'luxury_swatch_1': '135:131',
  'luxury_swatch_2': '135:132',
  'luxury_vases': '135:133',

  // Heritage & Retro
  'heritage_swatches_table': '135:139',
  'heritage_swatches_chair': '135:140',
  'heritage_chandelier': '135:141',
  'heritage_vignette': '135:142',
  'heritage_table': '135:143',
  'heritage_armchair': '135:144',

  // Section visuals
  'philosophy_photo': '135:40',
  'office_hero_scene': '135:156',
  'office_workplace_scene': '135:157',
};

async function main() {
  const ids = Object.values(nodeMap).join(',');
  console.log('Requesting Figma API for nodes...');
  
  const res = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${ids}&scale=2&format=png`, {
    headers: { 'X-Figma-Token': token }
  });
  
  if (!res.ok) {
    console.error('Figma API error:', res.status, await res.text());
    return;
  }
  
  const data = await res.json();
  const images = data.images;
  console.log('Received image URLs for', Object.keys(images).length, 'nodes');

  for (const [name, nodeId] of Object.entries(nodeMap)) {
    const url = images[nodeId];
    if (!url) {
      console.warn('No image URL for', name);
      continue;
    }
    const outputPath = `public/uploads/figma_${name}.png`;
    console.log(`Downloading ${name} (${nodeId})...`);
    try {
      execSync(`curl.exe -L -s -o "${outputPath}" "${url}"`);
      const stat = fs.statSync(outputPath);
      console.log(`✓ Saved ${outputPath} [${stat.size} bytes]`);
    } catch (err) {
      console.error(`Error downloading ${name}:`, err.message);
    }
  }

  console.log('All Figma assets successfully downloaded at 2x resolution!');
}

main().catch(console.error);

