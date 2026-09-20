const https = require('https');
const fs = require('fs');

const token = process.env.FIGMA_TOKEN || "";
const fileKey = 'Bnu9B1ayywc3WBtncYaFXO';

const req = https.request({
  hostname: 'api.figma.com',
  path: `/v1/files/${fileKey}?depth=3`,
  method: 'GET',
  headers: {
    'X-Figma-Token': token
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Figma API Status:', res.statusCode);
    try {
      const data = JSON.parse(body);
      fs.writeFileSync('scripts/figma_file_tree.json', JSON.stringify(data, null, 2));
      console.log('Document name:', data.name);
      for (const page of data.document.children) {
        console.log(`Page: ${page.name} (${page.id})`);
        if (page.children) {
          for (const child of page.children) {
            console.log(`  - [${child.type}] "${child.name}" (id: ${child.id})`);
          }
        }
      }
    } catch(e) {
      console.error(e.message);
    }
  });
});

req.on('error', console.error);
req.end();
