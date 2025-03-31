import { showPokemon } from "/src/ui/showPokemon.js";
import { fetchPokemon } from "/src/api/fetchPokemon.js";

export function displayPokemonButtons(pokemonList) {
  const buttonContainer = document.querySelector(".button-selector");
  buttonContainer.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    const button = document.createElement("button");
    button.classList.add("pokemon-button");
    button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.setAttribute("data-pokemon", pokemon.name);
    button.addEventListener("click", async (event) => {
      const pokemon = event.target.getAttribute("data-pokemon");
      const data = await fetchPokemon(pokemon);
      showPokemon(data, pokemon);
    });
    buttonContainer.appendChild(button);
  });
}
