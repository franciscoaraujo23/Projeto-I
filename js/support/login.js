import { peregrinos } from "../mock/peregrinos.js";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor, preenche todos os campos.");
    return;
  }

  const locais = JSON.parse(localStorage.getItem("peregrinos")) || [];
  const todos = [...peregrinos, ...locais];

  const user = todos.find(u => u.email === email && u.password === password);

  if (user) {
    alert("Login efetuado com sucesso!");
    localStorage.setItem("utilizador_atual", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert("Credenciais inválidas.");
  }
});
