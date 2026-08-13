/* ═══════════════════════════════════════════
   SEÇÕES — render das páginas de conteúdo
   Depende de: data/site.js, data/secoes.js
═══════════════════════════════════════════ */

function renderSecao(chave) {
  const s = SECOES[chave];
  const body = document.getElementById('secao-body');
  if (!s || !body) return;

  document.getElementById('secao-titulo').textContent = s.titulo;

  const paragrafos = s.texto.map(p => `<p class="secao-p">${p}</p>`).join('');
  const lista = s.lista ? renderParceiros(s.lista) : '';

  body.innerHTML = `
    <figure class="secao-capa">
      <img src="${s.capa}" alt="${s.titulo}" loading="lazy">
    </figure>
    <div class="secao-tag">${s.tag}</div>
    <div class="secao-texto">${paragrafos}</div>
    ${lista}
    ${s.cta ? `
    <a class="cta-btn" href="${waLink(s.cta.wa)}" target="_blank" rel="noopener">
      <span>${s.cta.label}</span><span class="cta-arr">→</span>
    </a>` : ''}
  `;
}

function renderParceiros(lista) {
  if (!lista.length) {
    return `<div class="parc-vazio">Em breve, novidades por aqui.</div>`;
  }
  return `<div class="parc-list">${lista.map(p => `
    <div class="parc-card">
      ${p.logo ? `<div class="parc-logo"><img src="${p.logo}" alt="${p.nome}"></div>` : ''}
      <div class="parc-nome">${p.nome}</div>
      ${p.descricao ? `<div class="parc-desc">${p.descricao}</div>` : ''}
      ${p.wa || p.link ? `
      <a class="cta-ghost" href="${p.link || waLinkTo(p.wa, p.waMsg || 'Olá!')}" target="_blank" rel="noopener">
        Entrar em contato
      </a>` : ''}
    </div>`).join('')}</div>`;
}
