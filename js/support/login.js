document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Preenche todos os campos.");
      return;
    }

    const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
    const user = utilizadores[email];

    if (!user || user.password !== password) {
      alert("❌ Credenciais inválidas!");
      return;
    }

    localStorage.setItem("utilizador_atual", JSON.stringify(user));

    alert("✅ Login efetuado com sucesso!");
    window.location.href = "../profile.html";
  });
});
