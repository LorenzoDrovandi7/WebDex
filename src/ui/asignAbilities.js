export function asignAbilities(pokemon) {
  const abilitiesText = document.getElementById("abilities-text");
  if (!abilitiesText) return;

  abilitiesText.textContent = pokemon.getAbilitiesString();
}
