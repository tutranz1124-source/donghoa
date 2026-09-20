const https = require('https');
const fs = require('fs');

const token = process.env.FIGMA_TOKEN || "";
const mcpUrl = 'https://mcp.figma.com/mcp';
const fileKey = 'Bnu9B1ayywc3WBtncYaFXO';

function parseSSE(raw) {
  const lines = raw.split('\n');
  const results = [];
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try { results.push(JSON.parse(line.slice(6))); } catch(e) {}
    }
  }
  return results;
}

function mcpPost(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(mcpUrl);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'User-Agent': 'VSCode-MCP/1.0.3'
      }
    }, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => resolve(parseSSE(resBody)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function run() {
  await mcpPost({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'Antigravity-Agent', version: '1.0.0' }
    }
  });

  // Call get_design_context to inspect asset URLs
  const contextRes = await mcpPost({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get_design_context',
      arguments: { fileKey, nodeId: '13:7' }
    }
  });

  const fullText = JSON.stringify(contextRes);
  fs.writeFileSync('scripts/mcp_context_dump.json', fullText);
  console.log('Saved scripts/mcp_context_dump.json length:', fullText.length);

  // Search for figma asset URLs (https://www.figma.com/api/mcp/asset/...)
  const assetRegex = /https:\/\/www\.figma\.com\/api\/mcp\/asset\/[a-zA-Z0-9\-_.]+/g;
  const matches = [...new Set(fullText.match(assetRegex) || [])];
  console.log('Found assets count:', matches.length);

  let idx = 0;
  for (const url of matches) {
    const filename = `public/uploads/asset_${idx++}.png`;
    console.log(`Downloading ${url} -> ${filename}...`);
    try {
      await downloadFile(url, filename);
    } catch(e) {
      console.error(e.message);
    }
  }
}

run().catch(console.error);
