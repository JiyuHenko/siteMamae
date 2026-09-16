import { siteConfig } from '../../config.js';

export function initMap() {
  const button = document.querySelector('[data-map-load]');
  const container = document.querySelector('[data-map-container]');
  if (!button || !container) return;
  button.addEventListener('click', () => {
    if (container.querySelector('iframe')) return;
    const frame = document.createElement('iframe');
    const url = new URL('https://maps.google.com/maps');
    url.searchParams.set('q', siteConfig.mapsQuery);
    url.searchParams.set('hl', 'pt-BR');
    url.searchParams.set('z', '16');
    url.searchParams.set('output', 'embed');
    frame.src = url.href;
    frame.title = 'Mapa do endereço de Fernanda Lemos em Passos, MG';
    frame.width = '640';
    frame.height = '380';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.setAttribute('allowfullscreen', '');
    const status = container.querySelector('[data-map-status]');
    if (status) {
      status.hidden = false;
      status.textContent = 'Se o mapa não aparecer, use os links abaixo para abrir o Google Maps.';
    }
    container.querySelector('[data-map-prompt]').hidden = true;
    container.prepend(frame);
    frame.focus();
  });
}
