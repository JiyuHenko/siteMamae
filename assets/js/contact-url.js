/** Produces an outbound URL only for a complete Brazilian professional number. */
export function buildWhatsAppLink(rawNumber, subject = 'Informações sobre a consulta') {
  const number = String(rawNumber || '').replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(number)) return null;
  const message = `Olá, Fernanda! Vim pelo seu site e gostaria de conversar sobre: ${String(subject).toLowerCase()}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
