import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../config.js';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const base = new URL(siteConfig.siteUrl).pathname.replace(/\/$/, '');
const port = Number(process.env.SITE_PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.webmanifest':'application/manifest+json', '.woff2':'font/woff2', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8' };

createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (base && (path === base || path.startsWith(`${base}/`))) path = path.slice(base.length);
    const target = resolve(root, `.${path || '/'}`);
    if ((target !== root && !target.startsWith(root + sep)) || path.split('/').some(segment => segment.startsWith('.'))) {
      res.writeHead(403); res.end('Acesso negado'); return;
    }
    const info = await stat(target);
    const file = info.isDirectory() ? resolve(target, 'index.html') : target;
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) throw new Error('Invalid path');
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    const content = await readFile(resolve(root, '404.html'));
    res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : content);
  }
}).listen(port, '0.0.0.0', () => console.log(`Fernanda Lemos: http://localhost:${port}${base}/`));
