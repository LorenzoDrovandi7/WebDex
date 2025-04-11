import { pokemon } from "./classPokemon.js";
import { fetchEvolutionChain } from "./fetchEvolutionChain.js";

export async function fetchPokemon(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon not found");
    const pokemonData = await response.json();

    const speciesUrl = pokemonData.species.url;
    const speciesResponse = await fetch(speciesUrl);
    if (!speciesResponse.ok) throw new Error("Species not found");
    const speciesData = await speciesResponse.json();

    const poke = new pokemon(pokemonData);
    poke.setDescriptionFromSpeciesData(speciesData);

    const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
    poke.setEvolutionChain(evolutionData);

    return poke;
  } catch (error) {
    const pokemonImageContainer = document.getElementById("pokemon-image-container");
    if (pokemonImageContainer) {
      pokemonImageContainer.innerHTML = `<p id="error">Not found</p>`;
    }
    console.error(error);
  }
}
