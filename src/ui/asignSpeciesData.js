import { captureRateText, eggGroupText, growthRateText, generationText } from "../script.js";

export function asignSpeciesData(pokemon) {
  captureRateText.textContent = `${pokemon.captureRate}%`;
  eggGroupText.textContent = pokemon.eggGroups.join(", ");
  growthRateText.textContent = pokemon.growthRate;
  generationText.textContent = pokemon.generation;
}
