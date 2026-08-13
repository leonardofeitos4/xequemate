/* ═══════════════════════════════════════════
   SEÇÕES — páginas de conteúdo simples
   (Xeque-mate de Carreira, Inovação, Parceiros)

   Cada chave vira uma rota: #secao/<chave>.

   ⚠️ Textos de carreira/inovação são provisórios
   (ainda sem vídeo) — a Xeque-mate vai mandar o
   texto definitivo. Trocar é só editar aqui.

   ⚠️ Parceiros: lista vazia até a Xeque-mate mandar
   nome, logo, descrição e contato de cada parceiro.
═══════════════════════════════════════════ */

const SECOES = {

  carreira: {
    titulo: 'Xeque-mate de Carreira',
    capa:   'assets/img/arte-carreira.jpg',
    tag:    'Desenvolvimento individual',
    texto: [
      'A Xeque-mate de Carreira é a frente voltada para pessoas, não empresas: orientação para quem quer dar o próximo passo profissional.',
      'Trabalhamos planejamento de carreira, preparação para novas oportunidades e desenvolvimento de habilidades para quem busca crescer.',
    ],
    cta: { label: 'Falar sobre carreira', wa: 'Olá! Tenho interesse na Xeque-mate de Carreira e gostaria de saber mais.' },
  },

  inovacao: {
    titulo: 'Xeque-mate Inovação',
    capa:   'assets/img/arte-inovacao.jpg',
    tag:    'Transformação organizacional',
    texto: [
      'A Xeque-mate Inovação ajuda empresas a repensar processos e criar cultura de melhoria contínua.',
      'É a frente voltada para quem já tem a base organizacional pronta e quer acelerar — novas formas de trabalhar, novas ferramentas, novos resultados.',
    ],
    cta: { label: 'Falar sobre inovação', wa: 'Olá! Tenho interesse na Xeque-mate Inovação e gostaria de saber mais.' },
  },

  parceiros: {
    titulo: 'Parceiros',
    capa:   'assets/img/arte-parceiros.jpg',
    tag:    'Quem caminha com a gente',
    texto: [
      'Empresas e profissionais com quem a Xeque-mate tem parceria.',
    ],
    lista: [
      /* AJUSTAR — aguardando dados da Xeque-mate. Formato de cada item:
      {
        nome: 'Nome do parceiro',
        logo: 'assets/img/logo-parceiro.png',
        descricao: 'Uma ou duas linhas sobre o parceiro.',
        wa: '5583999999999',              // ou use link: 'https://…'
        waMsg: 'Olá! Vim pelo link da Xeque-mate.',
      },
      */
    ],
  },

};
