import { captureRateText, eggGroupText, growthRateText, generationText } from "/src/script.js";

export function asignSpeciesData(data) {
  const captureRate = data.capture_rate;
  const eggGroups = data.egg_groups.map((group) => group.name).join(", ");
  const growthRate = data.growth_rate.name;
  const generation = data.generation.name;
  captureRateText.textContent = captureRate + "%";
  eggGroupText.textContent = eggGroups;
  growthRateText.textContent = growthRate;
  generationText.textContent = generation;
}
