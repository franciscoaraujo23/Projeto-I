document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = (
  document.getElementById("first-name").value.trim() +
  " " +
  document.getElementById("last-name").value.trim()
);
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!nome || !email || !password) {
    alert("Por favor, preenche todos os campos.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("peregrinos")) || [];

  const existente = users.find(u => u.email === email);
  if (existente) {
    alert("Já existe um utilizador com este email.");
    return;
  }

  users.push({ nome, email, password });
  localStorage.setItem("peregrinos", JSON.stringify(users));

  alert("Registo concluído com sucesso!");
  window.location.href = "login.html";
});
