import { getLeaderboard, getRecentComments } from '../../models/commModel.js';
import { formatDate } from '../../../utils/helpers.js';

// =================== LEADERBOARD ===================

function renderLeaderboard() {
  const container = document.querySelector('.leaderboard-table');

  const header = document.createElement('div');
  header.classList.add('leaderboard-header');
  header.innerHTML = `
    <span><i class="fa-solid fa-user"></i> Utilizador</span>
    <span>Nível</span>
    <span>Pontos</span>
    <span>Conquistas</span>
    <span>Comentários</span>
  `;

  container.innerHTML = '';
  container.appendChild(header);

  const users = getLeaderboard();

  users.forEach(user => {
    const row = document.createElement('div');
    row.classList.add('leaderboard-row');
    row.innerHTML = `
      <span class="user">
        <img src="${user.avatarUrl || 'img/avatar-default.png'}" alt="${user.nome}" class="avatar-mini">
        ${user.nome}
      </span>
      <span>${user.nivel}</span>
      <span>${user.pontos}</span>
      <span>${user.conquistas.length}</span>
      <span>${(user.comentarios || []).length}</span>
    `;
    container.appendChild(row);
  });
}

// =================== COMENTÁRIOS ===================

function renderRecentComments() {
  const container = document.querySelector('.comments .comment-list');
  if (!container) return;

  const comments = getRecentComments();
  container.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-header">
        <img src="${c.avatar}" class="avatar-mini" alt="${c.utilizador}">
        <strong>${c.utilizador}</strong>
        <span class="comment-date">${formatDate(c.data)}</span>
      </div>
      <p class="comment-text">"${c.texto}"</p>
    </div>
  `).join('');
}

// =================== INICIALIZAÇÃO ===================

document.addEventListener('DOMContentLoaded', () => {
  renderLeaderboard();
  renderRecentComments();
});
