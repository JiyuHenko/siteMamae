import { siteConfig } from '../../config.js';
import { buildWhatsAppLink } from './contact-url.js';

export function initContact() {
  const dialog = document.querySelector('.contact-dialog');
  const select = document.querySelector('#contact-subject');
  const link = dialog?.querySelector('[data-whatsapp]');
  if (!dialog || !select || !link) return;
  let opener;
  const subjects = [...select.options].map(option => option.value);
  const requested = new URL(location.href).searchParams.get('assunto');
  if (subjects.includes(requested)) select.value = requested;
  const updateLink = () => {
    const url = buildWhatsAppLink(siteConfig.whatsapp, select.value);
    if (url) link.href = url;
  };
  updateLink();
  select.addEventListener('change', updateLink);
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = button;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus();
  });
}
