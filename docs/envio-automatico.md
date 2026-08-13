# Envio automático de e-mail — Google Apps Script

Isso conecta os formulários do site (`data/formularios.js`) a um e-mail
automático, sem precisar de servidor. É grátis. **Já está em produção** — a
URL implantada está em `SITE.formWebhook`, em `data/site.js`.

Todo formulário do site (orçamento e currículo) envia sozinho ao tocar em
"Enviar" — nada de abrir WhatsApp/e-mail manualmente. O currículo em PDF
também vai anexado automaticamente.

## O script (versão atual, escrita pelo Leonardo)

```js
/**
 * Xeque-mate — recebe os formulários do site e manda por e-mail.
 */

/* Para onde vão os formulários. */
const DESTINO = 'xmdesenvolve@gmail.com';

/* Nome da pasta no Drive onde os currículos ficam guardados.
   Deixe '' para não salvar no Drive (o anexo vai no e-mail de todo jeito). */
const PASTA_CURRICULOS = 'Currículos — site Xeque-mate';

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    const linhas = (dados.campos || [])
      .map(c => c.label + ': ' + c.valor)
      .join('\n');

    let corpo = dados.titulo + ' — ' + dados.servico + '\n\n' + linhas;
    const anexos = [];

    if (dados.arquivo && dados.arquivo.base64) {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(dados.arquivo.base64),
        dados.arquivo.tipo,
        dados.arquivo.nome
      );
      anexos.push(blob);

      if (PASTA_CURRICULOS) {
        const pasta = pegarPasta_(PASTA_CURRICULOS);
        const salvo = pasta.createFile(blob);
        corpo += '\n\nCurrículo no Drive: ' + salvo.getUrl();
      }
    }

    corpo += '\n\n— enviado pelo site da Xeque-mate em ' +
      Utilities.formatDate(new Date(), 'America/Fortaleza', 'dd/MM/yyyy HH:mm');

    MailApp.sendEmail({
      to: DESTINO,
      subject: '[Site] ' + dados.titulo + ' — ' + dados.servico,
      body: corpo,
      attachments: anexos,
      replyTo: emailDeQuemEnviou_(dados.campos),
    });

    return resposta_({ ok: true });

  } catch (err) {
    console.error(err);
    return resposta_({ ok: false, erro: String(err) });
  }
}

/* Responder o e-mail já vai direto para a pessoa que preencheu */
function emailDeQuemEnviou_(campos) {
  const c = (campos || []).find(x => /e-?mail/i.test(x.label));
  return c ? c.valor : DESTINO;
}

function pegarPasta_(nome) {
  const achadas = DriveApp.getFoldersByName(nome);
  return achadas.hasNext() ? achadas.next() : DriveApp.createFolder(nome);
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## O que o site manda pro script

```json
{
  "titulo": "Enviar currículo",
  "servico": "Recrutamento & Seleção",
  "campos": [
    { "label": "Seu nome", "valor": "..." },
    { "label": "WhatsApp", "valor": "..." },
    { "label": "Área ou vaga de interesse", "valor": "..." }
  ],
  "arquivo": { "nome": "curriculo.pdf", "tipo": "application/pdf", "base64": "..." }
}
```

`arquivo` só vai quando o formulário tem campo de upload (hoje, só o de
currículo). Os formulários de orçamento não têm anexo.

## Já em produção

`DESTINO` já está com `xmdesenvolve@gmail.com` — os e-mails vão direto pra
lá.

⚠️ Lembrete de sempre que o código do script mudar: só salvar no editor
**não** atualiza a URL `/exec` que o site usa. Precisa reimplantar:

1. **Implantar → Gerenciar implantações**.
2. No ícone de lápis (editar) da implantação existente.
3. Em **Versão**, escolha **Nova versão** → **Implantar**.

Isso atualiza o código **sem trocar a URL** — como a URL já está em
`data/site.js`, não precisa mexer em mais nada no site depois disso.

## Sobre o "no-cors"

O site dispara o envio com `mode: 'no-cors'`, uma limitação do jeito que o
Apps Script responde a partir de outro domínio: dá pra mandar, mas o
navegador não deixa o site ler a resposta (nem saber se deu erro). Por isso
o site sempre mostra "Enviado!" depois de disparar — é o padrão recomendado
pra esse tipo de integração grátis. Se algo falhar do lado do Google (cota
excedida, script com erro etc.), o jeito de descobrir é no **Registro de
execução** do próprio editor do Apps Script, não pelo site.
