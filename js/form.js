/* ═══════════════════════════════════════════
   FORMULÁRIOS — render, validação e envio
   Depende de: data/site.js, data/formularios.js
═══════════════════════════════════════════ */

let formAtual = null;   // chave do formulário aberto

/* ══════════════════════════════
   1. RENDER
══════════════════════════════ */
function renderFormulario(chave) {
  const f = FORMULARIOS[chave];
  const body = document.getElementById('form-body');
  if (!f || !body) return;

  formAtual = chave;
  document.getElementById('form-titulo').textContent = f.titulo;

  body.innerHTML = `
    <div class="form-topo">
      <div class="form-servico">${f.servico}</div>
      <p class="form-intro">${f.intro}</p>
    </div>
    <form class="form-campos" id="form-el" novalidate>
      ${f.campos.map(campo).join('')}
      <button type="submit" class="cta-btn form-enviar">
        <span>Enviar</span><span class="cta-arr">→</span>
      </button>
      <p class="form-nota">
        Seus dados vão direto para a equipe da Xeque-mate. Nada fica salvo no site.
      </p>
    </form>
    <div class="form-ok" id="form-ok" hidden></div>
  `;

  document.getElementById('form-el').addEventListener('submit', e => {
    e.preventDefault();
    enviarFormulario();
  });
}

/* Um campo do formulário */
function campo(c) {
  const req = c.req ? '<span class="form-req">*</span>' : '';
  const nome = `id="c-${c.id}" name="${c.id}"${c.req ? ' required' : ''}`;

  let controle;
  if (c.tipo === 'textarea') {
    controle = `<textarea ${nome} rows="4" placeholder="${c.ph || ''}"></textarea>`;
  } else if (c.tipo === 'select') {
    controle = `<select ${nome}>
      <option value="">Selecione…</option>
      ${c.opcoes.map(o => `<option>${o}</option>`).join('')}
    </select>`;
  } else {
    controle = `<input ${nome} type="${c.tipo}" placeholder="${c.ph || ''}"
      ${c.tipo === 'tel' ? 'inputmode="tel"' : ''}
      ${c.tipo === 'email' ? 'inputmode="email" autocapitalize="off" spellcheck="false"' : ''}>`;
  }

  return `<label class="form-campo" for="c-${c.id}">
    <span class="form-label">${c.label}${req}</span>
    ${controle}
  </label>`;
}

/* ══════════════════════════════
   2. VALIDAÇÃO E MONTAGEM
══════════════════════════════ */
function lerFormulario() {
  const f = FORMULARIOS[formAtual];
  const dados = [];
  let primeiroErro = null;

  f.campos.forEach(c => {
    const el = document.getElementById('c-' + c.id);
    const v = (el.value || '').trim();

    const vazio    = c.req && !v;
    const emailRuim = c.tipo === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const erro     = vazio || emailRuim;

    el.classList.toggle('erro', erro);
    if (erro && !primeiroErro) primeiroErro = el;
    if (v) dados.push({ label: c.label, valor: v });
  });

  if (primeiroErro) {
    primeiroErro.focus();
    primeiroErro.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return null;
  }
  return dados;
}

/* Texto que vai no WhatsApp e no corpo do e-mail */
function montarTexto(dados) {
  const f = FORMULARIOS[formAtual];
  const linhas = dados.map(d => `*${d.label}:* ${d.valor}`).join('\n');
  return `${f.titulo} — ${f.servico}\n\n${linhas}\n\n_Enviado pelo site da Xeque-mate._`;
}

/* ══════════════════════════════
   3. ENVIO
   Sem servidor, o site não consegue disparar
   sozinho: ele deixa a mensagem pronta e a
   pessoa confirma no WhatsApp ou no e-mail.
   → Para envio 100% automático, plugar aqui
     um endpoint (ver docs/PENDENCIAS.md).
══════════════════════════════ */
function enviarFormulario() {
  const dados = lerFormulario();
  if (!dados) return;

  const f     = FORMULARIOS[formAtual];
  const texto = montarTexto(dados);
  const assunto = `${f.titulo} — ${f.servico}`;
  const mail  = `mailto:${SITE.email}?subject=${encodeURIComponent(assunto)}`
              + `&body=${encodeURIComponent(texto.replace(/\*/g, ''))}`;

  const ok = document.getElementById('form-ok');
  const soEmail = f.envio === 'email';

  ok.innerHTML = `
    <div class="form-ok-ico">✓</div>
    <div class="form-ok-tit">Tudo preenchido</div>
    <p class="form-ok-txt">
      ${soEmail
        ? 'Toque abaixo para abrir seu e-mail com tudo pronto — <strong>é só anexar o currículo em PDF e enviar</strong>.'
        : 'Escolha por onde enviar. A mensagem já vai montada.'}
    </p>
    ${soEmail ? '' : `
    <a class="cta-btn" href="${waLink(texto)}" target="_blank" rel="noopener">
      <span>Enviar pelo WhatsApp</span><span class="cta-arr">→</span>
    </a>`}
    <a class="${soEmail ? 'cta-btn' : 'cta-ghost'}" href="${mail}">
      ${soEmail ? '<span>Abrir e-mail e anexar currículo</span><span class="cta-arr">→</span>' : 'Enviar por e-mail'}
    </a>
    <button class="form-voltar" onclick="editarFormulario()">← Editar respostas</button>
  `;

  document.getElementById('form-el').hidden = true;
  ok.hidden = false;
  document.getElementById('page-form').scrollTop = 0;
}

function editarFormulario() {
  document.getElementById('form-ok').hidden = true;
  document.getElementById('form-el').hidden = false;
}
