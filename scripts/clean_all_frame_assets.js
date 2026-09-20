const sharp = require('sharp');

async function processAll() {
  // 1. Philosophy Section Left Photo (from figma_philosophy.png 1024x569)
  // Left photo is at approximately left: 50, top: 40, width: 360, height: 490
  await sharp('public/uploads/figma_philosophy.png')
    .extract({ left: 50, top: 40, width: 365, height: 490 })
    .toFile('public/uploads/clean_philosophy_photo.png');
  console.log('Saved clean_philosophy_photo.png');

  // 2. Contact Section Left Photo (from figma_contact_form.png 1024x596)
  // Left photo is at approximately left: 50, top: 50, width: 365, height: 495
  await sharp('public/uploads/figma_contact_form.png')
    .extract({ left: 50, top: 50, width: 365, height: 495 })
    .toFile('public/uploads/clean_contact_photo.png');
  console.log('Saved clean_contact_photo.png');

  // 3. Styles Overview 4 Cards (from figma_styles_grid.png 1024x692)
  // Card 1: Modern (approx left: 50, top: 180, width: 200, height: 180)
  // Card 2: Cozy (approx left: 280, top: 180, width: 200, height: 180)
  // Card 3: Luxury (approx left: 510, top: 180, width: 200, height: 180)
  // Card 4: Heritage (approx left: 740, top: 180, width: 200, height: 180)
  const stylesMeta = await sharp('public/uploads/figma_styles_grid.png').metadata();
  console.log('styles_grid size:', stylesMeta.width, stylesMeta.height);

  await sharp('public/uploads/figma_styles_grid.png')
    .extract({ left: 45, top: 230, width: 215, height: 180 })
    .toFile('public/uploads/clean_style_modern.png');

  await sharp('public/uploads/figma_styles_grid.png')
    .extract({ left: 275, top: 230, width: 215, height: 180 })
    .toFile('public/uploads/clean_style_cozy.png');

  await sharp('public/uploads/figma_styles_grid.png')
    .extract({ left: 505, top: 230, width: 215, height: 180 })
    .toFile('public/uploads/clean_style_luxury.png');

  await sharp('public/uploads/figma_styles_grid.png')
    .extract({ left: 735, top: 230, width: 215, height: 180 })
    .toFile('public/uploads/clean_style_heritage.png');
  console.log('Saved clean style card photos');
}

processAll().catch(console.error);
