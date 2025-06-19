/**
 * Funções utilitárias globais
 * - Navegação
 * - Formatação de dados
 * - Manipulação de DOM
 */

import { APP_ROUTES, MESSAGES } from './constants.js';
import { appState } from '../js/appState.js';

// ==================== NAVEGAÇÃO ====================

/**
 * Configura navegação global e verificação de autenticação
 */
export function setupNavigation() {
  // Links que requerem autenticação
  document.querySelectorAll('[data-auth]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!appState.isAuthenticated()) {
        e.preventDefault();
        alert(MESSAGES.AUTH_ERROR);
        window.location.href = APP_ROUTES.LOGIN;
      }
    });
  });
}

/**
 * Redireciona para rota específica
 * @param {string} routeKey - Chave de APP_ROUTES (ex: 'HOME')
 */
export function navigateTo(routeKey) {
  window.location.href = APP_ROUTES[routeKey];
}

// ==================== FORMATAÇÃO ====================

/**
 * Formata distâncias (ex: 15000 → "15 km")
 */
export function formatDistance(meters) {
  return meters >= 1000 
    ? `${(meters / 1000).toFixed(1)} km` 
    : `${meters} m`;
}

/**
 * Formata datas para exibição (ex: '2025-06-20' → '20/06/2025')
 */
export function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
}

// ==================== DOM ====================

/**
 * Mostra/Oculta elementos baseado em autenticação
 */
export function toggleAuthElements() {
  document.querySelectorAll('[data-auth-only]').forEach(el => {
    el.style.display = appState.isAuthenticated() ? 'block' : 'none';
  });

  document.querySelectorAll('[data-guest-only]').forEach(el => {
    el.style.display = appState.isAuthenticated() ? 'none' : 'block';
  });
}