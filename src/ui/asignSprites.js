import { pokemonImageContainer } from "/src/script.js";

export function asignSprites(data) {
  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  img.alt = data.name;
  img.className = "pokemon-sprite";
  pokemonImageContainer.innerHTML = "";
  pokemonImageContainer.appendChild(img);
}
