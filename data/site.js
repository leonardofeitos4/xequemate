/* ═══════════════════════════════════════════
   CONFIGURAÇÃO CENTRAL DO SITE
   Único lugar para alterar contato e redes.
   Todo o resto lê daqui.

   ⚠️ Itens marcados com AJUSTAR ainda estão
   com valor provisório — ver docs/PENDENCIAS.md
═══════════════════════════════════════════ */

const SITE = {
  nome:      'Xeque-mate Consultoria',
  curto:     'Xeque-mate',
  area:      'Consultoria empresarial · RH · Treinamentos · NR-01',

  whatsapp:  '5584999836270',        // (84) 99983-6270 — confirmado como WhatsApp
  instagram: 'xequemate.consultoria',
  email:     'xmdesenvolve@gmail.com',

  cidade:    'João Pessoa · PB',     // AJUSTAR

  // URL do Google Apps Script (App da Web) — ver docs/envio-automatico.md.
  // Se ficar vazio, os formulários voltam a funcionar só por WhatsApp/e-mail manual.
  formWebhook: 'https://script.google.com/macros/s/AKfycbywWoSnoejhOwdiPaxFLut101x1qqllCw-oMypDArqtD1EelFtyQ61ttbWakwLPN6xloA/exec',

  assistente: {
    nome:      'Xeque',
    monograma: 'X',
    assinatura:'Xeque · Assistente digital',
  },
};

/* Monta um link de WhatsApp já com a mensagem codificada */
function waLink(msg) {
  return waLinkTo(SITE.whatsapp, msg);
}

/* Mesmo link, mas para outro número (ex.: WhatsApp de um parceiro) */
function waLinkTo(numero, msg) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
}

/* Link do Instagram */
function igLink() {
  return `https://instagram.com/${SITE.instagram}`;
}
