import { abilitiesText } from "/src/script.js";

export function asignAbilities(data) {
  const abilities = data.abilities.map((ability) => ability.ability.name).join(", ");
  abilitiesText.textContent = abilities;
}
