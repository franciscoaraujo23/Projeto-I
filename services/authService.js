import { appState } from './appState.js';
import { API_BASE_URL } from '../utils/constants.js';
import { UserModel } from '../models/userModel.js';

/**
 * Serviço de autenticação: gerencia login, registo, logout e estado do utilizador.
 * Integra com a API backend e atualiza o appState.
 */
class AuthService {
  constructor() {
    this.userModel = new UserModel();
    this._authListeners = [];
  }

  // ========================
  // Métodos Públicos
  // ========================

  /**
   * Realiza o login do utilizador
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async login(email, password) {
    try {
      // 1. Chamada à API (ou mock em desenvolvimento)
      const response = await this._mockLogin(email, password); // Substituir por fetch() em produção
      
      if (!response.success) {
        return { success: false, error: response.error };
      }

      // 2. Atualiza appState
      const userData = this._formatUserData(response.user);
      appState.setAuthState(true, userData);

      // 3. Notifica listeners (ex: para redirecionar páginas)
      this._notifyAuthListeners(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  }

  /**
   * Regista um novo utilizador
   * @param {object} userData - { nome, email, password }
   */
  async register(userData) {
    // Implementação similar ao login, mas para registo
    // ...
  }

  /**
   * Faz logout
   */
  logout() {
    appState.setAuthState(false, null);
    this._notifyAuthListeners(false);
    // Limpar tokens/localStorage se aplicável
  }

  /**
   * Verifica se o utilizador está autenticado (útil ao recarregar a página)
   * @returns {Promise<boolean>}
   */
  async checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const user = await this._fetchCurrentUser(token);
      appState.setAuthState(true, this._formatUserData(user));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Adiciona listener para mudanças de autenticação
   * @param {function} callback 
   */
  onAuthStateChanged(callback) {
    this._authListeners.push(callback);
  }

  // ========================
  // Métodos Privados
  // ========================

  /**
   * Formata dados do utilizador para o padrão do appState
   * @private
   */
  _formatUserData(user) {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      nivelGamificacao: user.nivel || 1,
      caminhosCompletos: user.caminhosCompletos || []
    };
  }

  /**
   * Mock para desenvolvimento (remover em produção)
   * @private
   */
  async _mockLogin(email, password) {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUsers = [
      { id: '1', email: 'peregrino@teste.com', password: '123', nome: 'Peregrino Teste', nivel: 1 }
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    return user 
      ? { success: true, user } 
      : { success: false, error: 'Credenciais inválidas' };
  }

  /**
   * Notifica listeners de autenticação
   * @private
   */
  _notifyAuthListeners(isAuthenticated) {
    this._authListeners.forEach(callback => callback(isAuthenticated));
  }
}

// Exporta como singleton
export const authService = new AuthService();