import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { pages } from '../content/pages.js';
import { siteConfig } from '../config.js';

const root = new URL('../', import.meta.url);
const base = `${siteConfig.siteUrl.replace(/\/$/, '')}/`;
const read = path => readFileSync(new URL(path, root), 'utf8');
const output = page => page.path.endsWith('.html') ? page.path : `${page.path}index.html`;
const htmlFor = page => read(output(page));
const absolute = path => new URL(path, base).href;

test('cada rota tem identidade própria, canonical e conteúdo sem depender de JavaScript', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const page of pages) {
    const html = htmlFor(page);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    assert.ok(title, page.path);
    assert.ok(!titles.has(title), `Título repetido: ${title}`);
    assert.ok(!descriptions.has(description), `Descrição repetida: ${description}`);
    titles.add(title); descriptions.add(description);
    assert.ok(html.includes(`<link rel="canonical" href="${absolute(page.path)}">`), page.path);
    assert.ok(html.includes(`<meta property="og:url" content="${absolute(page.path)}">`), page.path);
    assert.ok(!html.includes('{{'), `Token pendente: ${page.path}`);
    const body = html.split('</head>')[1];
    assert.ok(body.includes(siteConfig.crn), `CRN não visível: ${page.path}`);
    assert.ok(body.includes(siteConfig.phoneLabel), `Telefone não visível: ${page.path}`);
    assert.ok(body.includes(`mailto:${siteConfig.email}`), `E-mail ausente: ${page.path}`);
    assert.ok(!html.includes('divulgado em breve'), `Contato obsoleto: ${page.path}`);
  }
});

test('sitemap cobre somente páginas indexáveis e suas versões Markdown existem', () => {
  const sitemap = read('sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const expected = pages.filter(p => p.index !== false).map(p => absolute(p.path));
  assert.deepEqual(locations, expected);
  assert.equal(new Set(locations).size, locations.length);
  for (const page of pages) {
    const html = htmlFor(page);
    if (page.index === false) {
      assert.ok(html.includes('content="noindex,follow"'));
      continue;
    }
    const md = page.path ? `${page.path}index.md` : 'index.md';
    assert.ok(existsSync(new URL(md, root)));
    assert.ok(read('llms.txt').includes(absolute(md)));
    assert.ok(html.includes(`type="text/markdown" href="${absolute(md)}"`));
    assert.ok(read(md).includes(`Página oficial: ${absolute(page.path)}`));
  }
  assert.ok(read('robots.txt').includes(`Sitemap: ${absolute('sitemap.xml')}`));
  assert.match(read('robots.txt'), /User-agent: OAI-SearchBot\nAllow: \/\n/);
});

test('dados estruturados descrevem os contatos reais e as perguntas visíveis', () => {
  for (const page of pages) {
    const html = htmlFor(page);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.equal(new Set(graph.map(node => node['@id'])).size, graph.length);
    const person = graph.find(node => node['@type'] === 'Person');
    assert.equal(person.name, siteConfig.name);
    assert.equal(person.identifier, siteConfig.crn);
    const local = graph.find(node => node['@type'] === 'LocalBusiness');
    assert.equal(local.address.streetAddress, siteConfig.streetAddress);
    assert.equal(local.telephone, `+${siteConfig.whatsapp}`);
    assert.equal(local.email, siteConfig.email);
    assert.equal(local.aggregateRating, undefined);
    assert.equal(local.openingHours, undefined);
    if (page.type === 'FAQPage') {
      const faq = graph.find(node => node['@type'] === 'FAQPage');
      assert.equal(faq.mainEntity.length, [...html.matchAll(/<details>/g)].length);
      assert.ok(faq.mainEntity.length > 0);
      for (const question of faq.mainEntity) {
        assert.ok(html.includes(question.name));
        assert.ok(question.acceptedAnswer.text.length > 30);
      }
    }
  }
});

test('mapa tem alternativas de rota e não se conecta ao Google antes da escolha', () => {
  const html = read('contato/index.html');
  assert.ok(html.includes('data-map-load'));
  assert.ok(!html.includes('<iframe'));
  assert.ok(html.includes('https://www.google.com/maps/dir/?api=1'));
  assert.ok(html.includes('https://www.google.com/maps/search/?api=1'));
  assert.ok(html.includes('<noscript>'));
});
