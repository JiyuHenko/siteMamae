import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig as config } from '../config.js';
import { pages } from '../content/pages.js';
import { buildWhatsAppLink } from '../assets/js/contact-url.js';

const root = new URL('../', import.meta.url);
const origin = new URL(config.siteUrl);
if (origin.protocol !== 'https:' || origin.search || origin.hash) throw new Error('Configure uma URL HTTPS sem query ou fragmento.');
const baseUrl = origin.href.replace(/\/$/, '') + '/';
const absolute = path => new URL(path, baseUrl).href;
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const clean = value => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.mapsQuery)}`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.mapsQuery)}`;
const whatsapp = buildWhatsAppLink(config.whatsapp);
if (!whatsapp) throw new Error('Preencha um número de WhatsApp válido.');

function relativeRoot(page) {
  if (page.id === '404') return new URL(baseUrl).pathname;
  return '../'.repeat(page.path.split('/').filter(Boolean).length - (page.path.endsWith('.html') ? 1 : 0)) || './';
}
const fileFor = page => page.path.endsWith('.html') ? page.path : `${page.path}index.html`;
const markdownFor = page => page.path.endsWith('.html') ? `${page.path}.md` : `${page.path}index.md`;
const pageLink = (prefix, page) => `${prefix}${page.path}`;
const mainPages = pages.filter(page => ['sobre', 'acompanhamento', 'conteudos', 'duvidas'].includes(page.id));
function navLink(page, active, prefix) {
  const current = page.id === active.id || active.parent === page.id;
  return `<a href="${pageLink(prefix, page)}"${current ? ' aria-current="page"' : ''}>${esc(page.id === 'sobre' ? 'Sobre' : page.id === 'duvidas' ? 'Dúvidas' : page.label)}</a>`;
}
function header(page, prefix) {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header" id="topo"><div class="wrap header-inner"><a class="brand" href="${prefix}" aria-label="Fernanda Lemos — início"><img src="${prefix}assets/img/logo.webp" width="650" height="334" alt="Fernanda Lemos, nutricionista"></a><nav class="desktop-nav" aria-label="Navegação principal">${mainPages.map(p => navLink(p, page, prefix)).join('')}</nav><a class="button button-small header-cta" href="${prefix}contato/"${page.id === 'contato' ? ' aria-current="page"' : ''}>Agendar consulta <span aria-hidden="true">↗</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu"><span></span><span></span></button></div><nav class="mobile-nav" id="mobile-nav" aria-label="Navegação no celular" hidden>${pages.filter(p => ['home','sobre','acompanhamento','conteudos','duvidas','contato'].includes(p.id)).map(p => navLink(p,page,prefix)).join('')}</nav></header>`;
}
function breadcrumb(page, prefix) {
  if (['home','404'].includes(page.id)) return '';
  const parent = pages.find(p => p.id === page.parent);
  return `<nav class="breadcrumbs wrap" aria-label="Caminho da página"><ol><li><a href="${prefix}">Início</a></li>${parent ? `<li><a href="${pageLink(prefix,parent)}">${esc(parent.label)}</a></li>` : ''}<li aria-current="page">${esc(page.label)}</li></ol></nav>`;
}
function intro(page) {
  if (!page.heading) return '';
  return `<section class="page-intro wrap"><p class="eyebrow">${esc(page.eyebrow)}</p><h1>${page.heading}</h1><p>${esc(page.intro)}</p></section>`;
}
function cta(prefix) {
  return `<section class="contact" id="contato" aria-labelledby="contact-title"><div class="wrap contact-inner"><div class="contact-copy"><p class="eyebrow">Um convite para cuidar de você</p><h2 id="contact-title">Seu próximo passo<br>pode ser <em>mais leve.</em></h2><p>Vamos conversar sobre o seu momento<br>e encontrar um começo que faça sentido?</p><a class="button" data-contact href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp <span aria-hidden="true">↗</span></a><a class="contact-location-link" href="${prefix}contato/#como-chegar">Contato e localização em Passos, MG ↗</a></div><div class="contact-mark" aria-hidden="true"><img src="${prefix}assets/img/seal.webp" width="400" height="400" alt="" loading="lazy"></div></div></section>`;
}
function footer(page, prefix) {
  return `<footer class="footer"><div class="wrap footer-main"><div class="footer-identity"><a class="brand footer-brand" href="${prefix}" aria-label="Fernanda Lemos — início"><img src="${prefix}assets/img/logo.webp" width="650" height="334" alt="Fernanda Lemos, nutricionista" loading="lazy"></a><p>Nutrir o corpo.<br><em>Acolher a vida.</em></p><span class="footer-registration">Nutricionista · ${esc(config.crn)}</span></div><nav class="footer-group footer-navigation" aria-label="Explore o site"><h2>Explore</h2>${pages.filter(p => ['home','sobre','acompanhamento','conteudos','duvidas'].includes(p.id)).map(p => `<a href="${pageLink(prefix,p)}"${page.id===p.id?' aria-current="page"':''}>${esc(p.label)}</a>`).join('')}</nav><div class="footer-group"><h2>Vamos conversar</h2><a href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer" class="footer-phone">${esc(config.phoneLabel)}</a><span class="footer-channel-label">WhatsApp e telefone</span><a href="mailto:${esc(config.email)}" class="footer-email">${esc(config.email)}</a><a href="${esc(config.instagram)}" target="_blank" rel="noopener noreferrer">@nutri.fernandalemos <span aria-hidden="true">↗</span></a><a href="${prefix}contato/">Todos os canais de contato <span aria-hidden="true">↗</span></a></div><div class="footer-group footer-address"><h2>Em Passos, MG</h2><address>${esc(config.streetAddress)}<br>${esc(config.neighborhood)} · ${esc(config.city)}, ${esc(config.region)}<br>CEP ${esc(config.postalCode)}</address><a class="footer-route" href="${prefix}contato/#como-chegar">Como chegar <span aria-hidden="true">↗</span></a><p>Horários e detalhes do atendimento são combinados no agendamento.</p></div></div><div class="wrap footer-bottom"><span>© <span data-year>2026</span> Fernanda Lemos. Todos os direitos reservados.</span><a href="${prefix}privacidade.html">Privacidade</a><a class="footer-to-top" href="#topo">Voltar ao topo <span aria-hidden="true">↑</span></a></div></footer><a class="mobile-appointment" href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer"><span>Agendar pelo WhatsApp</span><span aria-hidden="true">↗</span></a>`;
}
function dialog() {
  return `<dialog class="contact-dialog" aria-labelledby="dialog-title"><button class="dialog-close" type="button" aria-label="Fechar informações de agendamento">×</button><span class="eyebrow">Vamos conversar</span><h2 id="dialog-title">Um novo começo,<br><em>no seu tempo.</em></h2><p>Escolha o assunto e continue no WhatsApp para conversar com a Fernanda.</p><label for="contact-subject">Quero conversar sobre</label><select id="contact-subject"><option>Informações sobre a consulta</option><option>Minha rotina alimentar</option><option>Minha relação com a comida</option><option>Meu bem-estar</option><option>Outra dúvida</option></select><a class="button" data-whatsapp href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <span aria-hidden="true">↗</span></a><p class="dialog-note">Você pode revisar a mensagem antes de enviar. A data da consulta é confirmada diretamente na conversa.</p></dialog>`;
}
function structuredData(page, body) {
  const address = { '@type':'PostalAddress', streetAddress:config.streetAddress, addressLocality:config.city, addressRegion:config.region, postalCode:config.postalCode, addressCountry:config.country };
  const person = { '@type':'Person', '@id':absolute('#fernanda'), name:config.name, jobTitle:'Nutricionista', identifier:config.crn, url:absolute('sobre/'), sameAs:[config.instagram], email:config.email, telephone:`+${config.whatsapp}` };
  const business = { '@type':'LocalBusiness', '@id':absolute('#atendimento'), name:`${config.name} · Nutricionista`, url:baseUrl, image:absolute('assets/img/social-cover.jpg'), logo:absolute('assets/img/logo.webp'), telephone:`+${config.whatsapp}`, email:config.email, address, hasMap:maps, areaServed:{ '@type':'City', name:'Passos, MG' }, sameAs:[config.instagram] };
  const website = { '@type':'WebSite', '@id':absolute('#website'), url:baseUrl, name:`${config.name} · Nutricionista`, inLanguage:'pt-BR', publisher:{ '@id':person['@id'] } };
  const webpage = { '@type':page.type || 'WebPage', '@id':`${absolute(page.path)}#webpage`, url:absolute(page.path), name:page.title, description:page.description, inLanguage:'pt-BR', isPartOf:{ '@id':website['@id'] }, about:{ '@id':person['@id'] }, ...(page.updated ? {dateModified:page.updated} : {}) };
  if (page.id === 'sobre') webpage.mainEntity = { '@id':person['@id'] };
  if (page.id === 'contato') webpage.mainEntity = { '@id':business['@id'] };
  if (page.type === 'FAQPage') webpage.mainEntity = [...body.matchAll(/<details><summary>([\s\S]*?)<span class="faq-plus"[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div><\/details>/g)].map(m => ({ '@type':'Question', name:clean(m[1]), acceptedAnswer:{ '@type':'Answer', text:clean(m[2]) } }));
  const graph = [person,business,website,webpage];
  if (page.id !== 'home') {
    const trail = [pages[0], ...(page.parent ? [pages.find(p=>p.id===page.parent)] : []), page];
    graph.push({ '@type':'BreadcrumbList', '@id':`${absolute(page.path)}#breadcrumb`, itemListElement:trail.map((p,i)=>({ '@type':'ListItem', position:i+1, name:p.label, item:absolute(p.path) })) });
    webpage.breadcrumb = { '@id':`${absolute(page.path)}#breadcrumb` };
  }
  return JSON.stringify({ '@context':'https://schema.org','@graph':graph }).replace(/</g,'\\u003c');
}
function markdown(page, body) {
  const text = body.replace(/<(nav|button|noscript)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, '').replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g, (_,level,heading)=>`\n\n${'#'.repeat(Number(level))} ${clean(heading)}\n\n`).replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_,href,label)=>`[${clean(label)}](${new URL(href.replace(/&amp;/g,'&'),absolute(page.path)).href}) `).replace(/<li\b[^>]*>/g,'\n- ').replace(/<br\s*\/?\s*>/g,'\n').replace(/<\/(p|div|section|article|aside|address|ul|dl|dd)>/g,'\n\n').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\n[ \t]+/g,'\n').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  return `# ${page.title}\n\n> ${page.description}\n\nPágina oficial: ${absolute(page.path)}\n\n${text}\n\n## Identificação e contato\n\n${config.name} · Nutricionista · ${config.crn}\n\n${config.address}\n\nWhatsApp: ${config.phoneLabel}\n\nE-mail: ${config.email}\n\nInstagram: ${config.instagram}\n`;
}

