# Pendências — informações que faltam da Xeque-mate

Encontrei o cartão oficial de serviços e a logo da Xeque-mate (estavam salvos
por engano na pasta da bioclara) e já atualizei o site com os dados reais:
logo, e-mail (`xmdesenvolve@gmail.com`) e os 3 serviços oficiais (Consultoria
empresarial, Treinamento e desenvolvimento, Recrutamento & Seleção).

## 1. Envio automático dos formulários — precisa de decisão

As abas de orçamento e currículo já existem (`data/formularios.js`), mas o
site é HTML/CSS/JS puro, sem servidor. Hoje ele **monta a mensagem pronta** e
a pessoa confirma o envio no WhatsApp ou no e-mail. Para sair sozinho, precisa
de um dos caminhos abaixo — o ponto de plugue está marcado em
`js/form.js`, em `enviarFormulario()`:

| Caminho | E-mail sozinho | Anexo de currículo | Custo |
|---|---|---|---|
| Formspree | sim | só no plano pago | grátis até 50/mês |
| Google Apps Script | sim | sim, salva no Drive | grátis |
| Só WhatsApp pré-preenchido (atual) | não | não | zero |

Recomendação: Apps Script — grátis, o e-mail sai da própria conta da
Xeque-mate e resolve o anexo do currículo.

## 2. Perguntas de cada aba

Os campos em `data/formularios.js` são um palpite razoável (nome, empresa,
contato, porte e a necessidade). A Xeque-mate ficou de mandar a lista
definitiva de cada aba. Trocar é só editar esse arquivo.

## 3. Cidade

`cidade` está como `João Pessoa · PB`, mas **o DDD 84 é do Rio Grande do
Norte** (região de Natal) — João Pessoa é DDD 83. Confirmar qual é a cidade
certa.

## 4. Número de WhatsApp

Confirmado: `(84) 99983-6270` → `5584999836270`. Atenção ao digitar, porque
celular no Brasil tem 9 dígitos depois do DDD (99983-6270, com três noves no
começo) — sem o nono dígito o link do WhatsApp não abre.

## 5. Foto de capa

O site ainda não tem uma foto de capa (só a logo no avatar do topo). Se
quiserem uma foto da equipe ou do escritório, é só mandar.

## 6. Material de referência

`assets/img/cartao-fonte.png`, `servicos-fonte.png` e `folder-fonte.jpeg` são
os originais recebidos — não são carregados pelo site, ficam aqui só para
conferir texto. O folder que aparece na home é o recorte
`assets/img/folder.jpg`.
