//gaita?

import { caminhos } from "../mock/caminhos.js";

const avaliacoes = new Map();

// Inicializar avaliações aleatórias se ainda não existirem
caminhos.forEach(c => {
  if (!avaliacoes.has(c.id)) {
    avaliacoes.set(c.id, parseFloat((Math.random() * 4.9 + 0.1).toFixed(1)));
  }
});

export function getAllRoutes() {
  return caminhos;
}

export function getAvaliacao(id) {
  return avaliacoes.get(id);
}

export function filtrarCaminhosPorNome(nome) {
  return caminhos.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
}

export function ordenarCaminhos(lista, modo) {
  return lista.sort((a, b) => {
    const aKm = Math.min(...a.versoes.map(v => v.distanciaTotalKm));
    const bKm = Math.min(...b.versoes.map(v => v.distanciaTotalKm));
    return modo === "asc" ? aKm - bKm : bKm - aKm;
  });
}
