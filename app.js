/*
 * app.js — monta o Guia de Descarte a partir de window.DADOS (dados.js).
 * Não é preciso editar este arquivo para mudar o conteúdo.
 */
(function () {
  "use strict";

  var D = window.DADOS;
  var C = window.CONFIG || {};
  var FUSO = "America/Sao_Paulo";
  var DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  var DIAS_CURTOS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  var MIN_SEMANA = 7 * 24 * 60;

  /* ---------- Utilitários ---------- */

  // Cria um elemento com atributos e filhos (texto sempre via textContent).
  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "texto") n.textContent = attrs[k];
        else if (k === "classe") n.className = attrs[k];
        else n.setAttribute(k, attrs[k]);
      });
    }
    (filhos || []).forEach(function (f) {
      if (f == null) return;
      n.appendChild(typeof f === "string" ? document.createTextNode(f) : f);
    });
    return n;
  }

  function $(id) { return document.getElementById(id); }

  function pendente(oQue) {
    return el("div", { classe: "pendente" }, [
      el("strong", { texto: "Conteúdo pendente. " }),
      oQue + " Esta informação ainda está sendo verificada em fonte oficial pelo grupo EcoTech."
    ]);
  }

  // "23:05" -> 1385 (minutos desde a meia-noite)
  function paraMin(hhmm) {
    var p = hhmm.split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  // "23:05" -> "23h05"
  function formataHora(hhmm) { return hhmm.replace(":", "h"); }

  // Hora atual em São Paulo, independente do fuso do aparelho.
  function agoraSP() {
    var partes = new Intl.DateTimeFormat("en-US", {
      timeZone: FUSO, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var m = {};
    partes.forEach(function (p) { m[p.type] = p.value; });
    var dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(m.weekday);
    var hora = parseInt(m.hour, 10) % 24; // alguns navegadores devolvem "24"
    return { dia: dia, min: hora * 60 + parseInt(m.minute, 10) };
  }

  // Próxima ocorrência entre os horários semanais; devolve o horário e quantos minutos faltam.
  function proxima(horarios, agora) {
    var atual = agora.dia * 24 * 60 + agora.min;
    var melhor = null;
    horarios.forEach(function (h) {
      var alvo = h.dia * 24 * 60 + paraMin(h.hora);
      var falta = (alvo - atual + MIN_SEMANA) % MIN_SEMANA;
      if (melhor === null || falta < melhor.falta) melhor = { h: h, falta: falta };
    });
    return melhor;
  }

  function descreveFalta(min) {
    if (min === 0) return "agora";
    if (min < 60) return "em " + min + " min";
    var h = Math.floor(min / 60), d = Math.floor(h / 24);
    if (d >= 1) return "em " + d + (d === 1 ? " dia" : " dias") + " e " + (h % 24) + " h";
    return "em " + h + " h " + (min % 60) + " min";
  }

  function descreveDia(h, agora, falta) {
    if (h.dia === agora.dia && falta < 24 * 60) return "Hoje";
    if (h.dia === (agora.dia + 1) % 7 && falta < 48 * 60) return "Amanhã";
    if (h.dia === agora.dia) return "Próxima " + DIAS[h.dia];
    return DIAS[h.dia].charAt(0).toUpperCase() + DIAS[h.dia].slice(1);
  }

  /* ---------- Seções ---------- */

  function montaCapa(agora) {
    var L = D.local;
    $("capa-local").textContent = L.nome + " · " + L.bairro + ", " + L.cidade;

    var alvo = $("agora");
    alvo.textContent = "";
    [
      { tipo: "domiciliar", rotulo: "Próxima coleta comum", classe: "" },
      { tipo: "seletiva", rotulo: "Próxima coleta seletiva", classe: " painel--seletiva" }
    ].forEach(function (c) {
      var lista = D.coleta[c.tipo].horarios;
      if (!lista.length) return;
      var p = proxima(lista, agora);
      alvo.appendChild(el("div", { classe: "painel" + c.classe }, [
        el("p", { classe: "painel__rotulo", texto: c.rotulo }),
        el("p", { classe: "painel__quando", texto: descreveDia(p.h, agora, p.falta) + ", " + formataHora(p.h.hora) }),
        el("p", { classe: "painel__falta", texto: descreveFalta(p.falta) })
      ]));
    });
  }

  function montaColeta(agora) {
    var alvo = $("cartoes-coleta");
    alvo.textContent = "";
    [
      { tipo: "domiciliar", titulo: "Coleta comum (domiciliar)", classe: "" },
      { tipo: "seletiva", titulo: "Coleta seletiva (recicláveis)", classe: " cartao--seletiva" }
    ].forEach(function (c) {
      var info = D.coleta[c.tipo];
      var porDia = {};
      info.horarios.forEach(function (h) { porDia[h.dia] = h.hora; });

      var semana = el("ul", { classe: "semana", "aria-label": "Dias da semana" });
      for (var d = 0; d < 7; d++) {
        var tem = porDia[d] !== undefined;
        var item = el("li", {
          classe: (tem ? "tem" : "") + (d === agora.dia ? " hoje" : ""),
          "aria-label": DIAS[d] + (tem ? ": coleta às " + formataHora(porDia[d]) : ": sem coleta") + (d === agora.dia ? " (hoje)" : "")
        }, [DIAS_CURTOS[d]]);
        if (tem) item.appendChild(el("span", { classe: "hora", texto: formataHora(porDia[d]) }));
        semana.appendChild(item);
      }

      alvo.appendChild(el("article", { classe: "cartao" + c.classe }, [
        el("h3", { texto: c.titulo }),
        el("p", { classe: "cartao__meta", texto: "Período " + info.periodo + " · " + D.coleta.concessionaria }),
        semana
      ]));
    });

    var nota = $("nota-coleta");
    nota.textContent = "Para conferir outro endereço, consulte o ";
    nota.appendChild(el("a", { href: D.coleta.consultaUrl, target: "_blank", rel: "noopener", texto: "site de coleta da Prefeitura" }));
    nota.appendChild(document.createTextNode("."));

  }

  function ecopontoAberto(agora) {
    var hr = D.ecopontos.horario;
    var faixa = (agora.dia === 0) ? hr.domingoEFeriados : hr.segundaASabado;
    var aberto = agora.min >= paraMin(faixa.abre) && agora.min < paraMin(faixa.fecha);
    return { aberto: aberto, faixa: faixa };
  }

  function montaEcopontos(agora) {
    var E = D.ecopontos, hr = E.horario;
    $("intro-ecopontos").textContent =
      "São Paulo tem " + E.totalNaCidade + " Ecopontos. Eles funcionam de segunda a sábado, das " +
      formataHora(hr.segundaASabado.abre) + " às " + formataHora(hr.segundaASabado.fecha) +
      ", e aos domingos e feriados, das " + formataHora(hr.domingoEFeriados.abre) + " às " +
      formataHora(hr.domingoEFeriados.fecha) + ".";

    var st = ecopontoAberto(agora);
    var lista = $("lista-ecopontos");
    lista.textContent = "";
    E.proximos.forEach(function (p) {
      var mapa = "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(p.nome + ", " + p.endereco + ", " + D.local.bairro + ", São Paulo - SP");
      lista.appendChild(el("li", { classe: "ecoponto" }, [
        el("div", null, [
          el("h3", { texto: p.nome }),
          el("p", { texto: p.endereco }),
          el("span", {
            classe: "selo " + (st.aberto ? "selo--aberto" : "selo--fechado"),
            texto: st.aberto ? "Aberto agora · até " + formataHora(st.faixa.fecha) : "Fechado agora"
          })
        ]),
        el("a", { classe: "botao botao--contorno", href: mapa, target: "_blank", rel: "noopener", texto: "Ver no mapa" })
      ]));
    });

    var mat = $("materiais-ecopontos");
    mat.textContent = "";
    var nota = el("p", { classe: "nota", texto: "O status \"aberto agora\" não considera feriados: em feriados, o horário é o de domingo." });
    mat.appendChild(nota);
    if (E.materiaisAceitos.length) {
      mat.appendChild(el("h3", { texto: "O que levar ao Ecoponto" }));
      mat.appendChild(el("ul", null, E.materiaisAceitos.map(function (m) { return el("li", { texto: m }); })));
      if (E.limite) mat.appendChild(el("p", { classe: "nota", texto: E.limite + " A entrega é gratuita." }));
      if (E.naoAceitos && E.naoAceitos.length) {
        mat.appendChild(el("h3", { texto: "O Ecoponto não recebe" }));
        mat.appendChild(el("ul", null, E.naoAceitos.map(function (m) { return el("li", { texto: m }); })));
      }
    } else {
      mat.appendChild(pendente("Lista de materiais que os Ecopontos recebem."));
    }
  }

  function montaSP156() {
    var S = D.sp156;
    var alvo = $("bloco-sp156");
    alvo.textContent = "";

    alvo.appendChild(el("div", { classe: "sp156__ligue" }, [
      el("div", null, [
        el("p", { texto: "Central de Atendimento da Prefeitura" }),
        el("p", { classe: "numero", texto: S.telefone })
      ]),
      el("a", { classe: "botao", href: "tel:" + S.telefone, texto: "Ligar para o " + S.telefone })
    ]));
    if (S.telefoneDetalhe) alvo.appendChild(el("p", { classe: "nota", texto: S.telefoneDetalhe }));

    alvo.appendChild(el("div", null, [
      el("p", { texto: "Pelo SP156 você pode:" }),
      el("ul", null, S.servicos.map(function (s) { return el("li", { texto: s }); }))
    ]));

    var canais = [];
    if (S.portalUrl) canais.push(el("li", null, [
      "Pela internet, no ",
      el("a", { href: S.portalUrl, target: "_blank", rel: "noopener", texto: "portal SP156" }),
      ";"
    ]));
    if (S.app) canais.push(el("li", { texto: "Pelo " + S.app.charAt(0).toLowerCase() + S.app.slice(1) }));
    if (canais.length) {
      alvo.appendChild(el("div", null, [
        el("p", { texto: "Além do telefone, você pode fazer o pedido:" }),
        el("ul", null, canais)
      ]));
    }

    if (S.passoAPasso.length) {
      alvo.appendChild(el("h3", { texto: "Passo a passo pelo portal ou aplicativo" }));
      alvo.appendChild(el("ol", null, S.passoAPasso.map(function (p) { return el("li", { texto: p }); })));
    } else {
      alvo.appendChild(pendente("Passo a passo para fazer pedidos e denúncias pelo SP156."));
    }

    if (S.enderecoParaPedido) {
      var botao = el("button", { classe: "botao botao--contorno", type: "button", texto: "Copiar endereço" });
      botao.addEventListener("click", function () {
        var ok = function () { botao.textContent = "Endereço copiado!"; setTimeout(function () { botao.textContent = "Copiar endereço"; }, 2500); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(S.enderecoParaPedido).then(ok, function () {});
        }
      });
      alvo.appendChild(el("div", { classe: "endereco" }, [
        el("p", { classe: "endereco__rotulo", texto: "Endereço da praça para usar no pedido" }),
        el("p", { classe: "endereco__texto", texto: S.enderecoParaPedido }),
        botao
      ]));
    }

    if (S.anonimo) alvo.appendChild(el("p", { texto: S.anonimo }));
    alvo.appendChild(el("p", { classe: "multa", texto: S.multa }));
  }

  function montaReciclaveis() {
    var R = D.reciclaveis;
    var alvo = $("bloco-reciclaveis");
    alvo.textContent = "";
    if (!R.itens.length && !R.naoReciclaveis.length) {
      alvo.appendChild(pendente("Lista do que pode e do que não pode ir para a coleta seletiva."));
      return;
    }
    var sel = D.coleta.seletiva.horarios;
    if (sel.length) {
      var quando = sel.map(function (h) { return DIAS[h.dia] + ", às " + formataHora(h.hora); }).join("; e toda ");
      alvo.appendChild(el("p", { classe: "secao__intro", texto: "Na praça, a coleta seletiva passa toda " + quando +
        ". Também é possível levar os recicláveis a um Ecoponto." }));
    }
    if (R.itens.length) {
      alvo.appendChild(el("h3", { texto: "Pode ir para a coleta seletiva" }));
      alvo.appendChild(el("ul", null, R.itens.map(function (i) { return el("li", { texto: i }); })));
    }
    if (R.naoReciclaveis.length) {
      alvo.appendChild(el("h3", { texto: "Não vai para a coleta seletiva" }));
      alvo.appendChild(el("ul", null, R.naoReciclaveis.map(function (i) { return el("li", { texto: i }); })));
    }
  }

  function montaDicas() {
    var alvo = $("lista-dicas");
    alvo.textContent = "";
    D.dicas.forEach(function (d) {
      alvo.appendChild(el("li", null, [
        el("h3", { texto: d.titulo }),
        el("p", { texto: d.texto }),
        el("p", { classe: "fonte", texto: "Fonte: " + d.fonte })
      ]));
    });
  }

  function montaRodape() {
    $("rodape-verificado").textContent = "Informações verificadas em " + D.verificadoEm + ".";
    var lista = $("lista-fontes");
    lista.textContent = "";
    D.fontes.forEach(function (f) { lista.appendChild(el("li", { texto: f })); });
  }

  function montaExtras() {
    if (C.formularioUrl) {
      $("comentarios").hidden = false;
      $("link-formulario").href = C.formularioUrl;
    }
    if (C.goatcounterCodigo) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.setAttribute("data-goatcounter", "https://" + C.goatcounterCodigo + ".goatcounter.com/count");
      document.body.appendChild(s);
    }
  }

  /* ---------- Início ---------- */

  function atualizaTempo() {
    var agora = agoraSP();
    montaCapa(agora);
    montaColeta(agora);
    montaEcopontos(agora);
  }

  atualizaTempo();
  montaSP156();
  montaReciclaveis();
  montaDicas();
  montaRodape();
  montaExtras();

  // Atualiza contagens e status "aberto agora" a cada minuto.
  setInterval(atualizaTempo, 60 * 1000);
})();
