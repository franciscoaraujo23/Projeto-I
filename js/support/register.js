document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!nome || !email || !password) {
    alert("Por favor, preenche todos os campos.");
    return;
  }

  const userData = {
    nome,
    email,
    password,
    avatarUrl: "img/avatar-default.png",
    pontos: 0,
    nivel: 1,
    caminhosPercorridos: [],
    conquistas: ["Novo Peregrino"],
    comentarios: [],
    dataRegisto: new Date().toISOString(),
    ultimoLogin: null
  };

  // ✅ Verifica duplicação com base no localStorage
  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
  if (utilizadores[userData.email]) {
    alert("❌ Email já registado! Faz login ou usa outro.");
    return;
  }

  // Adiciona o novo utilizador ao localStorage
  utilizadores[userData.email] = userData;
  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));

  // Define como utilizador atual
  localStorage.setItem("utilizador_atual", JSON.stringify(userData));

  alert("✅ Registo concluído com sucesso!");
  window.location.href = "../profile.html";
});
