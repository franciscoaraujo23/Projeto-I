/**
 * Arquivo de inicialização da aplicação
 * Responsável por:
 * - Carregar dados mockados
 * - Inicializar serviços
 * - Configurar estado inicial da aplicação
 */

// Importações (simuladas - em um projeto real seriam módulos ES6)
import { AppState } from './appState.js';
import { AuthService } from './services/authService.js';
import { MockService } from './services/mockService.js';
import { ApiService } from './services/apiService.js';
import { setupNavigation } from './utils/helpers.js';

// Constantes
const INITIAL_LOAD_ELEMENTS = ['routes', 'lodgings', 'comments', 'users'];

class AppInitializer {
  constructor() {
    this.appState = new AppState();
    this.mockService = new MockService();
    this.authService = new AuthService();
    this.apiService = new ApiService();
  }

  /**
   * Inicializa a aplicação
   */
  async initialize() {
    try {
      // 1. Carrega dados iniciais
      await this.loadInitialData();
      
      // 2. Configura autenticação
      this.setupAuth();
      
      // 3. Configura navegação
      setupNavigation();
      
      // 4. Inicializa views baseadas no estado
      this.initializeViews();
      
      console.log('Aplicação inicializada com sucesso!');
    } catch (error) {
      console.error('Falha na inicialização:', error);
    }
  }

  /**
   * Carrega dados mockados iniciais
   */
  async loadInitialData() {
    const loadingPromises = INITIAL_LOAD_ELEMENTS.map(async (element) => {
      const data = await this.mockService.loadMockData(element);
      this.appState.setData(element, data);
    });
    
    await Promise.all(loadingPromises);
  }

  /**
   * Configura sistema de autenticação
   */
  setupAuth() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.appState.setUser(currentUser);
    }
    
    // Listeners para mudanças de autenticação
    this.authService.onLogin((user) => {
      this.appState.setUser(user);
      this.initializeViews();
    });
    
    this.authService.onLogout(() => {
      this.appState.clearUser();
      this.initializeViews();
    });
  }

  /**
   * Inicializa views baseadas no estado atual
   */
  initializeViews() {
    // Lógica para carregar a view correta baseada na página atual
    // e no estado de autenticação
    const currentPage = document.body.dataset.page;
    const isAuthenticated = this.appState.isAuthenticated();
    
    // Exemplo simples - em um projeto real seria mais elaborado
    switch(currentPage) {
      case 'profile':
        if (!isAuthenticated) window.location.href = 'login.html';
        break;
      case 'login':
        if (isAuthenticated) window.location.href = 'profile.html';
        break;
    }
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppInitializer();
  app.initialize();
});