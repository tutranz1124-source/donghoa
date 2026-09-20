const sharp = require('sharp');

async function run() {
  const input = 'public/uploads/figma_gallery_office.png';

  // Hero main office visual
  await sharp(input)
    .extract({ left: 468, top: 40, width: 385, height: 490 })
    .toFile('public/uploads/office_hero_main.png');
  console.log('Saved office_hero_main.png');

  // Card 1: pure image without bottom white area
  await sharp(input)
    .extract({ left: 45, top: 575, width: 245, height: 160 })
    .toFile('public/uploads/office_card_1.png');
  console.log('Saved office_card_1.png');

  // Card 2
  await sharp(input)
    .extract({ left: 315, top: 575, width: 245, height: 160 })
    .toFile('public/uploads/office_card_2.png');
  console.log('Saved office_card_2.png');

  // Card 3
  await sharp(input)
    .extract({ left: 585, top: 575, width: 245, height: 160 })
    .toFile('public/uploads/office_card_3.png');
  console.log('Saved office_card_3.png');
}

run().catch(console.error);
