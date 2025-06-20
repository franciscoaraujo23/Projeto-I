/**
 * Serviço de autenticação
 * Login/logout com dados mockados
 * Integração com localStorage e AppState
 */

import { peregrinos } from '../js/mock/peregrinos.js';
import { appState } from '../js/appState.js';
import { STORAGE_KEYS, MESSAGES } from '../utils/constants.js';
import { navigateTo } from '../utils/helpers.js';

class AuthService {
  constructor() {
    this.users = peregrinos; // Dados mockados
  }

  /**
   * Realiza login
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: MESSAGES.AUTH_ERROR };
    }

    // Atualiza estado e storage
    appState.setUser(user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-token-' + user.id);

    return { success: true };
  }

  /**
   * Realiza logout
   */
  logout() {
    appState.clearUser();
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    navigateTo('HOME');
  }

  /**
   * Retorna o utilizador logado (do storage)
   * @returns {object|null}
   */
  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Registro de novo utilizador
   * @param {object} userData - { nome, email, password }
   * @returns {Promise<{success: boolean, message?: string, user?: object}>}
   */
  async register(userData) {
    // Verifica se email já existe
    if (this.users.some(u => u.email === userData.email)) {
      return { 
        success: false, 
        message: 'Email já registado! Faça login ou recupere a senha.' 
      };
    }

    const newUser = {
      ...userData,
      id: this.users.length + 1,
      avatarUrl: 'img/avatar-default.png', // Imagem default
      pontos: 0,
      nivel: 1,
      caminhosPercorridos: [],
      conquistas: ["Novo Peregrino"],
      comentarios: [],
      dataRegisto: new Date().toISOString(),
      ultimoLogin: null
    };
    
    this.users.push(newUser);
    return { 
      success: true, 
      user: newUser,
      message: 'Registo bem-sucedido! Redirecionando...'
    };
  }
}

export const authService = new AuthService();