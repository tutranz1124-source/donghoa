const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'public/uploads';
fs.readdirSync(dir).forEach(file => {
  const full = path.join(dir, file);
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    sharp(full).metadata().then(m => {
      console.log(`${file}: ${m.width}x${m.height}`);
    }).catch(() => {});
  }
});
