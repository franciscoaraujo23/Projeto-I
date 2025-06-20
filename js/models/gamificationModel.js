/**
 * Calcula a pontuação final de um quiz.
 * @param {number} base - Número de respostas certas
 * @param {number} multiplicador - Valor fixo por resposta certa (default: 10)
 * @returns {number} Pontuação final
 */
export function calcularPontuacao(base, multiplicador = 10) {
  return base * multiplicador;
}

/**
 * Atualiza o nível de um utilizador com base nos pontos acumulados.
 * Exemplo de progressão:
 * - 0–99 → Nível 1
 * - 100–299 → Nível 2
 * - 300–599 → Nível 3
 * - 600–999 → Nível 4
 * - 1000+ → Nível 5
 */
export function calcularNivel(pontos) {
  if (pontos >= 1000) return 5;
  if (pontos >= 600) return 4;
  if (pontos >= 300) return 3;
  if (pontos >= 100) return 2;
  return 1;
}
