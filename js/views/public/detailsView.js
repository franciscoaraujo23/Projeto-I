// detailsView.js
import { caminhos } from "../../mock/caminhos.js";

export class DetailsView {
  inicializarMapa() {
    if (!this.caminhoData || !this.caminhoData.geojson) return;

    const mapa = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 41.15, lng: -8.61 },
      zoom: 8,
    });

    fetch(this.caminhoData.geojson)
      .then(response => response.json())
      .then(data => {
        mapa.data.addGeoJson(data);
        mapa.data.setStyle({
          strokeColor: "#FF0000",
          strokeWeight: 4,
        });

        const bounds = new google.maps.LatLngBounds();
        data.features[0].geometry.coordinates.forEach(coord => {
          bounds.extend(new google.maps.LatLng(coord[1], coord[0]));
        });
        mapa.fitBounds(bounds);
      });
  }

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
    console.warn("Caminho não encontrado. A previsão do tempo será exibida mesmo assim.");
    return; // só não carrega os dados do caminho
    if (window.detailsViewInstance) {
      window.detailsViewInstance.inicializarMapa();
    }
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

  // Reaplicar os listeners aos botões agora atualizados
  container.querySelectorAll('.btn-difficulty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      this.currentDificuldade = e.target.dataset.difficulty;
      this.updateView();
    });
  });
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
        <p><strong>Duração estimada:</strong> ${etapa.duracaoEstimada}</p>
        <p><strong>Descrição:</strong> ${etapa.descricao}</p>
        ${etapa.pontosInteresse ? `
          <p><strong>Pontos de interesse:</strong> ${etapa.pontosInteresse.join(', ')}</p>
        ` : ''}
      </div>
    </div>
  `).join('');
}


  calculateDuration(km) {
    const hours = km / 5;
    if (hours <= 4) return `${Math.ceil(hours)} horas`;
    return `${Math.ceil(hours / 8)} dias`;
  }

  setupEventListeners() {
    const self = this;
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        self.currentDificuldade = e.target.dataset.difficulty;
        self.updateView();
        self.inicializarMapa();
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

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const view = new DetailsView();
  window.detailsViewInstance = view;
  new DetailsView();

  // Previsão do Tempo
  const API_KEY = "cde1177122ec162c8d02e37532505110";
  const coordenadas = { lat: 41.1496, lon: -8.6109 };

  const dataInicioInput = document.getElementById("dataInicio");
  const dataFimInput = document.getElementById("dataFim");
  const mostrarPrevisaoBtn = document.getElementById("mostrarPrevisao");
  const divTempo = document.getElementById("tempo");

  if (!dataInicioInput || !dataFimInput || !mostrarPrevisaoBtn || !divTempo) return;

  const hoje = new Date();
  dataInicioInput.value = hoje.toISOString().slice(0, 10);
  const maxFim = new Date(hoje);
  maxFim.setDate(hoje.getDate() + 4);
  dataFimInput.value = maxFim.toISOString().slice(0, 10);

  dataInicioInput.min = hoje.toISOString().slice(0, 10);
  dataInicioInput.max = maxFim.toISOString().slice(0, 10);
  dataFimInput.min = hoje.toISOString().slice(0, 10);
  dataFimInput.max = maxFim.toISOString().slice(0, 10);

  dataInicioInput.addEventListener("change", () => {
    const inicio = new Date(dataInicioInput.value);
    if (isNaN(inicio)) return;

    dataFimInput.min = dataInicioInput.value;
    const maxFimData = new Date(inicio);
    maxFimData.setDate(inicio.getDate() + 4);

    const maxGlobal = new Date(maxFim);
    dataFimInput.max = (maxFimData > maxGlobal) ? maxGlobal.toISOString().slice(0, 10) : maxFimData.toISOString().slice(0, 10);

    if (dataFimInput.value < dataFimInput.min) dataFimInput.value = dataFimInput.min;
    if (dataFimInput.value > dataFimInput.max) dataFimInput.value = dataFimInput.max;
  });

  dataFimInput.addEventListener("change", () => {
    const fim = new Date(dataFimInput.value);
    if (isNaN(fim)) return;

    dataInicioInput.max = dataFimInput.value;
    const minInicio = new Date(fim);
    minInicio.setDate(fim.getDate() - 4);
    const minGlobal = new Date(hoje);
    dataInicioInput.min = (minInicio < minGlobal) ? minGlobal.toISOString().slice(0, 10) : minInicio.toISOString().slice(0, 10);

    if (dataInicioInput.value > dataInicioInput.max) dataInicioInput.value = dataInicioInput.max;
    if (dataInicioInput.value < dataInicioInput.min) dataInicioInput.value = dataInicioInput.min;
  });

  mostrarPrevisaoBtn.addEventListener("click", () => {
    const dataInicio = dataInicioInput.value;
    const dataFim = dataFimInput.value;

    if (!dataInicio || !dataFim) {
      alert("Por favor, seleciona ambas as datas.");
      return;
    }

    if (window.detailsViewInstance) {
      window.detailsViewInstance.inicializarMapa();
    }

    if (dataFim < dataInicio) {
      alert("A data fim deve ser igual ou posterior à data início.");
      return;
    }

    divTempo.innerHTML = "A carregar...";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordenadas.lat}&lon=${coordenadas.lon}&appid=${API_KEY}&units=metric&lang=pt`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar dados do tempo");
        return res.json();
      })
      .then(data => {
        const dias = agruparPorDia(data.list);

        const diasFiltrados = {};
        for (const dia in dias) {
          if (dia >= dataInicio && dia <= dataFim) {
            diasFiltrados[dia] = dias[dia];
          }
        }

        mostrarPrevisoesIntervalo(diasFiltrados, dataInicio, dataFim);
      })
      .catch(err => {
        divTempo.innerHTML = `<p style="color:red">Erro: ${err.message}</p>`;
      });
  });

  function agruparPorDia(lista) {
    const dias = {};
    lista.forEach(item => {
      const data = item.dt_txt.split(" ")[0];
      if (!dias[data]) dias[data] = [];
      dias[data].push(item);
    });
    return dias;
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function mostrarPrevisoesIntervalo(dias, dataInicio, dataFim) {
    divTempo.innerHTML = "";

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    const datasSelecionadas = [];
    for (let d = new Date(inicio); d <= fim && datasSelecionadas.length < 5; d.setDate(d.getDate() + 1)) {
      datasSelecionadas.push(d.toISOString().slice(0, 10));
    }

    datasSelecionadas.forEach(dia => {
      const divDia = document.createElement("div");
      divDia.classList.add("dia-previsao");

      if (dias[dia]) {
        divDia.innerHTML = `<h3>${formatarData(dia)}</h3>`;

        dias[dia].forEach(item => {
          const hora = item.dt_txt.split(" ")[1].slice(0, 5);
          const temp = Math.round(item.main.temp);
          const icone = item.weather[0].icon;
          const desc = item.weather[0].description;

          const blocoHora = document.createElement("div");
          blocoHora.classList.add("previsao-hora");

          blocoHora.innerHTML = `
            <strong>${hora}</strong>
            <div class="previsao-desc">${desc}</div>
            <div class="previsao-temp">${temp}°C</div>
            <img src="https://openweathermap.org/img/wn/${icone}.png" alt="${desc}" />
          `;

          divDia.appendChild(blocoHora);
        });
      } else {
        divDia.innerHTML = `<h3>${formatarData(dia)}</h3><p style="text-align:center; color:#999;">Sem dados</p>`;
      }

      divTempo.appendChild(divDia);
    });
  }

  mostrarPrevisaoBtn.click();
});