for (const page of pages) {
  const prefix = relativeRoot(page);
  const tokens = { root:prefix, maps, directions, ...config, whatsapp, phone:config.whatsapp };
  let body = await readFile(new URL(`content/pages/${page.id}.html`,root),'utf8');
  body = body.replace(/\{\{(\w+)\}\}/g, (_,name) => { if (!(name in tokens)) throw new Error(`Token desconhecido: ${name}`); return esc(tokens[name]); });
  const head = `<!doctype html>
<!-- Generated by npm run build. Edit content/pages/, content/pages.js or scripts/build.mjs. -->
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#965963"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><meta name="robots" content="${page.index===false?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${esc(absolute(page.path))}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Fernanda Lemos · Nutricionista"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${esc(absolute(page.path))}"><meta property="og:image" content="${absolute('assets/img/social-cover.jpg')}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Fernanda Lemos, nutricionista"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}"><meta name="twitter:image" content="${absolute('assets/img/social-cover.jpg')}"><link rel="icon" href="${prefix}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="${prefix}assets/img/apple-touch-icon.png"><link rel="manifest" href="${prefix}site.webmanifest"><link rel="preload" href="${prefix}assets/fonts/cormorant-medium.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="${prefix}assets/fonts/dm-sans-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${prefix}assets/css/styles.css"><link rel="stylesheet" href="${prefix}assets/css/pages.css">${page.index!==false?`<link rel="alternate" type="text/markdown" href="${absolute(markdownFor(page))}"><link rel="describedby" type="text/plain" href="${absolute('llms.txt')}">`:''}<noscript><style>.care-tabs,.menu-toggle,[data-map-load]{display:none!important}.care-panel[hidden]{display:block!important;margin-top:3rem}@media(max-width:760px){.site-header{position:static}.mobile-nav[hidden]{display:flex!important;position:static;gap:.25rem;padding:1rem 1.25rem}.mobile-nav a{font:1rem 'DM Sans',Arial,sans-serif}.mobile-nav a span{display:none}}</style></noscript><script src="${prefix}assets/js/main.js" type="module"></script><script type="application/ld+json">${structuredData(page,body)}</script></head>`;
  const html = `${head}\n<body class="page-${page.id}">${header(page,prefix)}<main id="conteudo">${breadcrumb(page,prefix)}${intro(page)}\n${body}\n${page.cta!==false?cta(prefix):''}</main>${footer(page,prefix)}${dialog()}</body></html>\n`;
  const target = new URL(fileFor(page),root);
  await mkdir(dirname(fileURLToPath(target)),{recursive:true});
  await writeFile(target,html);
  if (page.index!==false) await writeFile(new URL(markdownFor(page),root),markdown(page,body));
}
const indexed = pages.filter(p=>p.index!==false);
await writeFile(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map(p=>`  <url><loc>${esc(absolute(p.path))}</loc><lastmod>${p.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(new URL('robots.txt',root),`# Effective only when served at the origin root /robots.txt. See docs/SEO.md.\nUser-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${absolute('sitemap.xml')}\n`);
await writeFile(new URL('llms.txt',root),`# Fernanda Lemos · Nutricionista em Passos, MG\n\n> Site da nutricionista Fernanda Lemos, CRN 9-30894, em Passos, Minas Gerais. Apresentação, proposta de acompanhamento, conteúdo prático e contato.\n\n## Informações profissionais\n\n- Nome: ${config.name}\n- Registro profissional: ${config.crn}\n- Endereço informado: ${config.address}\n- WhatsApp e telefone: ${config.phoneLabel}\n- E-mail: ${config.email}\n- Instagram: ${config.instagram}\n\nHorários, valores, modalidades e local da consulta são confirmados diretamente com a profissional. O site não confirma agendamentos automaticamente. As páginas não informam especialidades, avaliações de pacientes ou resultados garantidos.\n\n## Páginas em Markdown\n\n${indexed.map(p=>`- [${p.label}](${absolute(markdownFor(p))}): ${p.description}`).join('\n')}\n\n## Referências do site\n\n- [Página inicial](${baseUrl})\n- [Sitemap](${absolute('sitemap.xml')})\n- [Privacidade](${absolute('privacidade.html')})\n`);
const manifest = JSON.parse(await readFile(new URL('site.webmanifest',root),'utf8'));
manifest.theme_color='#965963';manifest.background_color='#fcf7f4';
await writeFile(new URL('site.webmanifest',root),JSON.stringify(manifest,null,2)+'\n');
console.log(`${pages.length} páginas, ${indexed.length} versões Markdown, sitemap e llms.txt gerados. Nenhuma publicação foi realizada.`);
