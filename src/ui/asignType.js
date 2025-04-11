import { pokemonTypeContainer } from "../script.js";

export function asignType(pokemon) {
  pokemonTypeContainer.innerHTML = "";

  const typeOne = pokemon.types[0];
  const typeOneCapitalized = typeOne.charAt(0).toUpperCase() + typeOne.slice(1);
  const firstType = document.createElement("p");
  firstType.textContent = typeOneCapitalized;
  firstType.className = "pokemon-type-" + typeOne;
  firstType.id = "type-1";
  pokemonTypeContainer.appendChild(firstType);

  if (pokemon.types.length > 1) {
    const typeTwo = pokemon.types[1];
    const typeTwoCapitalized = typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1);
    const secondType = document.createElement("p");
    secondType.textContent = typeTwoCapitalized;
    secondType.className = "pokemon-type-" + typeTwo;
    secondType.id = "type-2";
    pokemonTypeContainer.appendChild(secondType);
  }
}
