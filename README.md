# Biolink — Xeque-mate Consultoria

Página de links da Xeque-mate Consultoria (RH, capacitações e consultoria em
NR-01). HTML, CSS e JavaScript puros, sem build, sem dependências.

Para rodar, basta abrir `index.html` no navegador (ou servir a pasta:
`python -m http.server 8000`).

## Estrutura

```
index.html              todas as telas (home + chat), em uma SPA sem framework
├── css/
│   ├── main.css        tokens de design, reset, sistema de páginas, componentes
│   ├── home.css        capa, pilares, cards de serviço, links, rodapé
│   ├── pages.css       cabeçalho e corpo padrão das subpáginas
│   └── chat.css        assistente "Xeque"
├── js/
│   └── app.js          hidratação, navegação, ripple
├── data/
│   ├── site.js         ⭐ configuração central: contato e redes
│   └── servicos.js     os 3 serviços (Vagas, Capacitações, NR-01)
├── chatbot/
│   ├── config.js       nome do assistente e velocidade de digitação
│   ├── flows.js        árvore de conversa
│   └── engine.js       motor de renderização do chat
├── assets/img/         vazio por enquanto — ver docs/PENDENCIAS.md
└── docs/
    └── PENDENCIAS.md   ⚠️ o que ainda falta a Xeque-mate informar
```

## Onde mexer

**Trocar WhatsApp, Instagram ou e-mail:** só em `data/site.js`. Nenhum número
ou @ está escrito no HTML, o `app.js` preenche tudo no carregamento a partir
dos atributos `data-wa`, `data-href` e `data-txt`.

**Editar um serviço:** cada item é uma entrada no array `servicos` em
`data/servicos.js` (`tag`, `title`, `desc`, `botao`, `wa`).

**Mexer no chat:** cada resposta é uma entrada em `flows` (`chatbot/flows.js`),
com `msg` e `chips`. Um chip com `f` navega para outro fluxo; um chip com `wa`
abre o WhatsApp.

## Antes de publicar

Ver `docs/PENDENCIAS.md` — falta logo, foto de capa e revisão dos textos de
serviço com a Xeque-mate.
