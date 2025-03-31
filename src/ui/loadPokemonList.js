import { displayPokemonButtons } from "/src/ui/displayPokemonButtons.js";

export async function loadPokemonList() {
  let storedList = localStorage.getItem("pokemonList");
  if (storedList) {
    storedList = JSON.parse(storedList);
    displayPokemonButtons(storedList);
  } else {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
    const data = await response.json();
    localStorage.setItem("pokemonList", JSON.stringify(data.results));
    displayPokemonButtons(data.results);
  }
}
