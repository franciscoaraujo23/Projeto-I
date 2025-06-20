import { appState } from './appState.js';
import { authService } from '../services/authService.js';
import { mockService } from '../services/mockService.js';
import { MockService as ApiService } from '../services/apiService.js';
import { setupNavigation } from '../utils/helpers.js';
import { renderNavbarUser } from './views/user/userViews.js';

const INITIAL_LOAD_ELEMENTS = ['routes', 'lodgings', 'comments', 'users'];

// Função para associar comentários aos utilizadores (adiciona aqui!)
function associarComentariosAUtilizadores() {
  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || {};
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  comentarios.forEach(comentario => {
    // Adapta para o campo correto de email no objeto de comentário!
    const userEmail = comentario.email || comentario.userEmail;
    if (!userEmail) return;

    if (utilizadores[userEmail]) {
      if (!utilizadores[userEmail].comentarios) {
        utilizadores[userEmail].comentarios = [];
      }
      // Evita duplicados
      const jaTem = utilizadores[userEmail].comentarios.some(
        c => c.id === comentario.id
      );
      if (!jaTem) {
        utilizadores[userEmail].comentarios.push(comentario);
      }
    }
  });

  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));
  console.log("✅ Comentários associados aos utilizadores no LocalStorage!");
}

class AppInitializer {
  constructor() {
    this.appState = appState;
    this.mockService = mockService;
    this.authService = authService;
    this.apiService = new ApiService();
  }

  async initialize() {
    try {
      await this.loadInitialData();

      this.mockService.inicializarUtilizadoresMock();
      associarComentariosAUtilizadores(); // <--- CHAMA AQUI!

      this.setupAuth();
      setupNavigation();

      this.initializeViews();
      this.setupInitialRatings();

      // Garante que a navbar é atualizada só depois de tudo estar pronto
      setTimeout(() => {
        renderNavbarUser();
      }, 0);

      console.log('Aplicação inicializada com sucesso!');
    } catch (error) {
      console.error('Falha na inicialização:', error);
    }
  }

  async loadInitialData() {
    const loadingPromises = INITIAL_LOAD_ELEMENTS.map(async (element) => {
      const data = this.mockService.loadMockData(element);
      this.appState.setData(element, data);
    });

    await Promise.all(loadingPromises);
  }

  setupAuth() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.appState.setUser(currentUser);
    }
  }

  initializeViews() {
    const currentPage = document.body.dataset.page;
    const isAuthenticated = this.appState.isAuthenticated();

    switch (currentPage) {
      case 'profile':
        if (!isAuthenticated) window.location.href = '../login.html';
        break;
      case 'login':
        if (isAuthenticated) window.location.href = '../profile.html';
        break;
    }
  }

  setupInitialRatings() {
    const idsCaminhos = [1, 2, 3, 4];
    idsCaminhos.forEach(id => {
      const chave = `avaliacao_${id}`;
      if (!localStorage.getItem(chave)) {
        const avaliacaoInicial = (Math.random() * 1.5 + 3.5).toFixed(1);
        localStorage.setItem(chave, avaliacaoInicial);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppInitializer();
  app.initialize();
});
