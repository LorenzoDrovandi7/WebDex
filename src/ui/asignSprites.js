import { pokemonImageContainer } from "../script.js";
import { pokemon } from "../api/classPokemon.js";

export function asignSprites(pokemon) {
  const img = document.createElement("img");
  img.src = pokemon.sprite;
  img.alt = pokemon.getFormattedName();
  img.className = "pokemon-sprite";
  pokemonImageContainer.innerHTML = "";
  pokemonImageContainer.appendChild(img);
}
