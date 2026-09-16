import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { siteConfig } from '../config.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = new URL(siteConfig.siteUrl).pathname.replace(/\/$/, '');
const errors = [];
const files = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes:true })) {
    if (entry.name.startsWith('.') || ['node_modules','artifacts'].includes(entry.name)) continue;
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) await walk(path); else files.push(path);
  }
}
await walk(root);
async function checkRef(ref, source) {
  if (!ref || /^(https?:|mailto:|tel:|data:)/.test(ref)) return;
  let [path, hash] = ref.split('#'); path = path.split('?')[0];
  if (base && path.startsWith(`${base}/`)) path = path.slice(base.length);
  let target = path ? (path.startsWith('/') ? resolve(root, `.${path}`) : resolve(dirname(source), path)) : source;
  try {
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
    const data = await readFile(target);
    if (hash && extname(target) === '.html' && !new RegExp(`id=["']${hash}["']`).test(data.toString())) errors.push(`Âncora ausente: ${ref} em ${relative(root,source)}`);
  } catch { errors.push(`Arquivo ausente: ${ref} em ${relative(root,source)}`); }
}
for (const file of files) {
  const type = extname(file);
  if (['.js','.mjs'].includes(type)) {
    const result = spawnSync(process.execPath, ['--check',file], { encoding:'utf8' });
    if (result.status) errors.push(result.stderr);
    const text = await readFile(file, 'utf8');
    for (const match of text.matchAll(/(?:from|import)\s*['"](\.[^'"]+)['"]/g)) await checkRef(match[1],file);
  }
  if (type === '.html') {
    // Source fragments are checked through their complete generated pages.
    if (relative(root, file).startsWith('content/')) continue;
    const html = await readFile(file, 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    if (new Set(ids).size !== ids.length) errors.push(`IDs duplicados: ${relative(root,file)}`);
    if (!html.includes('lang="pt-BR"')) errors.push(`Idioma ausente: ${relative(root,file)}`);
    if ([...html.matchAll(/<h1[\s>]/g)].length !== 1) errors.push(`A página deve ter um h1: ${relative(root,file)}`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) await checkRef(match[1],file);
    for (const match of html.matchAll(/srcset="([^"]+)"/g)) for (const src of match[1].split(',')) await checkRef(src.trim().split(/\s+/)[0],file);
    for (const match of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)) for (const id of match[1].split(' ')) if (!ids.includes(id)) errors.push(`Referência ARIA ausente: ${id}`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(match[1]); } catch { errors.push('JSON-LD inválido'); } }
  }
  if (type === '.css') for (const match of (await readFile(file,'utf8')).matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await checkRef(match[1],file);
}
const manifest = JSON.parse(await readFile(resolve(root,'site.webmanifest'),'utf8'));
for (const icon of manifest.icons) {
  const bytes = await readFile(resolve(root,icon.src));
  const actual = `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`;
  if (actual !== icon.sizes) errors.push(`Tamanho do ícone: esperado ${icon.sizes}, encontrado ${actual}`);
}
if (siteConfig.whatsapp && !/^55\d{10,11}$/.test(siteConfig.whatsapp.replace(/\D/g,''))) errors.push('WhatsApp inválido: informe DDI 55, DDD e número.');
if (errors.length) { errors.forEach(error => console.error(error)); process.exitCode = 1; }
else console.log(`OK: ${files.length} arquivos; sintaxe JS, assets locais, âncoras, referências ARIA, metadados e ícones verificados.`);
if (!siteConfig.whatsapp) console.log('Pendente de dado real: WhatsApp. O site exibe agendamentos em breve.');
