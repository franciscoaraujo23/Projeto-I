import { appState } from './appState.js';
import { authService } from '../services/authService.js';
import { mockService } from '../services/mockService.js';
import { MockService as ApiService } from '../services/apiService.js';
import { setupNavigation } from '../utils/helpers.js';

const INITIAL_LOAD_ELEMENTS = ['routes', 'lodgings', 'comments', 'users'];

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

      // ✅ Garante que os utilizadores mock são inseridos
      this.mockService.inicializarUtilizadoresMock();

      this.setupAuth();
      setupNavigation();
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

    // ❌ removeu os listeners que não existem
    this.initializeViews();
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
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppInitializer();
  app.initialize();
});

this.setupAuth();
setupNavigation();

// ⬇️ Avaliações iniciais
const idsCaminhos = [1, 2, 3, 4];
idsCaminhos.forEach(id => {
  const chave = `avaliacao_${id}`;
  if (!localStorage.getItem(chave)) {
    const avaliacaoInicial = (Math.random() * 1.5 + 3.5).toFixed(1);
    localStorage.setItem(chave, avaliacaoInicial);
  }
});