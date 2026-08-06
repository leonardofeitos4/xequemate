/* ═══════════════════════════════════════════
   DADOS — Serviços da Xeque-mate

   Textos a partir do cartão de serviços oficial
   da Xeque-mate (servicos-fonte.png).
═══════════════════════════════════════════ */

const servicos = [
  {
    tag:   'Consultoria empresarial',
    title: 'Consultoria empresarial',
    desc:  'NR-01, diagnóstico organizacional, mapeamento e implantação de processos de melhoria contínuos em todas as áreas organizacionais.',
    botoes: [
      { txt: 'Solicitar orçamento', form: 'consultoria' },
    ],
  },
  {
    tag:   'Treinamento e desenvolvimento',
    title: 'Treinamento e desenvolvimento',
    desc:  'Treinamento e desenvolvimento de lideranças e equipes de alta performance.',
    botoes: [
      { txt: 'Solicitar orçamento', form: 'treinamento' },
    ],
  },
  {
    tag:   'Recrutamento & Seleção',
    title: 'Recrutamento & Seleção',
    desc:  'Atração, captação e manutenção de talentos: CLT, estagiários e jovem aprendiz.',
    botoes: [
      { txt: 'Enviar currículo',    form: 'curriculo' },
      { txt: 'Solicitar orçamento', form: 'rs-orcamento' },
    ],
  },
];

function renderServicos() {
  const el = document.getElementById('svc-list');
  if (!el) return;
  el.innerHTML = servicos.map(s => `
    <div class="svc">
      <div class="svc-head">
        <div>
          <span class="svc-tag">${s.tag}</span>
          <div class="svc-title">${s.title}</div>
        </div>
      </div>
      <div class="svc-desc">${s.desc}</div>
      <div class="svc-acoes">
        ${s.botoes.map(b => b.form
          ? `<button class="svc-btn" onclick="go('page-form','${b.form}')">${b.txt} →</button>`
          : `<a class="svc-btn" href="${waLink(b.wa)}" target="_blank" rel="noopener">${b.txt} →</a>`
        ).join('')}
      </div>
    </div>`).join('');
}
