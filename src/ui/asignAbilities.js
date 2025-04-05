export function asignAbilities(data) {
  const abilitiesText = document.getElementById("abilities-text");
  if (!abilitiesText) return;

  const abilities = data.abilities.map((ability) => ability.ability.name).join(", ");
  abilitiesText.textContent = abilities;
}
