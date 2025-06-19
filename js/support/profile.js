import { appState } from '../appState.js';
import { formatDate } from '../../utils/helpers.js';
import { peregrinos } from '../mock/peregrinos.js';

// Elementos DOM
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const registerDate = document.getElementById('register-date');
const lastLogin = document.getElementById('last-login');
const levelName = document.getElementById('current-level');
const levelBadge = document.querySelector('.level-badge');
const progressBar = document.getElementById('progress-bar');
const userPoints = document.getElementById('user-points');
const commentContainer = document.querySelector('.comment-list');

const editBtn = document.getElementById('edit-profile-btn');
const editModal = document.getElementById('edit-modal');
const closeModal = document.querySelector('.close-modal');
const logoutBtn = document.getElementById('logout-btn');
const avatarUpload = document.getElementById('avatar-upload');
const changeAvatarBtn = document.getElementById('change-avatar-btn');

function getLevelName(nivel) {
  const levels = {
    1: 'Iniciante',
    2: 'Caminheiro',
    3: 'Peregrino',
    4: 'Mestre do Caminho',
    5: 'Lenda Viva'
  };
  return levels[nivel] || `Nível ${nivel}`;
}

function loadUserData() {
  const current = JSON.parse(localStorage.getItem('utilizador_atual'));
  const todos = [...peregrinos, ...(JSON.parse(localStorage.getItem('peregrinos')) || [])];

  const user = todos.find(u => u.email === current?.email);

  if (!user) {
    alert('Utilizador não encontrado.');
    window.location.href = '../login.html';
    return;
  }

  // Atualiza dados no appState
  appState.setUser(user);

  // Dados básicos
  userAvatar.src = user.avatarUrl || 'img/avatar-default.png';
  userName.textContent = user.nome;
  userEmail.textContent = user.email;
  registerDate.innerHTML = `<i class="far fa-calendar-alt"></i> Registado desde ${formatDate(user.dataRegisto)}`;
  lastLogin.innerHTML = `<i class="far fa-clock"></i> Último login: ${formatDate(user.ultimoLogin)}`;

  // Gamificação
  levelName.textContent = getLevelName(user.nivel || 1);
  levelBadge.textContent = user.nivel || 1;
  const pontos = user.pontos || 0;
  const total = 100 * (user.nivel || 1);
  progressBar.style.width = `${Math.min(100, (pontos / total) * 100)}%`;
  userPoints.textContent = pontos;

  // Comentários
  if (user.comentarios?.length > 0) {
    commentContainer.innerHTML = user.comentarios.map(c => `
      <div class="comment-item">
        <p class="comment-text">"${c.texto}"</p>
        <div class="comment-meta">
          <span class="comment-date">${formatDate(c.data)}</span>
        </div>
      </div>
    `).join('');
  } else {
    commentContainer.innerHTML = '<p class="no-comments">Ainda não fez comentários.</p>';
  }
}

// Editar perfil
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

  // Atualiza localStorage
  let lista = JSON.parse(localStorage.getItem('peregrinos')) || [];
  const idx = lista.findIndex(u => u.id === user.id);
  if (idx !== -1) lista[idx] = user;
  else lista.push(user); // fallback para novos

  localStorage.setItem('peregrinos', JSON.stringify(lista));
  localStorage.setItem('utilizador_atual', JSON.stringify(user));

  appState.setUser(user);
  loadUserData();
  editModal.style.display = 'none';
  alert('Perfil atualizado!');
});

// Upload de avatar
changeAvatarBtn.addEventListener('click', () => avatarUpload.click());
avatarUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      userAvatar.src = event.target.result;
      const user = appState.getData('currentUser');
      user.avatarUrl = event.target.result;
      appState.setUser(user);
      localStorage.setItem('utilizador_atual', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('utilizador_atual');
  appState.clearUser?.();
  window.location.href = '../login.html';
});

document.addEventListener('DOMContentLoaded', loadUserData);
