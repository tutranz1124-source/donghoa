const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function getAuthCookie() {
  try {
    const authRes = await fetch('https://donghoa-design-six.vercel.app/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@donghoaproperty.vn', password: 'donghoa2026' })
    });
    const setCookie = authRes.headers.get('set-cookie');
    const match = setCookie ? setCookie.match(/donghoa_admin_session=([^;]+)/) : null;
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

async function capture() {
  const cookieVal = await getAuthCookie();

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9252',
    '--disable-gpu',
    '--window-size=1440,1080',
    'https://donghoa-design-six.vercel.app/blog'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9252/json', res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(d);
          const p = targets.find(t => t.type === 'page');
          if (!p) throw new Error('No page target found');
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
            await send('Network.enable');

            if (cookieVal) {
              await send('Network.setCookie', {
                name: 'donghoa_admin_session',
                value: cookieVal,
                domain: 'donghoa-design-six.vercel.app',
                path: '/'
              });
            }

            const brainDir = 'C:\\Users\\kaizk\\.gemini\\antigravity\\brain\\5ee9230c-8a97-48c7-9f2e-c223c1fd9e5a';

            // 1. Capture /blog (listing)
            console.log('Navigating to /blog...');
            await send('Page.navigate', { url: 'https://donghoa-design-six.vercel.app/blog' });
            await new Promise(r => setTimeout(r, 4000));
            const shot1 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(brainDir, 'verify_public_blog_listing.png'), Buffer.from(shot1.data, 'base64'));
            console.log('Saved verify_public_blog_listing.png');

            // 2. Capture /blog/[slug] (detail page)
            console.log('Navigating to detail article...');
            await send('Page.navigate', { url: 'https://donghoa-design-six.vercel.app/blog/kham-pha-phong-cach-thiet-ke-noi-that-hien-dai-toi-gian-modern-minimalist' });
            await new Promise(r => setTimeout(r, 4000));
            const shot2 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(brainDir, 'verify_public_blog_detail.png'), Buffer.from(shot2.data, 'base64'));
            console.log('Saved verify_public_blog_detail.png');

            // 3. Scroll down detail page to capture callout, CTA, and quote
            await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 900)' });
            await new Promise(r => setTimeout(r, 1500));
            const shot3 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(brainDir, 'verify_public_blog_detail_scrolled.png'), Buffer.from(shot3.data, 'base64'));
            console.log('Saved verify_public_blog_detail_scrolled.png');

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

capture().then(() => console.log('All screenshots captured successfully!')).catch(console.error);