console.log("Carregou profile.js!");
console.log("Utilizador atual:", localStorage.getItem("utilizador_atual"));
import { appState } from '../appState.js';
import { renderUserData } from '../views/user/profileView.js';

// Elementos DOM
const editBtn = document.getElementById('edit-profile-btn');
const editModal = document.getElementById('edit-modal');
const closeModal = document.querySelector('.close-modal');
const logoutBtn = document.getElementById('logout-btn');
const avatarUpload = document.getElementById('avatar-upload');
const changeAvatarBtn = document.getElementById('change-avatar-btn');
const userAvatar = document.getElementById('user-avatar');

// 🔄 Carregar dados do utilizador atual
function loadUserData() {
  const user = JSON.parse(localStorage.getItem('utilizador_atual'));
  if (!user) {
    alert("Utilizador não encontrado.");
    window.location.href = "login.html";
    return;
  }

  appState.setUser(user);
  renderUserData(user);
}

// ✏️ Editar perfil
editBtn.addEventListener('click', () => {
  const user = appState.getData('currentUser');
  document.getElementById('edit-name').value = user.nome;
  document.getElementById('edit-email').value = user.email;
  editModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  editModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === editModal) {
    editModal.style.display = 'none';
  }
});

document.getElementById('edit-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = appState.getData('currentUser');
  user.nome = document.getElementById('edit-name').value;
  user.email = document.getElementById('edit-email').value;
  const newPass = document.getElementById('edit-password').value;
  if (newPass) user.password = newPass;

  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
  utilizadores[user.email] = user;

  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));
  localStorage.setItem("utilizador_atual", JSON.stringify(user));

  appState.setUser(user);
  renderUserData(user);
  editModal.style.display = 'none';
  alert('Perfil atualizado!');
});

// 🖼️ Upload de avatar
changeAvatarBtn.addEventListener('click', () => avatarUpload.click());

avatarUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      userAvatar.src = event.target.result;
      const user = appState.getData('currentUser');
      user.avatarUrl = event.target.result;

      const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
      utilizadores[user.email] = user;

      localStorage.setItem("utilizadores", JSON.stringify(utilizadores));
      localStorage.setItem("utilizador_atual", JSON.stringify(user));
      appState.setUser(user);
    };
    reader.readAsDataURL(file);
  }
});

// 🚪 Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('utilizador_atual');
  appState.clearUser?.();
  window.location.href = "login.html";
});

// ▶️ Inicializar
document.addEventListener('DOMContentLoaded', loadUserData);
