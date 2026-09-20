const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture() {
  const brainDir = 'C:\\Users\\kaizk\\.gemini\\antigravity\\brain\\5ee9230c-8a97-48c7-9f2e-c223c1fd9e5a';

  async function runSession(port, width, height, isMobile) {
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'https://donghoa-design-six.vercel.app'
    ]);

    await new Promise(r => setTimeout(r, 4500));

    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json`, res => {
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
              if (isMobile) {
                await send('Emulation.setDeviceMetricsOverride', {
                  width: 390,
                  height: 844,
                  deviceScaleFactor: 2,
                  mobile: true
                });
              }

              // Remove fixed nav header so it never covers content
              await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const h = document.querySelector('header');
                    if (h) h.style.display = 'none';
                  })()
                `
              });

              const list = [
                { id: 'modern-section', name: 'modern' },
                { id: 'cozy-section', name: 'cozy' },
                { id: 'luxury-section', name: 'luxury' },
                { id: 'heritage-section', name: 'heritage' }
              ];

              for (const sec of list) {
                console.log(`Capturing ${sec.name} (${isMobile ? 'mobile' : 'desktop'})...`);
                await send('Runtime.evaluate', {
                  expression: `
                    (() => {
                      const el = document.getElementById('${sec.id}');
                      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
                    })()
                  `
                });
                await new Promise(r => setTimeout(r, 2000));

                const shot = await send('Page.captureScreenshot', { format: 'png' });
                const outName = isMobile ? `verify_mobile_${sec.name}.png` : `verify_live_${sec.name}.png`;
                fs.writeFileSync(path.join(brainDir, outName), Buffer.from(shot.data, 'base64'));
                console.log('Saved', outName);
              }

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

  async function captureAdmin(port) {
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--disable-gpu',
      '--window-size=1440,1100',
      'https://donghoa-design-six.vercel.app/admin/pages'
    ]);

    await new Promise(r => setTimeout(r, 4500));

    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json`, res => {
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
              await new Promise(r => setTimeout(r, 2000));

              // 1. Click admin quick-fill button & submit login
              await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const btns = Array.from(document.querySelectorAll('button'));
                    const adminBtn = btns.find(b => b.textContent && b.textContent.includes('Quản Trị Viên'));
                    if (adminBtn) adminBtn.click();
                    setTimeout(() => {
                      const submit = document.querySelector('button[type="submit"]');
                      if (submit) submit.click();
                    }, 400);
                  })()
                `
              });
              await new Promise(r => setTimeout(r, 2500));

              // 2. Navigate directly to /admin/pages
              await send('Page.navigate', { url: 'https://donghoa-design-six.vercel.app/admin/pages' });
              await new Promise(r => setTimeout(r, 3000));

              // Modern Canva Screenshot
              const shotModern = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(brainDir, 'verify_admin_modern.png'), Buffer.from(shotModern.data, 'base64'));
              console.log('Saved verify_admin_modern.png');

              // Switch to Luxury in Canva Studio
              await send('Runtime.evaluate', {
                expression: "Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Luxury'))?.click()"
              });
              await new Promise(r => setTimeout(r, 1500));
              const shotLuxury = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(brainDir, 'verify_admin_luxury.png'), Buffer.from(shotLuxury.data, 'base64'));
              console.log('Saved verify_admin_luxury.png');

              // Switch to Cozy in Canva Studio
              await send('Runtime.evaluate', {
                expression: "Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Cozy'))?.click()"
              });
              await new Promise(r => setTimeout(r, 1500));
              const shotCozy = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(brainDir, 'verify_admin_cozy.png'), Buffer.from(shotCozy.data, 'base64'));
              console.log('Saved verify_admin_cozy.png');

              // Switch to Heritage in Canva Studio
              await send('Runtime.evaluate', {
                expression: "Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Heritage'))?.click()"
              });
              await new Promise(r => setTimeout(r, 1500));
              const shotHeritage = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(brainDir, 'verify_admin_heritage.png'), Buffer.from(shotHeritage.data, 'base64'));
              console.log('Saved verify_admin_heritage.png');

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

  console.log('--- CAPTURING LIVE DESKTOP SECTIONS ---');
  await runSession(9274, 1440, 900, false);

  console.log('--- CAPTURING CANVA STUDIO ADMIN ---');
  await captureAdmin(9275);
}

capture().then(() => console.log('Done capturing sections')).catch(console.error);