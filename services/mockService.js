import { alojamentos } from '../js/mock/alojamentos.js';
import { caminhos } from '../js/mock/caminhos.js';
import { comentarios } from '../js/mock/comentarios.js';
import { peregrinos } from '../js/mock/peregrinos.js';

class MockService {
  inicializarUtilizadoresMock() {
    console.log("➡️ A correr inicializarUtilizadoresMock");

    const armazenados = JSON.parse(localStorage.getItem("utilizadores")) || {};

    peregrinos.forEach(p => {
      if (!armazenados[p.email]) {
        armazenados[p.email] = {
          id: p.id,
          nome: p.nome,
          email: p.email,
          password: p.password,
          avatarUrl: p.avatarUrl || "./assets/avatar-default.png",
          pontos: p.pontos || 0,
          nivel: p.nivel || 0,
          caminhosPercorridos: p.caminhosPercorridos || [],
          etapasConcluidas: p.etapasConcluidas || 0,
          conquistas: p.conquistas || [],
          comentarios: p.comentarios || []  // <-- aqui vai buscar os comentários do mock
        };
      }
    });

    

    localStorage.setItem("utilizadores", JSON.stringify(armazenados));
    console.log("✅ Utilizadores carregados do peregrinos.js para localStorage");
  }


  getAlojamentos() {
    return alojamentos;
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

  loadMockData(element) {
    switch (element) {
      case 'routes':
        return this.getCaminhos();
      case 'lodgings':
        return this.getAlojamentos();
      case 'comments':
        return this.getComentarios();
      case 'users':
        return this.getPeregrinos();
      default:
        console.warn(`MockService: Elemento '${element}' não é reconhecido.`);
        return [];
    }
  }

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
