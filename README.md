# Guia de Descarte — EcoTech

Página estática (HTML, CSS e JS puros, sem dependências) com horários de coleta, Ecopontos e orientações do SP156 para a Praça Fortunato da Silveira (Vila Jacuí, São Paulo/SP).

## Estrutura

```
index.html   estrutura da página
estilo.css   visual (mobile primeiro, tema claro e escuro automático)
dados.js     todo o conteúdo do guia — único arquivo que precisa ser editado
app.js       lê dados.js e monta as seções (próxima coleta, Ecoponto aberto agora etc.)
```

## Testar no computador

Abra `index.html` direto no navegador, ou rode um servidor local:

```
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Conteúdo

Todo o conteúdo está em `dados.js`, com as fontes oficiais listadas no fim do arquivo e no rodapé do site. Se alguma lista for esvaziada, o site mostra um quadro "Conteúdo pendente" no lugar.

## Contador de acessos e formulário (dados.js → `CONFIG`)

- `goatcounterCodigo`: crie uma conta gratuita em goatcounter.com e coloque o código do site.
- `formularioUrl`: link de um formulário anônimo (ex.: Google Forms sem coleta de e-mail). A seção "Deixe sua opinião" só aparece quando esse campo está preenchido.

## Publicar no GitHub Pages

1. Crie um repositório público (ex.: `guia-ecotech`) e envie estes arquivos para a raiz.
2. Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. O site fica em `https://<usuario>.github.io/guia-ecotech/`.
