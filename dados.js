/*
 * dados.js — conteúdo do Guia de Descarte EcoTech
 *
 * Este é o ÚNICO arquivo que precisa ser editado para mudar o conteúdo.
 * O restante do site (app.js) lê estes dados e monta as seções sozinho.
 *
 * Origem das informações: Registro da Pesquisa do grupo EcoTech
 * (consulta ao site de coleta da Prefeitura em 14/10/2026) e páginas
 * oficiais da Prefeitura de São Paulo consultadas em 15/10/2026
 * (lista completa em "fontes", no fim do arquivo).
 *
 * Se uma lista ficar vazia, o site mostra um quadro "Conteúdo pendente".
 *
 * Dias da semana: 0 = domingo, 1 = segunda, ..., 6 = sábado.
 * Horas no formato "HH:MM" (24 h).
 */

window.DADOS = {
  verificadoEm: "15/10/2026",

  local: {
    nome: "Praça Fortunato da Silveira",
    bairro: "Vila Jacuí",
    cidade: "São Paulo/SP",
    cep: "08060-110",
    referencia: "em frente à Universidade Cruzeiro do Sul, Campus São Miguel"
  },

  coleta: {
    concessionaria: "Ecourbis",
    subprefeitura: "São Miguel Paulista",
    consultaUrl: "https://coleta.prefeitura.sp.gov.br/",
    domiciliar: {
      periodo: "noturno",
      horarios: [
        { dia: 1, hora: "03:55" },
        { dia: 3, hora: "23:05" },
        { dia: 5, hora: "23:45" }
      ]
    },
    seletiva: {
      periodo: "diurno",
      horarios: [
        { dia: 5, hora: "08:50" }
      ]
    }
  },

  ecopontos: {
    totalNaCidade: 129,
    horario: {
      segundaASabado: { abre: "06:00", fecha: "22:00" },
      domingoEFeriados: { abre: "06:00", fecha: "18:00" }
    },
    limite: "Até 1 m³ por descarga (cerca de 20 sacos).",
    proximos: [
      { nome: "Ecoponto Imperador", endereco: "Av. Ribeirão Jacu, 201" },
      { nome: "Ecoponto Pedro Nunes", endereco: "Rua da Polka, 100" }
    ],
    materiaisAceitos: [
      "Recicláveis: papelão, plástico, vidro e metais",
      "Entulho de pequenas reformas",
      "Móveis velhos e colchões",
      "Podas de árvores domiciliares",
      "Gesso (apenas em algumas unidades)"
    ],
    naoAceitos: [
      "Lixo doméstico com restos de comida (vai para a coleta comum)",
      "Eletrodomésticos",
      "Telhas de amianto"
    ]
  },

  sp156: {
    telefone: "156",
    telefoneDetalhe: "Atendimento 24 horas. De fora da cidade, ligue 0800-011-0156 (apenas telefone fixo da Grande São Paulo).",
    portalUrl: "https://sp156.prefeitura.sp.gov.br/portal",
    app: "Aplicativo SP156, para Android e iOS (procure \"SP156\" na loja do seu celular).",
    servicos: [
      "Sugerir um local para instalar uma nova papeleira (lixeira de rua)",
      "Avisar sobre papeleira danificada",
      "Denunciar descarte irregular de lixo ou entulho",
      "Acompanhar o andamento dos seus pedidos"
    ],
    passoAPasso: [
      "Acesse o portal SP156 ou abra o aplicativo SP156.",
      "Em \"Serviços\", procure o tema e escolha o serviço desejado (papeleira ou descarte irregular).",
      "Leia o guia do serviço, que mostra como pedir e o prazo, e clique em \"Solicitar\".",
      "Entre com seu cadastro ou, quando o serviço permitir, faça o pedido sem se identificar.",
      "Informe o endereço completo e um ponto de referência e, se possível, anexe fotos.",
      "Acompanhe o andamento na aba \"Minhas Solicitações\"."
    ],
    enderecoParaPedido: "Praça Fortunato da Silveira, Vila Jacuí, São Paulo/SP, CEP 08060-110 — em frente à Universidade Cruzeiro do Sul, Campus São Miguel (Av. Dr. Ussiel Cirilo).",
    anonimo: "Denúncias de descarte irregular também podem ser feitas de forma anônima pelo telefone 156 ou pela Guarda Civil Metropolitana, no 153.",
    multa: "A multa por descarte irregular pode passar de R$ 25 mil."
  },

  reciclaveis: {
    itens: [
      "Garrafas PET e plásticos em geral",
      "Embalagens longa vida (caixinhas de leite e suco)",
      "Latas de aço e de alumínio",
      "Isopor",
      "Papéis secos e limpos",
      "Vidro"
    ],
    naoReciclaveis: [
      "Bitucas de cigarro",
      "Papéis e guardanapos molhados, engordurados ou sujos",
      "Restos de alimentos",
      "Fitas e etiquetas adesivas",
      "Cerâmicas e louças"
    ]
  },

  dicas: [
    {
      titulo: "Lixo no chão atrai mais lixo",
      texto: "Estudos mostram que um lugar que já está sujo recebe ainda mais lixo jogado no chão. Com a praça limpa, fica mais fácil todo mundo manter assim.",
      fonte: "Schultz et al., 2013"
    },
    {
      titulo: "Bituca de cigarro também é lixo",
      texto: "Em um estudo com cerca de 9 mil pessoas observadas, 65% das bitucas foram jogadas no chão. Bituca não é reciclável: apague e jogue na lixeira comum.",
      fonte: "Schultz et al., 2013; Prefeitura de São Paulo"
    },
    {
      titulo: "Sem lixeira por perto? Guarde até achar uma",
      texto: "Quanto mais longe a lixeira, mais gente joga lixo no chão. No caminho até o ponto de ônibus há poucas lixeiras: guarde o copo ou a embalagem até encontrar uma.",
      fonte: "Schultz et al., 2013; discussão em grupo EcoTech"
    },
    {
      titulo: "Separe os recicláveis",
      texto: "Recicláveis misturados ao lixo comum deixam de voltar para a cadeia produtiva. Em 2024, só 8,7% dos resíduos urbanos do Brasil foram para reciclagem.",
      fonte: "ABREMA, Panorama dos Resíduos Sólidos no Brasil 2025"
    },
    {
      titulo: "Papel sujo de gordura vai no lixo comum",
      texto: "Guardanapos e papéis de lanche engordurados ou molhados não são recicláveis e atrapalham a reciclagem do resto. Só papel seco e limpo vai para a coleta seletiva.",
      fonte: "Prefeitura de São Paulo, Coleta e Descartes"
    },
    {
      titulo: "Falta lixeira ou tem lixo acumulado? Avise pelo 156",
      texto: "Qualquer pessoa pode sugerir um local para nova papeleira ou denunciar descarte irregular pela Central SP156.",
      fonte: "Secretaria Municipal das Subprefeituras, 2026"
    }
  ],

  fontes: [
    "PREFEITURA DE SÃO PAULO. Coleta e Descartes. Disponível em: https://coleta.prefeitura.sp.gov.br/. Acesso em: 15 out. 2026.",
    "PREFEITURA DE SÃO PAULO. Conheça os Ecopontos da cidade de São Paulo. 2 maio 2024. Disponível em: https://prefeitura.sp.gov.br/w/conhe%C3%A7a-os-ecopontos-da-cidade-de-s%C3%A3o-paulo. Acesso em: 15 out. 2026.",
    "SUBPREFEITURA DE SÃO MIGUEL PAULISTA. Ecopontos da Vila Jacuí (publicação de 02/01/2026).",
    "SECRETARIA MUNICIPAL DAS SUBPREFEITURAS. São Paulo tem cerca de 150 mil papeleiras para reforçar a limpeza urbana. 2026. Disponível em: https://prefeitura.sp.gov.br/web/subprefeituras/w/s%C3%A3o-paulo-tem-cerca-150-mil-papeleiras-para-refor%C3%A7ar-a-limpeza-urbana. Acesso em: 15 out. 2026.",
    "SECRETARIA MUNICIPAL DAS SUBPREFEITURAS. Secretaria Executiva de Limpeza Urbana: canais de atendimento. Disponível em: https://prefeitura.sp.gov.br/web/subprefeituras/w/secretaria_executiva_de_limpeza_urbana/348048. Acesso em: 15 out. 2026.",
    "SUBPREFEITURA DE PINHEIROS. Portal SP 156: saiba como fazer solicitações e acompanhar o andamento. 29 out. 2024. Disponível em: https://prefeitura.sp.gov.br/web/pinheiros/w/portal-156. Acesso em: 15 out. 2026.",
    "PREFEITURA DE SÃO PAULO. Prefeitura intensifica fiscalização contra descarte irregular de lixo na cidade. 4 nov. 2024. Disponível em: https://prefeitura.sp.gov.br/w/prefeitura-intensifica-fiscaliza%C3%A7%C3%A3o-contra-descarte-irregular-de-lixo-na-cidade. Acesso em: 15 out. 2026.",
    "BRASIL. Lei nº 12.305, de 2 de agosto de 2010. Institui a Política Nacional de Resíduos Sólidos. Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm.",
    "SCHULTZ, P. W. et al. Littering in context: personal and environmental predictors of littering behavior. Environment and Behavior, v. 45, 2013.",
    "ABREMA. Panorama dos Resíduos Sólidos no Brasil 2025. São Paulo: ABREMA, 2025."
  ]
};

/*
 * Configuração das ferramentas externas (frente de Desenvolvimento).
 * Deixe vazio para desativar; a seção correspondente some do site.
 */
window.CONFIG = {
  // Código do site no GoatCounter (ex.: "guia-ecotech" para guia-ecotech.goatcounter.com).
  goatcounterCodigo: "",
  // Link do formulário anônimo de comentários (ex.: Google Forms sem coleta de e-mail).
  formularioUrl: ""
};
