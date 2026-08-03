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

  whatsapp:  '5584999836270',        // (84) 99983-6270 — confirmar se é WhatsApp
  instagram: 'xequemate.consultoria',
  email:     'xmdesenvolve@gmail.com',

  cidade:    'João Pessoa · PB',     // AJUSTAR

  assistente: {
    nome:      'Xeque',
    monograma: 'X',
    assinatura:'Xeque · Assistente digital',
  },
};

/* Monta um link de WhatsApp já com a mensagem codificada */
function waLink(msg) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* Link do Instagram */
function igLink() {
  return `https://instagram.com/${SITE.instagram}`;
}
