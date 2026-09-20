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

  console.log('Inspecting node 1:2 metadata...');
  const res = await mcpPost({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get_metadata',
      arguments: { fileKey, nodeId: '1:2' }
    }
  });
  const metaText = res[0]?.result?.content?.[0]?.text;
  fs.writeFileSync('scripts/node_1_2_meta.xml', metaText || '');
  console.log('Saved scripts/node_1_2_meta.xml, length:', (metaText || '').length);

  console.log('Inspecting node 1:2 design context...');
  const contextRes = await mcpPost({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'get_design_context',
      arguments: { fileKey, nodeId: '1:2' }
    }
  });
  const contextText = contextRes[0]?.result?.content?.[0]?.text;
  fs.writeFileSync('scripts/node_1_2_context.txt', contextText || '');
  console.log('Saved scripts/node_1_2_context.txt, length:', (contextText || '').length);

  console.log('Getting screenshot for node 1:2...');
  const shotRes = await mcpPost({
    jsonrpc: '2.0',
    id: 4,
    method: 'tools/call',
    params: {
      name: 'get_screenshot',
      arguments: { fileKey, nodeId: '1:2' }
    }
  });
  const shotText = shotRes[0]?.result?.content?.[0]?.text;
  if (shotText) {
    try {
      const parsed = JSON.parse(shotText);
      console.log('Screenshot response parsed:', parsed);
      if (parsed.image_url) {
        await downloadFile(parsed.image_url, 'public/figma_shots/node_1_2_shot.png');
        console.log('Downloaded node_1_2_shot.png');
      }
    } catch(e) {
      console.error(e.message);
    }
  }
}

run().catch(console.error);
