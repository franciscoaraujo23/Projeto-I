/**
 * Gerenciador central de estado da aplicação
 * Responsável por:
 * - Armazenar dados globais (rotas, alojamentos, usuários, etc.)
 * - Gerenciar estado de autenticação
 * - Notificar componentes sobre mudanças de estado
 */

class AppState {
  constructor() {
    // Estado inicial
    this.state = {
      routes: [],
      lodgings: [],
      comments: [],
      users: [],
      currentUser: null,
      gamification: {
        levels: [],
        userProgress: {}
      },
      // Para APIs externas
      weatherData: null,
      mapData: null
    };

    // Listeners para atualizações de estado
    this.listeners = [];
  }

  // ==================== MÉTODOS PÚBLICOS ====================

  /**
   * Define dados no estado global
   * @param {string} key - Nome do conjunto de dados (ex: 'routes')
   * @param {*} data - Dados a serem armazenados
   */
  setData(key, data) {
    if (key in this.state) {
      this.state[key] = data;
      this._notifyListeners(key);
    } else {
      console.warn(`Chave "${key}" não existe no estado.`);
    }
    return this;
  }

  /**
   * Obtém dados do estado global
   * @param {string} key - Nome do conjunto de dados
   * @returns {*} Dados armazenados
   */
  getData(key) {
    return key in this.state ? this.state[key] : null;
  }

  /**
   * Define o usuário logado
   * @param {object} user - Dados do usuário
   */
  setUser(user) {
    this.state.currentUser = user;
    this._notifyListeners('user');
    return this;
  }

  /**
   * Remove o usuário logado (logout)
   */
  clearUser() {
    this.state.currentUser = null;
    this._notifyListeners('user');
    return this;
  }

  /**
   * Verifica se há um usuário autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.state.currentUser;
  }

  /**
   * Atualiza progresso na gamificação
   * @param {string} userId - ID do usuário
   * @param {object} progress - Dados de progresso
   */
  updateUserProgress(userId, progress) {
    this.state.gamification.userProgress[userId] = progress;
    this._notifyListeners('gamification');
    return this;
  }

  /**
   * Registra um listener para mudanças de estado
   * @param {string} key - Chave do estado a observar
   * @param {function} callback - Função a ser executada na mudança
   */
  addListener(key, callback) {
    this.listeners.push({ key, callback });
    return this;
  }

  // ==================== MÉTODOS PRIVADOS ====================

  /**
   * Notifica listeners sobre mudanças
   * @param {string} changedKey - Chave que foi alterada
   */
  _notifyListeners(changedKey) {
    this.listeners.forEach(({ key, callback }) => {
      if (key === changedKey) {
        callback(this.state[key]);
      }
    });
  }
}

// Exporta uma instância singleton (apenas uma instância global)
export const appState = new AppState();