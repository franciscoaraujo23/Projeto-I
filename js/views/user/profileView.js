import { formatDate } from '../../../utils/helpers.js';

export function getLevelName(nivel) {
  const levels = {
    1: 'Iniciante',
    2: 'Caminheiro',
    3: 'Peregrino',
    4: 'Mestre do Caminho',
    5: 'Lenda Viva'
  };
  return levels[nivel] || `Nível ${nivel}`;
}

export function renderUserData(user) {
  // Elementos DOM
  document.getElementById('user-avatar').src = user.avatarUrl || 'img/avatar-default.png';
  document.getElementById('user-name').textContent = user.nome;
  document.getElementById('user-email').textContent = user.email;
  document.getElementById('register-date').innerHTML = `<i class="far fa-calendar-alt"></i> Registado desde ${formatDate(user.dataRegisto)}`;
  document.getElementById('last-login').innerHTML = `<i class="far fa-clock"></i> Último login: ${formatDate(user.ultimoLogin)}`;

  const nivel = user.nivel || 1;
  const pontos = user.pontos || 0;
  const total = 100 * nivel;
  const percentagem = Math.min(100, (pontos / total) * 100);

  document.getElementById('current-level').textContent = getLevelName(nivel);
  document.querySelector('.level-badge').textContent = nivel;
  document.getElementById('progress-bar').style.width = `${percentagem}%`;
  document.getElementById('user-points').textContent = pontos;

  const commentContainer = document.querySelector('.comment-list');
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
