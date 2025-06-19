import { caminhos } from "../../mock/caminhos.js";

export class RoutesView {
  constructor() {
    this.init();
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
      filtrados.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (ordenacao === "worst") {
      filtrados.sort((a, b) => a.avaliacao - b.avaliacao);
    }

    this.renderCaminhos(filtrados);
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
            <span class="score">${caminho.avaliacao.toFixed(1)} ⭐</span>
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
