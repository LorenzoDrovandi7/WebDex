import { pokemonName } from "/src/script.js";

export function asignName(data) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokemonName.textContent = name;

  pokemonName.classList.remove("pokemon-name-extra-small", "pokemon-name-small");

  if (name.length > 15) {
    pokemonName.classList.add("pokemon-name-extra-small");
  } else if (name.length > 10) {
    pokemonName.classList.add("pokemon-name-small");
  }
}
