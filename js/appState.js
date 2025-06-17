/**
 * Gerencia o estado global da aplicação (autenticação, dados do usuário, gamificação, etc.)
 * Segue padrão Observer para notificar mudanças de estado.
 */
class AppState {
  constructor() {
    // Estado inicial
    this._state = {
      // Autenticação
      isAuthenticated: false,
      user: null, // { id, nome, email, nivelGamificacao, etc. }
      
      // Dados carregados
      routes: [],      // Lista de caminhos
      lodgings: [],    // Alojamentos
      comments: [],    // Comentários da comunidade
      leaderboard: [], // Ranking de peregrinos
      
      // Gamificação
      userProgress: null, // { nivel, conquistas, etapasCompletas }
      
      // UI/Config
      currentPage: '',
      mapsLoaded: false,
      weatherData: null
    };

    // Listeners para atualizações de estado
    this._listeners = [];
  }

  // --- Métodos principais ---
  getState() {
    return this._state;
  }

  setAuthState(isAuthenticated, userData = null) {
    this._state.isAuthenticated = isAuthenticated;
    this._state.user = userData;
    this._notifyListeners('auth');
  }

  setUserProgress(progress) {
    this._state.userProgress = progress;
    this._notifyListeners('gamification');
  }

  loadInitialData({ routes, lodgings, comments, leaderboard }) {
    this._state.routes = routes || [];
    this._state.lodgings = lodgings || [];
    this._state.comments = comments || [];
    this._state.leaderboard = leaderboard || [];
    this._notifyListeners('data');
  }

  // --- Gerenciamento de listeners ---
  addListener(callback) {
    this._listeners.push(callback);
  }

  _notifyListeners(changedKey) {
    this._listeners.forEach(callback => callback(this._state, changedKey));
  }

  // --- Helpers específicos do projeto ---
  getCurrentUserLevel() {
    return this._state.userProgress?.nivel || 0;
  }

  getRouteById(routeId) {
    return this._state.routes.find(route => route.id === routeId);
  }
}

// Exporta como singleton (única instância)
export const appState = new AppState();