import { pokemonNumber } from "/src/script.js";

export function asignId(data) {
  pokemonNumber.textContent = `#${data.id}`;
}
