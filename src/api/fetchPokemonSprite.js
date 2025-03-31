export async function fetchPokemonSprite(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
  const data = await response.json();
  return data.sprites.front_default;
}
