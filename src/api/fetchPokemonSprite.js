export async function fetchPokemonSprite(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("No se pudo obtener el sprite");
    const data = await res.json();
    return data.sprites.front_default;
  } catch (error) {
    console.error("Error al obtener sprite de", name, error);
    return null;
  }
}
