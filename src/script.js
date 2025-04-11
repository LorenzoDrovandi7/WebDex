import { fetchPokemon } from "../src/api/fetchPokemon.js";
import { showPokemon } from "../src/ui/showPokemon.js";
import { loadPokemonList } from "../src/ui/loadPokemonList.js";
import { pokemon } from "../src/api/classPokemon.js";

const pokemonInput = document.getElementById("pokemon-input");
const searchButton = document.getElementById("search-button");
export const pokemonImageContainer = document.getElementById("pokemon-image-container");
export const pokemonTypeContainer = document.getElementById("pokemon-type-container");
export let pokemonName = document.getElementById("pokemon-name");
export let pokemonNumber = document.getElementById("pokemon-number");
export let pokemonHp = document.getElementById("hp-text");
export let pokemonAttack = document.getElementById("attack-text");
export let pokemonDefense = document.getElementById("defense-text");
export let pokemonSAttack = document.getElementById("s-attack-text");
export let pokemonSDefense = document.getElementById("s-defense-text");
export let pokemonSpeed = document.getElementById("speed-text");
export let abilitiesText = document.getElementById("abilities-text");
export let aboutText = document.getElementById("about-text");
export let weightText = document.getElementById("weight-text");
export let heightText = document.getElementById("height-text");
export let captureRateText = document.getElementById("capture-rate-text");
export let eggGroupText = document.getElementById("egg-group-text");
export let growthRateText = document.getElementById("growth-rate-text");
export let generationText = document.getElementById("generation-text");

document.addEventListener("DOMContentLoaded", () => {
  loadPokemonList();
  searchButton.onclick = async function () {
    const clickedPokemon = pokemonInput.value.trim();
    if (clickedPokemon) {
      try {
        await fetchPokemon(clickedPokemon);
        showPokemon(pokemon);
      } catch (error) {
        pokemonImageContainer.innerHTML = `<p id="error">${error.message}</p>`;
      }
    }
  };
});
