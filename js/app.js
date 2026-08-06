/* ═══════════════════════════════════════════
   APP — navegação, hidratação e interações
   Depende de: data/site.js, data/servicos.js,
   chatbot/*
═══════════════════════════════════════════ */

/* ══════════════════════════════
   1. HIDRATAÇÃO A PARTIR DO SITE
   Evita número de WhatsApp espalhado
   pelo HTML — tudo vem de data/site.js.
══════════════════════════════ */
function hydrate() {
  /* href de WhatsApp: <a data-wa="mensagem"> */
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.setAttribute('href', waLink(el.dataset.wa));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* href do Instagram */
  document.querySelectorAll('[data-href="instagram"]').forEach(el => {
    el.setAttribute('href', igLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* href de e-mail (o card some se não houver e-mail definido) */
  document.querySelectorAll('[data-href="email"]').forEach(el => {
    if (!SITE.email) { el.remove(); return; }
    el.setAttribute('href', 'mailto:' + SITE.email);
  });

  /* Textos: <span data-txt="cidade"> */
  const textos = {
    nome:      SITE.nome,
    curto:     SITE.curto,
    area:      SITE.area,
    cidade:    SITE.cidade,
    instagram: '@' + SITE.instagram,
    email:     SITE.email,
  };
  document.querySelectorAll('[data-txt]').forEach(el => {
    const v = textos[el.dataset.txt];
    if (v !== undefined) el.textContent = v;
  });

  document.title = `${SITE.curto} | Consultoria empresarial`;
}

/* ══════════════════════════════
   2. NAVEGAÇÃO ENTRE PÁGINAS
══════════════════════════════ */
const ROTAS = {
  'page-chat': 'duvidas',
};
const POR_SLUG = {};
Object.entries(ROTAS).forEach(([id, slug]) => { POR_SLUG[slug] = id; });

let paginaAtual = null;

function go(id) { location.hash = ROTAS[id] || ''; }
function back() { history.back(); }

function sincronizar() {
  const id = POR_SLUG[location.hash.slice(1)] || null;
  if (id === paginaAtual) return;

  if (paginaAtual) document.getElementById(paginaAtual).classList.remove('active');
  paginaAtual = id;

  const home = document.getElementById('home');
  const fabs = document.getElementById('home-fabs');

  if (!id) {
    home.classList.remove('behind');
    fabs.style.cssText = '';
    return;
  }

  const pg = document.getElementById(id);
  pg.classList.add('active');
  pg.scrollTop = 0;
  home.classList.add('behind');
  fabs.style.cssText = 'opacity:0;pointer-events:none';

  if (id === 'page-chat' && !aiStarted) { aiStarted = true; startChat(); }
}

addEventListener('hashchange', sincronizar);

/* ══════════════════════════════
   3. FABS — somem durante a rolagem
   para não cobrir os botões dos
   cards de serviço.
══════════════════════════════ */
function bindFabsScroll() {
  const home = document.getElementById('home');
  const fabs = document.getElementById('home-fabs');
  let lastY = home.scrollTop;
  let hideTimer = null;

  home.addEventListener('scroll', () => {
    if (paginaAtual) return; // subpágina já esconde os fabs

    const y = home.scrollTop;
    const down = y > lastY;
    lastY = y;

    if (down && y > 60) fabs.classList.add('hide');
    else fabs.classList.remove('hide');

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => fabs.classList.remove('hide'), 500);
  }, { passive: true });
}

/* ══════════════════════════════
   4. RIPPLE NOS CARDS
══════════════════════════════ */
function bindRipple() {
  document.querySelectorAll('.lcard').forEach(card => {
    card.addEventListener('pointerdown', function (e) {
      const r = this.getBoundingClientRect();
      const size = r.width * 2;
      const d = document.createElement('div');
      d.className = 'ripple';
      d.style.cssText =
        `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;` +
        `width:${size}px;height:${size}px;margin:-${size / 2}px`;
      this.appendChild(d);
      setTimeout(() => d.remove(), 500);
    });
  });
}

/* ══════════════════════════════
   5. FOLDER EM TELA CHEIA
══════════════════════════════ */
function abrirFolder() {
  document.getElementById('lb').classList.add('open');
  document.getElementById('home-fabs').classList.add('hide');
}
function fecharFolder() {
  document.getElementById('lb').classList.remove('open');
  document.getElementById('home-fabs').classList.remove('hide');
}
addEventListener('keydown', e => { if (e.key === 'Escape') fecharFolder(); });

/* ══════════════════════════════
   6. BOOT
══════════════════════════════ */
hydrate();
renderServicos();
bindRipple();
bindFabsScroll();
sincronizar();
