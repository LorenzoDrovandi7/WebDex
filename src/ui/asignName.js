import { pokemonName } from "../script.js";

export function asignName(pokemon) {
  const name = pokemon.getFormattedName();
  pokemonName.textContent = name;

  pokemonName.classList.remove("pokemon-name-extra-small", "pokemon-name-small");

  if (name.length > 15) {
    pokemonName.classList.add("pokemon-name-extra-small");
  } else if (name.length > 10) {
    pokemonName.classList.add("pokemon-name-small");
  }
}
