/* ═══════════════════════════════════════════
   FORMULÁRIOS — as "abas" de orçamento e currículo

   Cada chave vira uma rota: #formulario/<chave>.
   Para mudar as perguntas, mexa só aqui.

   campos[].tipo: text | tel | email | textarea | select
   envio: 'ambos'  → WhatsApp (principal) + e-mail
          'email'  → só e-mail (caso do currículo)

   ⚠️ Campos provisórios — a Xeque-mate ainda vai
   mandar a lista definitiva de cada aba.
═══════════════════════════════════════════ */

/* Perguntas que se repetem em todo orçamento */
const CAMPOS_BASE = [
  { id: 'nome',     label: 'Seu nome',   tipo: 'text',  req: true,  ph: 'Nome completo' },
  { id: 'empresa',  label: 'Empresa',    tipo: 'text',  req: true,  ph: 'Nome da empresa' },
  { id: 'telefone', label: 'WhatsApp',   tipo: 'tel',   req: true,  ph: '(00) 00000-0000' },
  { id: 'email',    label: 'E-mail',     tipo: 'email', req: true,  ph: 'voce@empresa.com' },
  { id: 'porte',    label: 'Nº de colaboradores', tipo: 'select', req: false,
    opcoes: ['Até 10', '11 a 50', '51 a 100', 'Mais de 100'] },
];

const FORMULARIOS = {

  'consultoria': {
    titulo: 'Solicitar orçamento',
    servico: 'Consultoria empresarial',
    intro: 'Responda o básico e a equipe já volta com um orçamento.',
    envio: 'ambos',
    campos: [
      ...CAMPOS_BASE,
      { id: 'necessidade', label: 'Qual a necessidade?', tipo: 'textarea', req: true,
        ph: 'Ex.: implantar a NR-01, mapear processos, diagnóstico organizacional…' },
    ],
  },

  'treinamento': {
    titulo: 'Solicitar orçamento',
    servico: 'Treinamento e desenvolvimento',
    intro: 'Responda o básico e a equipe já volta com um orçamento.',
    envio: 'ambos',
    campos: [
      ...CAMPOS_BASE,
      { id: 'necessidade', label: 'Qual treinamento e para qual equipe?', tipo: 'textarea', req: true,
        ph: 'Ex.: liderança para 12 supervisores, integração de equipe comercial…' },
    ],
  },

  'rs-orcamento': {
    titulo: 'Solicitar orçamento',
    servico: 'Recrutamento & Seleção',
    intro: 'Responda o básico e a equipe já volta com um orçamento.',
    envio: 'ambos',
    campos: [
      ...CAMPOS_BASE,
      { id: 'contratacao', label: 'Tipo de contratação', tipo: 'select', req: false,
        opcoes: ['CLT', 'Estágio', 'Jovem aprendiz', 'Mais de um tipo'] },
      { id: 'vagas', label: 'Vagas e perfil desejado', tipo: 'textarea', req: true,
        ph: 'Ex.: 2 vagas de auxiliar administrativo, ensino médio completo…' },
    ],
  },

  'curriculo': {
    titulo: 'Enviar currículo',
    servico: 'Recrutamento & Seleção',
    intro: 'Preencha os dados, anexe o currículo e pronto — enviamos direto pra equipe.',
    envio: 'email',
    campos: [
      { id: 'nome',      label: 'Seu nome', tipo: 'text',  req: true,  ph: 'Nome completo' },
      { id: 'telefone',  label: 'WhatsApp', tipo: 'tel',   req: true,  ph: '(00) 00000-0000' },
      { id: 'area',      label: 'Área ou vaga de interesse', tipo: 'text', req: true,
        ph: 'Ex.: administrativo, estágio em RH…' },
      { id: 'curriculo', label: 'Currículo (PDF)', tipo: 'file', req: true, accept: '.pdf,application/pdf' },
    ],
  },

};
