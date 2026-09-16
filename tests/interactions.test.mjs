import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildWhatsAppLink } from '../assets/js/contact-url.js';
import { initCareTabs } from '../assets/js/tabs.js';

test('contato vazio ou incompleto nunca produz um destino externo', () => {
  for (const value of ['', null, undefined, '5511', 'DDDNÚMERO', '11999990000']) {
    assert.equal(buildWhatsAppLink(value), null);
  }
});

test('contato normaliza pontuação e codifica a mensagem sem misturar parâmetros', () => {
  // Synthetic test fixture only; this number is never included in siteConfig.
  const url = new URL(buildWhatsAppLink('+55 (11) 90000-0000', 'Minha rotina & preferências?'));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/5511900000000');
  assert.equal([...url.searchParams].length, 1);
  assert.match(url.searchParams.get('text'), /minha rotina & preferências\?/);
});

// Minimal DOM event model. Tests use the real markup and real enhancement module;
// this checks keyboard/state logic, not browser rendering or a screen reader.
function setupTabs(context) {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const oldDocument = globalThis.document;
  class Element extends EventTarget {
    constructor(tag) {
      super();
      this.attributes = new Map([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1],m[2]]));
      this.id = this.attributes.get('id');
      this.hidden = /\bhidden(?:\s|>)/.test(tag);
      this.tabIndex = Number(this.attributes.get('tabindex') || 0);
    }
    setAttribute(name,value) { this.attributes.set(name,value); }
    getAttribute(name) { return this.attributes.get(name); }
    focus() { globalThis.document.activeElement = this; }
  }
  const tabs = [...html.matchAll(/<button\b[^>]*role="tab"[^>]*>/g)].map(m => new Element(m[0]));
  const panels = [...html.matchAll(/<div\b[^>]*role="tabpanel"[^>]*>/g)].map(m => new Element(m[0]));
  globalThis.document = { activeElement:null, querySelectorAll:selector => selector === '[role="tab"]' ? tabs : panels };
  context.after(() => { globalThis.document = oldDocument; });
  initCareTabs();
  return { tabs, panels };
}

test('seletor de cuidado mostra um único painel e mantém o foco navegável', context => {
  const { tabs, panels } = setupTabs(context);
  tabs[1].dispatchEvent(new Event('click'));
  assert.equal(tabs[1].getAttribute('aria-selected'),'true');
  assert.equal(tabs[0].getAttribute('aria-selected'),'false');
  assert.equal(tabs.filter(tab => tab.tabIndex === 0).length,1);
  assert.equal(panels.filter(panel => !panel.hidden).length,1);
  assert.equal(panels.find(panel => !panel.hidden).id,tabs[1].getAttribute('aria-controls'));
});

test('setas percorrem os assuntos em ciclo; Home e End alcançam os extremos', context => {
  const { tabs } = setupTabs(context);
  const press = (tab,key) => {
    const event = new Event('keydown',{cancelable:true});
    Object.defineProperty(event,'key',{value:key});
    tab.dispatchEvent(event);
    return event;
  };
  assert.equal(press(tabs[0],'ArrowUp').defaultPrevented,true);
  assert.equal(document.activeElement,tabs[2]);
  press(tabs[2],'ArrowDown');
  assert.equal(document.activeElement,tabs[0]);
  press(tabs[0],'End');
  assert.equal(document.activeElement,tabs[2]);
  press(tabs[2],'Home');
  assert.equal(document.activeElement,tabs[0]);
  assert.equal(press(tabs[0],'Tab').defaultPrevented,false);
});
