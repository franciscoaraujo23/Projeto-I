import { AppState } from './appState.js';
import { AuthService } from '../services/authService.js';
import { ApiService } from '../services/apiService.js';
import { MockService } from '../services/mockService.js';
import { initPublicViews } from './views/public/publicViews.js'; //FUNÇÃO POR CRIAR
import { initUserViews } from './views/user/userViews.js'; //FUNÇÃO POR CRIAR
import { initAdminViews } from './views/admin/adminView.js'; //\FUNÇÃO POR CRIAR
import { setupNavigation } from './utils/helpers.js';
import { API_BASE_URL, MAPS_API_KEY, WEATHER_API_KEY } from './utils/constants.js';

class App {
  constructor() {
    // Inicializa o estado da aplicação
    this.state = new AppState();
    
    // Configura serviços
    this.services = {
      auth: new AuthService(),
      api: new ApiService(API_BASE_URL),
      mock: new MockService()
    };
    
    // Configurações globais
    this.config = {
      mapsApiKey: MAPS_API_KEY,
      weatherApiKey: WEATHER_API_KEY
    };
    
    // Bind de métodos
    this.init = this.init.bind(this);
    this.handleAuthChange = this.handleAuthChange.bind(this);
  }
  
  /**
   * Inicializa a aplicação
   */
  async init() {
    try {
      // Carrega dados iniciais
      await this.loadInitialData();
      
      // Configura listeners
      this.setupEventListeners();
      
      // Inicializa visualizações baseadas no tipo de usuário
      this.initViews();
      
      // Configura navegação
      setupNavigation();
      
      console.log('Aplicação inicializada com sucesso');
    } catch (error) {
      console.error('Falha ao inicializar aplicação:', error);
    }
  }
  
  /**
   * Carrega dados iniciais necessários
   */
  async loadInitialData() {
    // Verifica autenticação
    const isAuthenticated = await this.services.auth.checkAuth();
    this.state.setAuthState(isAuthenticated);
    
    // Carrega dados mockados (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      await this.services.mock.loadInitialData();
    }
    
    // Carrega configurações de mapas
    this.loadMapsScript();
  }
  
  /**
   * Carrega script da API do Google Maps
   */
  loadMapsScript() {
    if (!document.querySelector('#google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.config.mapsApiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      // Define a função global de callback
      window.initMap = () => {
        this.state.setMapsLoaded(true);
        console.log('Google Maps API carregada');
      };
    }
  }
  
  /**
   * Configura listeners globais
   */
  setupEventListeners() {
    // Listener para mudanças de autenticação
    this.services.auth.onAuthStateChanged(this.handleAuthChange);
    
    // Listener para erros globais
    window.addEventListener('error', (event) => {
      console.error('Erro global:', event.error);
    });
  }
  
  /**
   * Manipula mudanças no estado de autenticação
   */
  handleAuthChange(isAuthenticated, userData) {
    this.state.setAuthState(isAuthenticated, userData);
    this.initViews();
  }
  
  /**
   * Inicializa as visualizações apropriadas baseadas no tipo de usuário
   */
  initViews() {
    const { isAuthenticated, userRole } = this.state;
    
    // Sempre inicializa visualizações públicas
    initPublicViews(this.state, this.services);
    
    if (isAuthenticated) {
      if (userRole === 'admin') {
        initAdminViews(this.state, this.services);
      } else {
        initUserViews(this.state, this.services);
      }
    }
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
  
  // Expõe app globalmente para debugging (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }
});