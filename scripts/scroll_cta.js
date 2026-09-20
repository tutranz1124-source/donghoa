const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9254',
    '--disable-gpu',
    '--window-size=1440,1080',
    'https://donghoa-design-six.vercel.app/blog/kham-pha-phong-cach-thiet-ke-noi-that-hien-dai-toi-gian-modern-minimalist'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9254/json', res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(d);
          const p = targets.find(t => t.type === 'page');
          const ws = new WebSocket(p.webSocketDebuggerUrl);
          let id = 1;
          const send = (m, params={}) => new Promise(resFn => {
            const reqId = id++;
            const fn = (ev) => {
              const msg = JSON.parse(ev.data);
              if (msg.id === reqId) {
                ws.removeEventListener('message', fn);
                resFn(msg.result);
              }
            };
            ws.addEventListener('message', fn);
            ws.send(JSON.stringify({ id: reqId, method: m, params }));
          });

          ws.onopen = async () => {
            await send('Page.enable');
            await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 2700)' });
            await new Promise(r => setTimeout(r, 1500));
            const shot = await send('Page.captureScreenshot', { format: 'png' });
            const brainDir = 'C:\\Users\\kaizk\\.gemini\\antigravity\\brain\\5ee9230c-8a97-48c7-9f2e-c223c1fd9e5a';
            fs.writeFileSync(path.join(brainDir, 'verify_public_blog_detail_cta.png'), Buffer.from(shot.data, 'base64'));
            console.log('Saved verify_public_blog_detail_cta.png');
            ws.close();
            chrome.kill();
            resolve();
          };
        } catch (e) {
          console.error(e);
          chrome.kill();
          reject(e);
        }
      });
    }).on('error', err => {
      chrome.kill();
      reject(err);
    });
  });
}

capture().catch(console.error);