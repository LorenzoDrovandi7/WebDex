export async function fetchPokemonSpecies(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Description not found");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
