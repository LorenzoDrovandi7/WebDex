import { showPokemon } from "/src/ui/showPokemon.js";
import { fetchPokemon } from "/src/api/fetchPokemon.js";

export async function loadPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
  const data = await response.json();

  const buttonContainer = document.querySelector(".button-selector");
  buttonContainer.innerHTML = "";

  data.results.forEach((pokemon) => {
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
