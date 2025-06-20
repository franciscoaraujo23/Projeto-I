import { calcularPontuacao, calcularNivel } from "../../models/gamificationModel.js";
import { appState } from "../../appState.js";

// 🔒 Autenticação obrigatória
const utilizadorAtual = JSON.parse(localStorage.getItem("utilizador_atual"));
if (!utilizadorAtual) {
  alert("Precisas de estar autenticado para aceder ao quiz.");
  window.location.href = "login.html";
}

const quizzes = [
  [
    {
      texto: "Qual é o destino final tradicional do Caminho de Santiago?",
      opcoes: ["Lisboa", "Fátima", "Santiago de Compostela", "Braga"],
      correta: 2
    },
    {
      texto: "Qual destes é um dos Caminhos Portugueses mais conhecidos?",
      opcoes: ["Caminho Central", "Caminho Nórdico", "Caminho de Roma", "Caminho Interior de França"],
      correta: 0
    },
    {
      texto: "Que símbolo é frequentemente associado ao Caminho?",
      opcoes: ["Cruz Vermelha", "Cálice", "Concha", "Estrela"],
      correta: 2
    },
    {
      texto: "Quantos quilómetros tem aproximadamente o Caminho Português desde o Porto?",
      opcoes: ["120 km", "240 km", "500 km", "1000 km"],
      correta: 1
    },
    {
      texto: "Qual a cor da seta mais comum nas sinalizações do Caminho?",
      opcoes: ["Vermelha", "Amarela", "Verde", "Azul"],
      correta: 1
    }
  ],
  [
    {
      texto: "Qual é o significado espiritual do Caminho de Santiago?",
      opcoes: ["Comércio", "Turismo", "Peregrinação", "Guerra"],
      correta: 2
    },
    {
      texto: "Que documento o peregrino recebe ao completar o Caminho?",
      opcoes: ["Diploma", "Certificado de Participação", "Compostela", "Passaporte"],
      correta: 2
    },
    {
      texto: "Qual destas cidades NÃO é ponto de partida habitual?",
      opcoes: ["Porto", "Tui", "Paris", "Valença"],
      correta: 2
    },
    {
      texto: "O Caminho é sinalizado principalmente com...",
      opcoes: ["Setas azuis", "Setas amarelas", "Postes de madeira", "Pegadas"],
      correta: 1
    },
    {
      texto: "Que apóstolo está associado ao Caminho?",
      opcoes: ["São João", "Santo António", "São Tiago", "São Pedro"],
      correta: 2
    }
  ],
  [
    {
      texto: "Qual destes objetos é tradicional carregar no Caminho?",
      opcoes: ["Medalha", "Cajado", "Espada", "Amuleto"],
      correta: 1
    },
    {
      texto: "Qual é uma motivação comum dos peregrinos?",
      opcoes: ["Férias de luxo", "Compras", "Espiritualidade e superação", "Concerto musical"],
      correta: 2
    },
    {
      texto: "Onde os peregrinos costumam carimbar o seu passaporte?",
      opcoes: ["Nas igrejas e albergues", "Nos cafés", "Nos aeroportos", "Nas escolas"],
      correta: 0
    },
    {
      texto: "Qual destes caminhos passa por Santiago?",
      opcoes: ["Caminho de Fátima", "Caminho de Roma", "Caminho de Santiago", "Caminho do Mar"],
      correta: 2
    },
    {
      texto: "Que nome se dá ao guia do Caminho?",
      opcoes: ["Condutor", "Orientador", "Hospitalero", "Capitão"],
      correta: 2
    }
  ],
  [
    {
      texto: "Qual é o idioma principal em Santiago de Compostela?",
      opcoes: ["Português", "Espanhol", "Galego", "Francês"],
      correta: 2
    },
    {
      texto: "Os peregrinos geralmente caminham quantos km por dia?",
      opcoes: ["5-10 km", "10-20 km", "20-30 km", "50+ km"],
      correta: 2
    },
    {
      texto: "Qual é um item essencial para peregrinar?",
      opcoes: ["Relógio de ouro", "Mapa", "Bússola", "Bengala ou cajado"],
      correta: 3
    },
    {
      texto: "Que tipo de alojamento é comum no Caminho?",
      opcoes: ["Hotel 5 estrelas", "Albergue", "Palácio", "Tenda"],
      correta: 1
    },
    {
      texto: "O Caminho de Santiago termina na catedral de...",
      opcoes: ["Madrid", "Barcelona", "Santiago", "Sevilha"],
      correta: 2
    }
  ],
  [
    {
      texto: "O Caminho também é conhecido como...",
      opcoes: ["Via Crucis", "Estrada Real", "Via Láctea", "Caminho de Ferro"],
      correta: 2
    },
    {
      texto: "Qual destes não é um Caminho oficial?",
      opcoes: ["Caminho Inglês", "Caminho Francês", "Caminho de Santiago", "Caminho Escocês"],
      correta: 3
    },
    {
      texto: "O passaporte do peregrino serve para...",
      opcoes: ["Viajar de avião", "Comprovar etapas", "Pagar menos", "Evitar multas"],
      correta: 1
    },
    {
      texto: "Qual destes países faz parte do Caminho?",
      opcoes: ["Portugal", "Alemanha", "Itália", "Suécia"],
      correta: 0
    },
    {
      texto: "Quantos dias dura em média o Caminho desde o Porto?",
      opcoes: ["3 dias", "6 dias", "10 dias", "15 dias"],
      correta: 2
    }
  ]
];

