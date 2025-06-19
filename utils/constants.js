/**
 * Constantes globais da aplicação
 * - URLs de APIs fictícias
 * - Configurações de gamificação
 * - Chaves para armazenamento local
 */

// API Fictícia (simula endpoints)
export const API_ENDPOINTS = {
  ROUTES: '/api/routes',
  LODGINGS: '/api/lodgings',
  COMMENTS: '/api/comments',
  USERS: '/api/users',
  WEATHER: '/api/weather',
  MAPS: '/api/maps'
};

// Níveis de Gamificação
export const GAMIFICATION_LEVELS = [
  { level: 1, name: 'Iniciante', pointsRequired: 0 },
  { level: 2, name: 'Caminheiro', pointsRequired: 100 },
  { level: 3, name: 'Peregrino', pointsRequired: 300 },
  { level: 4, name: 'Mestre do Caminho', pointsRequired: 600 },
  { level: 5, name: 'Peregrino Alpha', pointsRequired: 750 }

];

// Chaves para localStorage
export const STORAGE_KEYS = {
  USER: 'camino_user',
  AUTH_TOKEN: 'camino_token'
};

// Mensagens padrão
export const MESSAGES = {
  AUTH_ERROR: 'Autenticação necessária. Faça login para acessar.',
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.'
};

// Rotas do site (para navegação programática)
export const APP_ROUTES = {
  HOME: '/index.html',
  LOGIN: '/login.html',
  PROFILE: '/profile.html'
};