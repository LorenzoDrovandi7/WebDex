export async function fetchPokemon(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    return await response.json();
  } catch {
    const pokemonImageContainer = document.getElementById("pokemon-image-container");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Not found";
    errorMessage.id = "error";
    pokemonImageContainer.innerHTML = "";
    pokemonImageContainer.appendChild(errorMessage);
  }
}
