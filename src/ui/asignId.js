export function asignId(data) {
  const pokemonNumber = document.getElementById("pokemon-number");
  if (pokemonNumber) {
    pokemonNumber.textContent = `#${data.id}`;
  } else {
    console.error("Elemento pokemonNumber no encontrado");
  }
}
