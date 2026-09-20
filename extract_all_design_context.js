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
      try {
        results.push(JSON.parse(line.slice(6)));
      } catch(e) {}
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
      res.on('end', () => {
        const events = parseSSE(resBody);
        resolve({ status: res.statusCode, events, raw: resBody });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
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

  console.log('Fetching design context for TRANG CHU 13:7 and other frames...');
  
  const nodesToInspect = [
    { id: '13:7', name: 'TRANG_CHU_FULL' },
    { id: '39:5', name: 'HERO_GROUP_1' },
    { id: '13:23', name: 'PHILOSOPHY' },
    { id: '13:54', name: 'OFFERINGS' },
    { id: '17:715', name: 'FRAME_3_MODERN' },
    { id: '74:6', name: 'FRAME_4_COZY' },
    { id: '74:7', name: 'FRAME_5_LUXURY' },
    { id: '82:56', name: 'FRAME_8_HERITAGE' },
    { id: '115:65', name: 'CONTACT_FORM' },
    { id: '13:258', name: 'GALLERY_OFFICE_FOOTER' }
  ];

  for (const n of nodesToInspect) {
    try {
      const res = await mcpPost({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'get_design_context',
          arguments: {
            fileKey: fileKey,
            nodeId: n.id
          }
        }
      });
      const text = res.events[0]?.result?.content?.[0]?.text;
      if (text) {
        fs.writeFileSync(`figma_context_${n.name}.txt`, text);
        console.log(`Saved figma_context_${n.name}.txt (${text.length} chars)`);
      }
    } catch(err) {
      console.error(`Error inspecting ${n.name}:`, err.message);
    }
  }
}

run().catch(console.error);

