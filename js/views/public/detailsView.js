// detailsView.js
import { caminhos } from "./js./mock/caminhos.js";

export class DetailsView {
  constructor() {
    this.caminhoId = this.getCaminhoIdFromURL();
    this.caminhoData = this.getCaminhoData(this.caminhoId);
    this.currentDificuldade = 'Fácil'; // Default
    this.init();
  }

  // Helper Methods
  getCaminhoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }

  getCaminhoData(id) {
    return caminhos.find(c => c.id === id);
  }

  getVersaoAtual() {
    return this.caminhoData.versoes.find(v => v.dificuldade === this.currentDificuldade);
  }

  // DOM Methods
  init() {
    if (!this.caminhoData) {
      this.showError();
      return;
    }

    this.renderHeader();
    this.renderDificuldadeSelector();
    this.renderEtapas();
    this.setupEventListeners();
  }

  renderHeader() {
    const { nome, origem, destino, descricao } = this.caminhoData;
    const versao = this.getVersaoAtual();

    document.getElementById('route-name').textContent = nome;
    document.getElementById('route-origin').textContent = origem;
    document.getElementById('route-destination').textContent = destino;
    document.getElementById('route-description').textContent = descricao;
    document.getElementById('route-distance').textContent = `${versao.distanciaTotalKm} km`;
    document.getElementById('route-duration').textContent = `${versao.duracaoDias} dias`;
    document.getElementById('route-difficulty').textContent = versao.dificuldade;
    
    // Set hero image if exists
    if (this.caminhoData.imagem) {
      document.getElementById('route-hero-image').style.backgroundImage = `url('${this.caminhoData.imagem}')`;
    }
  }

  renderDificuldadeSelector() {
    const container = document.querySelector('.difficulty-buttons');
    container.innerHTML = this.caminhoData.versoes.map(versao => `
      <button class="btn-difficulty ${versao.dificuldade === this.currentDificuldade ? 'active' : ''}" 
              data-difficulty="${versao.dificuldade}">
        ${versao.dificuldade}
      </button>
    `).join('');
  }

  renderEtapas() {
    const versao = this.getVersaoAtual();
    const etapasContainer = document.getElementById('stages-list');
    
    etapasContainer.innerHTML = versao.etapas.map(etapa => `
      <div class="stage-card">
        <div class="stage-header">
          <h3>Etapa ${etapa.id}: ${etapa.de} → ${etapa.ate}</h3>
          <span class="stage-distance">${etapa.distanciaKm} km</span>
        </div>
        <div class="stage-details">
          <p><strong>Duração estimada:</strong> ${this.calculateDuration(etapa.distanciaKm)}</p>
          <p><strong>Descrição:</strong> ${etapa.descricao}</p>
          ${etapa.pontosInteresse ? `
            <p><strong>Pontos de interesse:</strong> ${etapa.pontosInteresse.join(', ')}</p>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  calculateDuration(km) {
    // 5km/h average walking speed
    const hours = km / 5;
    if (hours <= 4) return `${Math.ceil(hours)} horas`;
    return `${Math.ceil(hours/8)} dias`; // For very long stages
  }

  setupEventListeners() {
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.currentDificuldade = e.target.dataset.difficulty;
        this.updateView();
      });
    });
  }

  updateView() {
    this.renderHeader();
    this.renderDificuldadeSelector();
    this.renderEtapas();
  }

  showError() {
    document.querySelector('main').innerHTML = `
      <div class="error-message">
        <h2>Caminho não encontrado</h2>
        <p>O caminho solicitado não está disponível.</p>
        <a href="routes.html" class="btn-primary">Voltar para todos os caminhos</a>
      </div>
    `;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DetailsView();
});