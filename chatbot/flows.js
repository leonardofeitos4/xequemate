/* ═══════════════════════════════════════════
   FLUXOS — Xeque, assistente da Xeque-mate

   Estrutura de cada fluxo:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Rótulo', f: 'id_do_fluxo' }  → navega
       { l: 'Rótulo', wa: 'mensagem' }    → abre WhatsApp
     ]
   }

   Para criar um novo fluxo: adicione a entrada
   aqui e referencie com { f: 'novo_fluxo' }.
═══════════════════════════════════════════ */

const flows = {

  /* ── MENU PRINCIPAL ── */
  inicio: {
    msg: `Sobre o que você quer falar? ♟️`,
    chips: [
      { l: '🏢 Consultoria empresarial', f: 'consultoria' },
      { l: '🎓 Treinamento e desenvolvimento', f: 'treinamento' },
      { l: '💼 Recrutamento & Seleção', f: 'recrutamento' },
      { l: '💬 Falar com a equipe', f: 'equipe' },
    ]
  },

  consultoria: {
    msg: `Fazemos <strong>consultoria empresarial</strong>: NR-01, diagnóstico organizacional, mapeamento e implantação de processos de melhoria contínuos em todas as áreas da empresa.`,
    chips: [
      { l: 'Solicitar orçamento', wa: 'Olá! Gostaria de solicitar um orçamento de consultoria empresarial/NR-01.' },
      { l: 'Falar sobre treinamento', f: 'treinamento' },
    ]
  },

  treinamento: {
    msg: `Trabalhamos <strong>treinamento e desenvolvimento</strong> de lideranças e equipes de alta performance, sob medida para a sua empresa.`,
    chips: [
      { l: 'Solicitar orçamento', wa: 'Olá! Gostaria de solicitar um orçamento de treinamento e desenvolvimento.' },
      { l: 'Falar sobre consultoria', f: 'consultoria' },
    ]
  },

  recrutamento: {
    msg: `Cuidamos da <strong>atração, captação e manutenção de talentos</strong>: CLT, estagiários e jovem aprendiz.<br><br>Tem interesse em enviar seu currículo?`,
    chips: [
      { l: '📎 Enviar currículo', wa: 'Olá! Gostaria de enviar meu currículo para a Xeque-mate.' },
      { l: 'Sou empresa, quero contratar', wa: 'Olá! Minha empresa tem interesse no serviço de recrutamento e seleção da Xeque-mate.' },
    ]
  },

  equipe: {
    msg: `Perfeito! 🤝<br><br>É só tocar no botão abaixo que a nossa equipe te responde no WhatsApp.`,
    chips: [
      { l: '💬 Falar no WhatsApp', wa: 'Olá! Vim pelo link do perfil da Xeque-mate e gostaria de falar com a equipe.' },
    ]
  },
};
