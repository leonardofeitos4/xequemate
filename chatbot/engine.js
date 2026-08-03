/* ═══════════════════════════════════════════
   MOTOR DO CHAT — Xeque
   Depende de: data/site.js, config.js, flows.js
═══════════════════════════════════════════ */

let aiStarted = false;

/* Opções rápidas abaixo da mensagem */
function showChips(chips, area) {
  const wrap = document.createElement('div');
  wrap.className = 'inline-chips';

  let html = chips.map(c => c.wa
    ? `<a class="qrb qrb-wa" href="${waLink(c.wa)}" target="_blank" rel="noopener">${c.l}</a>`
    : `<button class="qrb" data-flow="${c.f}" data-label="${c.l}">${c.l}</button>`
  ).join('');

  if (!chips.some(c => c.f === 'inicio')) {
    html += `<button class="qrb qrb-back" data-flow="inicio" data-label="↩ Voltar ao início">↩ Início</button>`;
  }

  wrap.innerHTML = html;
  wrap.querySelectorAll('button[data-flow]').forEach(b => {
    b.addEventListener('click', () => runFlow(b.dataset.flow, b.dataset.label));
  });

  area.appendChild(wrap);
  area.scrollTop = area.scrollHeight;
}

/* Desativa as opções anteriores quando uma é escolhida */
function disableChips() {
  document.querySelectorAll('.inline-chips').forEach(el => {
    el.style.opacity = '.35';
    el.style.pointerEvents = 'none';
  });
}

/* Navega para um fluxo */
function runFlow(id, label) {
  const f = flows[id];
  if (!f) return;
  disableChips();
  if (label) userMsg(label);
  botMsg(f.msg, f.chips);
}

/* Abertura do chat */
function startChat() {
  botMsg(
    `Olá! Eu sou o <strong>${CONFIG.nome}</strong>, assistente digital da <strong>${SITE.curto}</strong>. ♟️<br><br>` +
    `Posso te ajudar com dúvidas sobre consultoria empresarial, treinamento e recrutamento & seleção.`,
    flows.inicio.chips
  );
}

/* Mensagem da assistente, com indicador de digitação */
function botMsg(html, chips) {
  const a = document.getElementById('chat-area');
  if (!a) return;

  const td = document.createElement('div');
  td.className = 'typing-dot';
  td.innerHTML = '<span></span><span></span><span></span>';
  a.appendChild(td);
  a.scrollTop = a.scrollHeight;

  setTimeout(() => {
    td.remove();

    const lbl = document.createElement('div');
    lbl.className = 'mlbl';
    lbl.innerHTML = `<span class="mlbl-ava">${CONFIG.monograma}</span>${CONFIG.assinatura}`;
    a.appendChild(lbl);

    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.innerHTML = html;
    a.appendChild(msg);

    if (chips !== undefined) showChips(chips, a);
    a.scrollTop = a.scrollHeight;
  }, CONFIG.typingDelayMin + Math.random() * CONFIG.typingDelayRandom);
}

/* Mensagem da visitante */
function userMsg(texto) {
  const a = document.getElementById('chat-area');
  if (!a) return;

  const lbl = document.createElement('div');
  lbl.className = 'mlbl u';
  lbl.textContent = 'Você';

  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.textContent = texto;

  a.appendChild(lbl);
  a.appendChild(msg);
  a.scrollTop = a.scrollHeight;
}
