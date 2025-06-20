import { peregrinos } from '../mock/peregrinos.js';
import { comentarios } from '../mock/comentarios.js';

/**
 * Junta os dados dos peregrinos com os seus comentários.
 */
function mapPeregrinosComComentarios() {
  return peregrinos.map(user => {
    const userComments = comentarios.filter(c => c.idUtilizador === user.id);
    return { ...user, comentarios: userComments };
  });
}

/**
 * Devolve a leaderboard dos utilizadores ordenados por pontos.
 */
export function getLeaderboard(limit = 10) {
  return [...peregrinos]
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limit);
}

/**
 * Devolve os comentários mais recentes com info do utilizador.
 */
export function getRecentComments(limit = 10) {
  const combinados = [];

  peregrinos.forEach(user => {
    (user.comentarios || []).forEach(c => {
      combinados.push({
        texto: c.texto,
        data: c.data,
        utilizador: user.nome,
        avatar: user.avatarUrl || 'img/avatar-default.png'
      });
    });
  });

  return combinados
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, limit);
}

/**
 * Devolve o ranking completo de utilizadores com estatísticas.
 */
export function getUserRanking() {
  return peregrinos.map(user => ({
    nome: user.nome,
    avatar: user.avatarUrl,
    pontos: user.pontos,
    nivel: user.nivel,
    conquistas: user.conquistas.length,
    comentarios: (user.comentarios || []).length
  })).sort((a, b) => b.pontos - a.pontos);
}
