import { authService } from '../../services/authService.js';
import { appState } from '../appState.js';
import { formatDate } from '../../utils/helpers.js';

// Elementos DOM
const userAvatar = document.getElementById('user-avatar');
const changeAvatarBtn = document.getElementById('change-avatar-btn');
const avatarUpload = document.getElementById('avatar-upload');
const editModal = document.getElementById('edit-modal');
const editBtn = document.getElementById('edit-profile-btn');
const closeModal = document.querySelector('.close-modal');
const logoutBtn = document.getElementById('logout-btn');

// Carrega dados do usuário


// Carrega comentários do usuário
function loadUserComments(user) {
    const commentContainer = document.querySelector('.comment-list');
    
    if (user.comentarios && user.comentarios.length > 0) {
        commentContainer.innerHTML = user.comentarios.map(comment => `
            <div class="comment-item">
                <p class="comment-text">"${comment.texto}"</p>
                <div class="comment-meta">
                    <span class="comment-route">${comment.caminho || 'Sem caminho'}</span>
                    <span class="comment-date">${formatDate(comment.data)}</span>
                </div>
            </div>
        `).join('');
    } else {
        commentContainer.innerHTML = '<p class="no-comments">Ainda não fez comentários.</p>';
    }
}

// Helper para nome do nível
function getLevelName(level) {
    const levels = {
        1: 'Iniciante',
        2: 'Caminheiro',
        3: 'Peregrino',
        4: 'Mestre do Caminho'
    };
    return levels[level] || `Nível ${level}`;
}

// Upload de Avatar
changeAvatarBtn.addEventListener('click', () => {
    avatarUpload.click();
});

avatarUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            userAvatar.src = event.target.result;
            // Atualiza no estado
            const user = appState.getData('currentUser');
            user.avatarUrl = event.target.result;
            appState.setUser(user);
        };
        reader.readAsDataURL(file);
    }
});

// Modal de Edição
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

// Salvar edição
document.getElementById('edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = appState.getData('currentUser');
    user.nome = document.getElementById('edit-name').value;
    user.email = document.getElementById('edit-email').value;
    
    const newPassword = document.getElementById('edit-password').value;
    if (newPassword) user.password = newPassword;
    
    appState.setUser(user);
    loadProfileData(); // Atualiza a exibição
    
    editModal.style.display = 'none';
    alert('Perfil atualizado com sucesso!');
});

// Logout
logoutBtn.addEventListener('click', () => {
    authService.logout();
});

// Inicialização
document.addEventListener('DOMContentLoaded', loadProfileData);