const sharp = require('sharp');

async function run() {
  // Modern & Minimalist Showcase main images
  // From figma_modern_minimalist.png (1024x933)
  // Let's crop the pure furniture & room photos:
  // Photo A: Bed & Lamp setup
  await sharp('public/uploads/figma_modern_minimalist.png')
    .extract({ left: 50, top: 200, width: 440, height: 320 })
    .toFile('public/uploads/clean_modern_bed.png');

  // Photo B: Sofa & Living area
  await sharp('public/uploads/figma_modern_minimalist.png')
    .extract({ left: 50, top: 540, width: 440, height: 300 })
    .toFile('public/uploads/clean_modern_sofa.png');

  // Cozy & Warm Showcase
  // From figma_cozy_warm.png (1024x713)
  // Main Cozy Armchair & Wood table
  await sharp('public/uploads/figma_cozy_warm.png')
    .extract({ left: 50, top: 240, width: 480, height: 420 })
    .toFile('public/uploads/clean_cozy_armchair.png');

  // Luxury & Classic Showcase
  // From figma_luxury_classic.png (1024x719)
  // Luxury Bed & Golden Palm Lamp
  await sharp('public/uploads/figma_luxury_classic.png')
    .extract({ left: 50, top: 240, width: 480, height: 420 })
    .toFile('public/uploads/clean_luxury_bed.png');

  // Heritage & Retro Showcase
  // From figma_heritage_retro.png (1024x606)
  // Vintage Furniture & Industrial Setup
  await sharp('public/uploads/figma_heritage_retro.png')
    .extract({ left: 50, top: 200, width: 480, height: 380 })
    .toFile('public/uploads/clean_heritage_furniture.png');

  console.log('Successfully extracted all clean style showcase images!');
}

run().catch(console.error);
