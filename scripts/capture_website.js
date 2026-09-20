const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function capturePage(wsUrl, targetUrl, outputFile, width = 1440, height = 900) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 1;

    function send(method, params = {}) {
      ws.send(JSON.stringify({ id: id++, method, params }));
    }

    ws.onopen = async () => {
      send('Page.enable');
      send('Network.enable');
      send('Network.setCookie', {
        name: 'donghoa_admin_session',
        value: 'valid_admin_token_2026',
        domain: 'localhost',
        path: '/'
      });
      send('Emulation.setDeviceMetricsOverride', {
        width: width,
        height: height,
        deviceScaleFactor: 1,
        mobile: false
      });
      send('Page.navigate', { url: targetUrl });
    };

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired') {
        await sleep(1500); // Allow render & animations
        send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      }
      if (msg.result && msg.result.data) {
        fs.writeFileSync(outputFile, Buffer.from(msg.result.data, 'base64'));
        console.log(`Saved screenshot to ${outputFile}`);
        ws.close();
        resolve();
      }
    };

    ws.onerror = reject;
  });
}

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await sleep(4000);

  const targets = [
    { url: 'http://localhost:3000', file: 'public/screenshots/website_home.png', h: 9200 },
    { url: 'http://localhost:3000/admin/pages', file: 'public/screenshots/website_admin_pages.png', h: 1400 },
    { url: 'http://localhost:3000/blog', file: 'public/screenshots/website_blog.png', h: 1600 },
    { url: 'http://localhost:3000/blog/nghe-thuat-phoi-mau-japandi-trong-khong-gian-song', file: 'public/screenshots/website_article.png', h: 2200 },
    { url: 'http://localhost:3000/admin/blog', file: 'public/screenshots/website_admin.png', h: 1200 }
  ];

  if (!fs.existsSync('public/screenshots')) {
    fs.mkdirSync('public/screenshots', { recursive: true });
  }

  for (const t of targets) {
    try {
      const pages = await getJson('http://127.0.0.1:9222/json');
      const page = pages.find(p => p.type === 'page');
      if (page) {
        console.log(`Capturing ${t.url} ...`);
        await capturePage(page.webSocketDebuggerUrl, t.url, t.file, 1440, t.h);
      }
    } catch (err) {
      console.error(`Error capturing ${t.url}:`, err.message);
    }
  }

  chrome.kill();
  console.log('Finished capturing all screenshots!');
}

main().catch(console.error);
