import {
  getAllLodgings,
  filterByLocation,
  filterByTipo
} from "../../models/lodgingModel.js";

class LodgingView {
  constructor() {
    this.init();
  }

  init() {
    this.cacheSelectors();
    this.setupListeners();
    this.renderLodgings(getAllLodgings());
  }

  cacheSelectors() {
    this.listContainer = document.getElementById("lodging-list");
    this.searchInput = document.getElementById("search-localizacao");
    this.tipoSelect = document.getElementById("tipo-alojamento");
  }

  setupListeners() {
    this.searchInput?.addEventListener("input", () => this.applyFilters());
    this.tipoSelect?.addEventListener("change", () => this.applyFilters());
  }

  applyFilters() {
    const local = this.searchInput?.value || "";
    const tipo = this.tipoSelect?.value || "";

    let resultado = getAllLodgings();
    resultado = filterByLocation(resultado, local);
    resultado = filterByTipo(resultado, tipo);

    this.renderLodgings(resultado);
  }

  renderLodgings(lista) {
    if (!this.listContainer) return;

    this.listContainer.innerHTML = "";

    if (lista.length === 0) {
      this.listContainer.innerHTML = `<p class="no-results">Nenhum alojamento encontrado.</p>`;
      return;
    }

    lista.forEach(a => {
      const card = document.createElement("div");
      card.classList.add("lodging-card");

      const servicosHtml = a.servicos.map(s => `<li>${s}</li>`).join("");

      card.innerHTML = `
        <div class="lodging-info">
          <h3>${a.nome}</h3>
          <p><strong>Localização:</strong> ${a.localizacao}</p>
          <p><strong>Tipo:</strong> ${a.tipo}</p>
          <p><strong>Preço/noite:</strong> ${a.precoPorNoite}€</p>
          <p><strong>Lotação:</strong> ${a.lotacaoMaxima} pessoas</p>
          <p><strong>Disponível:</strong> ${a.disponivel ? "✅ Sim" : "❌ Não"}</p>
          <p><strong>Serviços:</strong></p>
          <ul>${servicosHtml}</ul>
          <p><strong>Contacto:</strong><br>
            Tel: ${a.contacto.telefone}<br>
            Email: ${a.contacto.email}
          </p>
        </div>
      `;

      this.listContainer.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new LodgingView());
