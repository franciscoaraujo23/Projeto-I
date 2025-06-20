import { alojamentos } from "../mock/alojamentos.js";

/**
 * Devolve todos os alojamentos disponíveis
 */
export function getAllLodgings() {
  return alojamentos;
}

/**
 * Filtra os alojamentos por localização (texto parcial)
 */
export function filterByLocation(lista, local) {
  if (!local) return lista;
  return lista.filter(a =>
    a.localizacao.toLowerCase().includes(local.toLowerCase())
  );
}

/**
 * Filtra os alojamentos por tipo (Albergue, Hotel, Guesthouse)
 */
export function filterByTipo(lista, tipo) {
  if (!tipo) return lista;
  return lista.filter(a => a.tipo.toLowerCase() === tipo.toLowerCase());
}
