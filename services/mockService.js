/**
 * CAMINHO SIMPLES (sem simulação de API)
 * - Apenas centraliza o carregamento dos dados mockados
 * - Sem atrasos, sem clones profundos (se você controlar as mutações)
 */

import { alojamentos } from '../js/mock/alojamentos.js';
import { caminhos } from '../js/mock/caminhos.js';
import { comentarios } from '../js/mock/comentarios.js';
import { peregrinos } from '../js/mock/peregrinos.js';

class MockService {
  getAlojamentos() {
    return alojamentos; // Referência direta (cuidado com mutações!)
  }

  getCaminhos() {
    return caminhos;
  }

  getComentarios() {
    return comentarios;
  }

  getPeregrinos() {
    return peregrinos;
  }

  // --- Métodos úteis (opcionais) ---
  getCaminhoPorId(id) {
    return caminhos.find(c => c.id === id);
  }

  getAlojamentosPorLocalizacao(localizacao) {
    return alojamentos.filter(a => 
      a.localizacao.toLowerCase().includes(localizacao.toLowerCase())
    );
  }
}

export const mockService = new MockService();