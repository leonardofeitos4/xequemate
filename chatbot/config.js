/* ═══════════════════════════════════════════
   CHATBOT — configuração
   Depende de: data/site.js (SITE, waLink)
═══════════════════════════════════════════ */

const CONFIG = {
  nome:       SITE.assistente.nome,
  monograma:  SITE.assistente.monograma,
  assinatura: SITE.assistente.assinatura,

  /* Tempo do indicador "digitando" (ms) */
  typingDelayMin:    900,
  typingDelayRandom: 700,
};
