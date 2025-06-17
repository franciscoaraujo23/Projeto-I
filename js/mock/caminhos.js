export const caminhos = [
  {
    id: 1,
    nome: "Caminho Francês",
    origem: "Saint-Jean-Pied-de-Port",
    destino: "Santiago de Compostela",
    descricao: "O Caminho Francês é o percurso mais famoso dos Caminhos de Santiago, atravessando os Pirenéus e várias regiões históricas de Espanha.",
    versoes: [
      {
        dificuldade: "Fácil",
        duracaoDias: 36,
        distanciaTotalKm: 780,
        etapas: [
          { id: 1, de: "SJPP", ate: "Valcarlos", distanciaKm: 12, descricao: "Etapa curta para aclimatação aos Pirenéus." },
          { id: 2, de: "Valcarlos", ate: "Roncesvalles", distanciaKm: 15, descricao: "Travessia da fronteira até ao primeiro grande refúgio espanhol." },
          { id: 3, de: "Roncesvalles", ate: "Zubiri", distanciaKm: 21, descricao: "Percurso por bosques pirenaicos e vilas medievais." }
        ]
      },
      {
        dificuldade: "Moderado",
        duracaoDias: 31,
        distanciaTotalKm: 780,
        etapas: [
          { id: 1, de: "SJPP", ate: "Roncesvalles", distanciaKm: 25, descricao: "Desafio inicial com subida intensa pelos Pirenéus." },
          { id: 2, de: "Roncesvalles", ate: "Pamplona", distanciaKm: 42, descricao: "Bosques, rios e chegada à cidade universitária." },
          { id: 3, de: "Pamplona", ate: "Puente la Reina", distanciaKm: 24, descricao: "Campos abertos e cruzamento de pontes históricas." }
        ]
      },
      {
        dificuldade: "Difícil",
        duracaoDias: 26,
        distanciaTotalKm: 780,
        etapas: [
          { id: 1, de: "SJPP", ate: "Pamplona", distanciaKm: 66, descricao: "Percurso exigente em dois dias fundidos num só." },
          { id: 2, de: "Pamplona", ate: "Logroño", distanciaKm: 90, descricao: "Várias vilas seguidas com terreno variado." },
          { id: 3, de: "Logroño", ate: "Burgos", distanciaKm: 120, descricao: "Caminho longo com troços isolados." }
        ]
      }
    ]
  },

  {
    id: 2,
    nome: "Caminho Português Central",
    origem: "Porto",
    destino: "Santiago de Compostela",
    descricao: "Este percurso atravessa o coração de Portugal e da Galiza, combinando tradição, hospitalidade e paisagens rurais.",
    versoes: [
      {
        dificuldade: "Fácil",
        duracaoDias: 14,
        distanciaTotalKm: 240,
        etapas: [
          { id: 1, de: "Porto", ate: "Vila do Conde", distanciaKm: 20, descricao: "Caminho plano próximo à costa atlântica." },
          { id: 2, de: "Vila do Conde", ate: "Barcelos", distanciaKm: 24, descricao: "Paisagens verdes e igrejas seculares." },
          { id: 3, de: "Barcelos", ate: "Ponte de Lima", distanciaKm: 18, descricao: "Trilho histórico entre vinhedos." }
        ]
      },
      {
        dificuldade: "Moderado",
        duracaoDias: 11,
        distanciaTotalKm: 240,
        etapas: [
          { id: 1, de: "Porto", ate: "Barcelos", distanciaKm: 33, descricao: "Percurso urbano seguido de paisagens rurais." },
          { id: 2, de: "Barcelos", ate: "Valença", distanciaKm: 50, descricao: "Serras suaves e pequenas aldeias." },
          { id: 3, de: "Valença", ate: "Tui", distanciaKm: 5, descricao: "Travessia da ponte internacional sobre o rio Minho." }
        ]
      },
      {
        dificuldade: "Difícil",
        duracaoDias: 8,
        distanciaTotalKm: 240,
        etapas: [
          { id: 1, de: "Porto", ate: "Ponte de Lima", distanciaKm: 68, descricao: "Desafio prolongado com secções asfaltadas e rurais." },
          { id: 2, de: "Ponte de Lima", ate: "Tui", distanciaKm: 44, descricao: "Travessia montanhosa por Rubiães e Cerveira." },
          { id: 3, de: "Tui", ate: "Santiago", distanciaKm: 115, descricao: "Última longa etapa por cidades galegas." }
        ]
      }
    ]
  },

  {
    id: 3,
    nome: "Caminho da Prata",
    origem: "Sevilha",
    destino: "Santiago de Compostela",
    descricao: "Rota histórica romana que atravessa o interior de Espanha, conhecida pela solidão e beleza árida.",
    versoes: [
      {
        dificuldade: "Fácil",
        duracaoDias: 40,
        distanciaTotalKm: 1000,
        etapas: [
          { id: 1, de: "Sevilha", ate: "Guillena", distanciaKm: 22, descricao: "Começo plano sob o calor andaluz." },
          { id: 2, de: "Guillena", ate: "Zafra", distanciaKm: 33, descricao: "Trilho rural por planícies douradas." },
          { id: 3, de: "Zafra", ate: "Cáceres", distanciaKm: 42, descricao: "Entrada em território extremenho, repleto de história." }
        ]
      },
      {
        dificuldade: "Moderado",
        duracaoDias: 34,
        distanciaTotalKm: 1000,
        etapas: [
          { id: 1, de: "Sevilha", ate: "Zafra", distanciaKm: 75, descricao: "União de várias etapas num trajeto mais intenso." },
          { id: 2, de: "Zafra", ate: "Cáceres", distanciaKm: 42, descricao: "Terreno com declives leves e bom piso." },
          { id: 3, de: "Cáceres", ate: "Salamanca", distanciaKm: 85, descricao: "Caminho longo entre cidades Património da Humanidade." }
        ]
      },
      {
        dificuldade: "Difícil",
        duracaoDias: 28,
        distanciaTotalKm: 1000,
        etapas: [
          { id: 1, de: "Sevilha", ate: "Cáceres", distanciaKm: 120, descricao: "Longo e árido, com poucas sombras." },
          { id: 2, de: "Cáceres", ate: "Zamora", distanciaKm: 150, descricao: "Zona agrícola espaçosa com poucas localidades." },
          { id: 3, de: "Zamora", ate: "Santiago", distanciaKm: 180, descricao: "Último esforço até à catedral." }
        ]
      }
    ]
  },

  {
    id: 4,
    nome: "Caminho Inglês",
    origem: "Ferrol",
    destino: "Santiago de Compostela",
    descricao: "Percurso curto e acessível, usado por peregrinos oriundos das Ilhas Britânicas que chegavam por mar.",
    versoes: [
      {
        dificuldade: "Fácil",
        duracaoDias: 6,
        distanciaTotalKm: 120,
        etapas: [
          { id: 1, de: "Ferrol", ate: "Pontedeume", distanciaKm: 26, descricao: "Beira-mar e enseadas galegas." },
          { id: 2, de: "Pontedeume", ate: "Betanzos", distanciaKm: 21, descricao: "Ruelas medievais e paisagens bucólicas." },
          { id: 3, de: "Betanzos", ate: "Hospital de Bruma", distanciaKm: 28, descricao: "Trilho rural entre colinas verdes." }
        ]
      },
      {
        dificuldade: "Moderado",
        duracaoDias: 5,
        distanciaTotalKm: 120,
        etapas: [
          { id: 1, de: "Ferrol", ate: "Betanzos", distanciaKm: 47, descricao: "Fusão de etapas costeiras num só dia exigente." },
          { id: 2, de: "Betanzos", ate: "Sigüeiro", distanciaKm: 40, descricao: "Caminho entre bosques e pastagens." },
          { id: 3, de: "Sigüeiro", ate: "Santiago", distanciaKm: 16, descricao: "Últimos passos até à catedral." }
        ]
      },
      {
        dificuldade: "Difícil",
        duracaoDias: 4,
        distanciaTotalKm: 120,
        etapas: [
          { id: 1, de: "Ferrol", ate: "Hospital de Bruma", distanciaKm: 55, descricao: "Dia longo com vários desníveis." },
          { id: 2, de: "Bruma", ate: "Sigüeiro", distanciaKm: 33, descricao: "Terreno misto com trechos florestais." },
          { id: 3, de: "Sigüeiro", ate: "Santiago", distanciaKm: 16, descricao: "Chegada final ao destino espiritual." }
        ]
      }
    ]
  }
];
