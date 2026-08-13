/* ═══════════════════════════════════════════
   FORMULÁRIOS — render, validação e envio
   Depende de: data/site.js, data/formularios.js
═══════════════════════════════════════════ */

let formAtual = null;   // chave do formulário aberto
const MAX_ANEXO_MB = 15; // limite confortável abaixo do teto de anexo do Gmail (25MB)

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
  } else if (c.tipo === 'file') {
    controle = `<input ${nome} type="file" accept="${c.accept || ''}">
      <span class="form-hint" id="hint-${c.id}">Até ${MAX_ANEXO_MB}MB.</span>`;
  } else {
    controle = `<input ${nome} type="${c.tipo}" placeholder="${c.ph || ''}"
      ${c.tipo === 'tel' ? 'inputmode="tel"' : ''}
      ${c.tipo === 'email' ? 'inputmode="email" autocapitalize="off" spellcheck="false"' : ''}>
      ${c.tipo === 'tel' ? `<span class="form-hint" id="hint-${c.id}">Com DDD e o 9º dígito — ex.: (83) 99666-6285.</span>` : ''}`;
  }

  return `<label class="form-campo" for="c-${c.id}">
    <span class="form-label">${c.label}${req}</span>
    ${controle}
  </label>`;
}

/* ══════════════════════════════
   2. VALIDAÇÃO E MONTAGEM
══════════════════════════════ */
/* Celular brasileiro: DDD (2 dígitos) + 9º dígito + 8 dígitos, com ou sem
   parênteses/espaço/traço — a formatação não importa, só a quantidade. */
function telefoneValido(v) {
  return /^[1-9]{2}9\d{8}$/.test(v.replace(/\D/g, ''));
}

function lerFormulario() {
  const f = FORMULARIOS[formAtual];
  const dados = [];
  let arquivoEl = null;
  let primeiroErro = null;

  f.campos.forEach(c => {
    const el = document.getElementById('c-' + c.id);

    if (c.tipo === 'file') {
      const arquivo = el.files[0];
      const grande  = arquivo && arquivo.size > MAX_ANEXO_MB * 1024 * 1024;
      const erro    = (c.req && !arquivo) || grande;
      const hint    = document.getElementById('hint-' + c.id);

      el.classList.toggle('erro', erro);
      if (hint) {
        hint.textContent = grande
          ? `Esse arquivo passou de ${MAX_ANEXO_MB}MB — escolha um PDF menor.`
          : `Até ${MAX_ANEXO_MB}MB.`;
        hint.classList.toggle('erro-txt', grande);
      }
      if (erro && !primeiroErro) primeiroErro = el;
      if (arquivo && !grande) arquivoEl = el;
      return;
    }

    const v = (el.value || '').trim();
    const vazio     = c.req && !v;
    const emailRuim = c.tipo === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const telRuim   = c.tipo === 'tel'   && v && !telefoneValido(v);
    const erro      = vazio || emailRuim || telRuim;

    el.classList.toggle('erro', erro);
    if (c.tipo === 'tel') {
      const hint = document.getElementById('hint-' + c.id);
      if (hint) hint.classList.toggle('erro-txt', telRuim);
    }
    if (erro && !primeiroErro) primeiroErro = el;
    if (v) dados.push({ label: c.label, valor: v });
  });

  if (primeiroErro) {
    primeiroErro.focus();
    primeiroErro.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return null;
  }
  return { dados, arquivoEl };
}

/* Lê um arquivo do disco e devolve só a parte base64 (sem o prefixo data:...) */
function lerArquivoComoBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* Texto que vai no WhatsApp e no corpo do e-mail */
function montarTexto(dados) {
  const f = FORMULARIOS[formAtual];
  const linhas = dados.map(d => `*${d.label}:* ${d.valor}`).join('\n');
  return `${f.titulo} — ${f.servico}\n\n${linhas}\n\n_Enviado pelo site da Xeque-mate._`;
}

/* ══════════════════════════════
   3. ENVIO
   Com SITE.formWebhook configurado (ver
   docs/envio-automatico.md), o envio é automático:
   o botão já dispara pro Apps Script e mostra a
   confirmação, sem precisar abrir WhatsApp/e-mail.

   Sem webhook configurado, cai no modo manual de
   sempre (mensagem pronta, a pessoa confirma no
   WhatsApp ou no e-mail) — nada quebra.
══════════════════════════════ */
async function enviarFormulario() {
  const lido = lerFormulario();
  if (!lido) return;
  const { dados, arquivoEl } = lido;

  const f     = FORMULARIOS[formAtual];
  const texto = montarTexto(dados);
  const assunto = `${f.titulo} — ${f.servico}`;
  const mail  = `mailto:${SITE.email}?subject=${encodeURIComponent(assunto)}`
              + `&body=${encodeURIComponent(texto.replace(/\*/g, ''))}`;

  const ok  = document.getElementById('form-ok');
  const btn = document.querySelector('#form-el .form-enviar');

  if (SITE.formWebhook) {
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Enviando…';

    const payload = { titulo: f.titulo, servico: f.servico, campos: dados };
    const arquivo = arquivoEl && arquivoEl.files[0];
    if (arquivo) {
      payload.arquivo = {
        nome: arquivo.name,
        tipo: arquivo.type || 'application/pdf',
        base64: await lerArquivoComoBase64(arquivo),
      };
    }

    try {
      await fetch(SITE.formWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch (e) { /* segue e mostra a confirmação do mesmo jeito */ }

    ok.innerHTML = `
      <div class="form-ok-ico">✓</div>
      <div class="form-ok-tit">Enviado!</div>
      <p class="form-ok-txt">Recebemos seus dados${arquivo ? ' e o currículo' : ''}. A equipe da Xeque-mate entra em contato pelo WhatsApp informado.</p>
      <a class="cta-ghost" href="${waLink(texto)}" target="_blank" rel="noopener">Falar agora pelo WhatsApp</a>
      <button class="form-voltar" onclick="editarFormulario()">← Editar respostas</button>
    `;
  } else {
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
  }

  document.getElementById('form-el').hidden = true;
  ok.hidden = false;
  document.getElementById('page-form').scrollTop = 0;
}

function editarFormulario() {
  document.getElementById('form-ok').hidden = true;
  document.getElementById('form-el').hidden = false;
}
