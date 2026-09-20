const fs = require('fs');
const text = fs.readFileSync('C:/Users/kaizk/.gemini/antigravity/scratch/donghoa-property/figma_nodes_meta.txt', 'utf8');
const lines = text.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('  <frame ') || line.startsWith('  <canvas ') || line.startsWith('<canvas ') || line.includes('1:2')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
