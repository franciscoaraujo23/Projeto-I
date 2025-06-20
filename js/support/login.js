document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("⚠️ Por favor, preencha todos os campos.");
    return;
  }

  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
  const user = utilizadores[email];

  if (!user || user.password !== password) {
    alert("❌ Credenciais inválidas!");
    return;
  }

  // ✅ Garante que o campo email está presente no objeto user
  user.email = email;

  // ✅ Atualizar último login
  user.ultimoLogin = new Date().toISOString();

  // ✅ Guardar como utilizador atual
  localStorage.setItem("utilizador_atual", JSON.stringify(user));

  // ✅ Redirecionar
  window.location.href = "profile.html";
});
