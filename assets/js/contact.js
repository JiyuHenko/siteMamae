import { siteConfig } from '../../config.js';
import { buildWhatsAppLink } from './contact-url.js';

export function initContact() {
  const validNumber = Boolean(buildWhatsAppLink(siteConfig.whatsapp));
  const dialog = document.querySelector('.contact-dialog');
  const select = document.querySelector('#contact-subject');
  const whatsapp = document.querySelector('[data-whatsapp]');
  let opener;
  const updateLink = () => {
    if (!validNumber || !whatsapp) return;
    const subject = select?.value || 'Informações sobre a consulta';
    whatsapp.href = buildWhatsAppLink(siteConfig.whatsapp, subject);
  };
  if (validNumber) {
    document.querySelectorAll('[data-contact]').forEach(button => { button.innerHTML = 'Vamos conversar <span aria-hidden="true">↗</span>'; });
    document.querySelectorAll('[data-contact-status]').forEach(el => { el.textContent = 'Consulte os horários e as formas de atendimento.'; });
    const unavailable = document.querySelector('[data-dialog-unavailable]');
    const available = document.querySelector('[data-dialog-available]');
    if (unavailable) unavailable.hidden = true;
    if (available) available.hidden = false;
    updateLink();
  }
  select?.addEventListener('change', updateLink);
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
    if (select) select.value = link.dataset.interest;
    updateLink();
  }));
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
    if (!dialog) return;
    opener = button;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  const close = () => dialog?.close();
  dialog?.querySelectorAll('.dialog-close, [data-close-dialog]').forEach(button => button.addEventListener('click', close));
  dialog?.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
  });
  dialog?.addEventListener('close', () => { document.body.classList.remove('dialog-open'); opener?.focus(); });
  if (siteConfig.instagram) {
    try {
      const url = new URL(siteConfig.instagram);
      if (url.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(url.hostname)) {
        document.querySelectorAll('[data-instagram]').forEach(link => { link.href = url.href; link.hidden = false; });
      }
    } catch { /* Invalid values never become outbound links. */ }
  }
  if (siteConfig.crn.trim()) document.querySelectorAll('[data-crn]').forEach(el => { el.textContent = `· ${siteConfig.crn.trim()}`; el.hidden = false; });
}
