export async function fetchPokemon(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