// Estado
let quiz = [];
let perguntaAtual = 0;
let pontuacaoBase = 0;

const perguntaEl = document.getElementById("quiz-question");
const opcoesEl = document.getElementById("quiz-options");
const btnProxima = document.getElementById("next-question");
const feedbackEl = document.getElementById("quiz-feedback");
const progressoEl = document.getElementById("quiz-progress");

// Criar botão "Novo Quiz"
const btnNovoQuiz = document.createElement("button");
btnNovoQuiz.textContent = "Novo Quiz";
btnNovoQuiz.classList.add("btn-primary");
btnNovoQuiz.style.display = "none";
btnNovoQuiz.addEventListener("click", iniciarNovoQuiz);
document.querySelector(".quiz-box").appendChild(btnNovoQuiz);

function iniciarNovoQuiz() {
  progressoEl.style.display = "block";
  quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
  perguntaAtual = 0;
  pontuacaoBase = 0;
  btnNovoQuiz.style.display = "none";
  btnProxima.style.display = "inline-block";
  carregarPergunta();
}

function carregarPergunta() {
  progressoEl.style.display = "block";
  const p = quiz[perguntaAtual];
  perguntaEl.textContent = p.texto;
  opcoesEl.innerHTML = "";

  p.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add("btn-secondary");
    btn.addEventListener("click", () => verificarResposta(i));
    opcoesEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  btnProxima.disabled = true;
  btnProxima.textContent = perguntaAtual === quiz.length - 1 ? "Terminar Quiz" : "Próxima";
  progressoEl.textContent = `Pergunta ${perguntaAtual + 1} de ${quiz.length}`;

}

function verificarResposta(iSelecionado) {
  const correta = quiz[perguntaAtual].correta;

  if (iSelecionado === correta) {
    feedbackEl.textContent = "✅ Resposta correta!";
    pontuacaoBase++;
  } else {
    feedbackEl.textContent = `❌ Errado. Resposta certa: ${quiz[perguntaAtual].opcoes[correta]}`;
  }

  opcoesEl.querySelectorAll("button").forEach(btn => (btn.disabled = true));
  btnProxima.disabled = false;
}

btnProxima.addEventListener("click", () => {
  if (perguntaAtual < quiz.length - 1) {
    perguntaAtual++;
    carregarPergunta();
  } else {
    terminarQuiz();
  }
});

function terminarQuiz() {
  const pontos = calcularPontuacao(pontuacaoBase);
  const raw = localStorage.getItem("utilizador_atual");
  const user = raw ? JSON.parse(raw) : null;
  progressoEl.style.display = "none";


  let pontosAntes = 0;
  let pontosDepois = pontos;

  if (user) {
    pontosAntes = user.pontos || 0;
    pontosDepois = pontosAntes + pontos;

    user.pontos = pontosDepois;
    user.nivel = calcularNivel(user.pontos);
    appState.setUser(user);
    localStorage.setItem("utilizador_atual", JSON.stringify(user));
  }

  feedbackEl.innerHTML = `
    🎉 Quiz concluído!<br>
    Ganhaste <strong>${pontos} pontos</strong>.<br>
    Total atual: <strong>${pontosDepois} pontos</strong>.
  `;

  perguntaEl.textContent = "Fim do Quiz!";
  opcoesEl.innerHTML = "";
  btnProxima.style.display = "none";
  btnNovoQuiz.style.display = "inline-block";
}



document.addEventListener("DOMContentLoaded", iniciarNovoQuiz);
