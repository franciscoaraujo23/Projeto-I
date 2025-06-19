import { caminhos } from "../../mock/caminhos.js";

export class RoutesView {
  constructor() {
    this.avaliacoes = new Map();
    caminhos.forEach(c => this.avaliacoes.set(c.id, this.getAvaliacaoAleatoria()));
    this.init();
  }

  getAvaliacaoAleatoria() {
    return parseFloat((Math.random() * 4.9 + 0.1).toFixed(1));
  }

  init() {
    this.cacheSelectors();
    this.renderCaminhos(caminhos);
    this.setupEventListeners();
  }

  cacheSelectors() {
    this.container = document.getElementById("routes-list");
    this.searchInput = document.getElementById("search-nome");
    this.sortDistancia = document.getElementById("ordenar-distancia");
  }

  setupEventListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.applyFilters());
    }

    if (this.sortDistancia) {
      this.sortDistancia.addEventListener("change", () => this.applyFilters());
    }
  }

  applyFilters() {
    const nome = this.searchInput?.value.toLowerCase() || "";
    const ordenacao = this.sortDistancia?.value;

    let filtrados = caminhos.filter(caminho => {
      return caminho.nome.toLowerCase().includes(nome);
    });

    if (ordenacao === "asc" || ordenacao === "desc") {
      filtrados.sort((a, b) => {
        const aKm = Math.min(...a.versoes.map(v => v.distanciaTotalKm));
        const bKm = Math.min(...b.versoes.map(v => v.distanciaTotalKm));
        return ordenacao === "asc" ? aKm - bKm : bKm - aKm;
      });
    } else if (ordenacao === "rating") {
      filtrados.sort((a, b) => this.avaliacoes.get(b.id) - this.avaliacoes.get(a.id));
    } else if (ordenacao === "worst") {
      filtrados.sort((a, b) => this.avaliacoes.get(a.id) - this.avaliacoes.get(b.id));
    }

    this.renderCaminhos(filtrados);
  }

  alterarPontuacao(id, delta) {
    const atual = this.avaliacoes.get(id);
    const novo = Math.min(5, Math.max(0.1, parseFloat((atual + delta).toFixed(1))));
    this.avaliacoes.set(id, novo);
    this.applyFilters();
  }

  renderCaminhos(caminhos) {
    this.container.innerHTML = caminhos.map(caminho => `
      <div class="route-item">
        <div class="route-item-image" style="background-image: url('${caminho.imagem}')"></div>
        <div class="route-item-content">
          <h3>${caminho.nome}</h3>
          <div class="route-meta">
            <p><i class="fas fa-map-marker-alt"></i> Origem: ${caminho.origem}</p>
            <p><i class="fas fa-flag-checkered"></i> Destino: ${caminho.destino}</p>
            <p><i class="fas fa-calendar-alt"></i> Duração: ${this.getDuracoesTexto(caminho.versoes)}</p>
            <p><i class="fas fa-route"></i> Distância: ${this.getDistanciasTexto(caminho.versoes)}</p>
          </div>
          <p>${caminho.descricao}</p>
          <div class="rating">
            <span class="score">${this.avaliacoes.get(caminho.id)} ⭐</span>
            <button onclick="window.routesViewInstance.alterarPontuacao(${caminho.id}, 0.1)">👍</button>
            <button onclick="window.routesViewInstance.alterarPontuacao(${caminho.id}, -0.1)">👎</button>
          </div>

          <a href="details.html?id=${caminho.id}" class="btn-primary">Ver Detalhes</a>
        </div>
      </div>
    `).join('');
  }

  getDuracoesTexto(versoes) {
    const diasUnicos = [...new Set(versoes.map(v => v.duracaoDias))];
    diasUnicos.sort((a, b) => a - b);
    return diasUnicos.join('/') + ' dias';
  }

  getDistanciasTexto(versoes) {
    const kmUnicos = [...new Set(versoes.map(v => v.distanciaTotalKm))];
    kmUnicos.sort((a, b) => a - b);
    return kmUnicos.join('/') + ' km';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.routesViewInstance = new RoutesView();
});
