export function asignId(pokemon) {
  const pokemonNumber = document.getElementById("pokemon-number");
  if (pokemonNumber) {
    pokemonNumber.textContent = `#${pokemon.id}`;
  } else {
    console.error("Elemento pokemonNumber no encontrado");
  }
}
