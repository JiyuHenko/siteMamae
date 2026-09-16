import { readFile, writeFile } from 'node:fs/promises';
import { siteConfig } from '../config.js';

const url = new URL(siteConfig.siteUrl);
if (url.protocol !== 'https:') throw new Error('Use a URL HTTPS definitiva em config.js.');
const siteUrl = url.href.replace(/\/$/, '');
const base = url.pathname.replace(/\/$/,'');
let html = await readFile(new URL('../index.html',import.meta.url),'utf8');
html = html.replace(/<meta property="og:image" content="[^"]+">/, `<meta property="og:image" content="${siteUrl}/assets/img/social-cover.jpg">`);
html = html.replace(/\s*<link rel="canonical"[^>]+>/g,'').replace(/\s*<meta property="og:url"[^>]+>/g,'');
html = html.replace('</head>', `  <link rel="canonical" href="${siteUrl}/">\n  <meta property="og:url" content="${siteUrl}/">\n</head>`);
await writeFile(new URL('../index.html',import.meta.url),html);
await writeFile(new URL('../robots.txt',import.meta.url),`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(new URL('../sitemap.xml',import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`);
let errorPage = await readFile(new URL('../404.html',import.meta.url),'utf8');
errorPage = errorPage.replace(/href="[^"\n]*\/assets\/img\/favicon.png"/,`href="${base}/assets/img/favicon.png"`).replace(/href="[^"\n]*\/assets\/css\/styles.css"/,`href="${base}/assets/css/styles.css"`).replace(/class="button" href="[^"]+"/,`class="button" href="${base}/"`);
await writeFile(new URL('../404.html',import.meta.url),errorPage);
console.log(`SEO sincronizado para ${siteUrl}/. Este comando não publica o site.`);
