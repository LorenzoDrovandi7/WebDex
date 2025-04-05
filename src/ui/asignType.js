import { pokemonTypeContainer } from "../script.js";

export function asignType(data) {
  pokemonTypeContainer.innerHTML = "";
  const typeOne = data.types[0].type.name;
  const typeOneCapitalized = typeOne.charAt(0).toUpperCase() + typeOne.slice(1);
  const firstType = document.createElement("p");
  firstType.textContent = typeOneCapitalized;
  firstType.className = "pokemon-type-" + typeOne;
  firstType.id = "type-1";
  pokemonTypeContainer.appendChild(firstType);
  if (data.types.length > 1) {
    const typeTwo = data.types[1].type.name;
    const typeTwoCapitalized = typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1);
    const secondType = document.createElement("p");
    secondType.textContent = typeTwoCapitalized;
    secondType.className = "pokemon-type-" + typeTwo;
    secondType.id = "type-2";
    pokemonTypeContainer.appendChild(secondType);
  }
}
