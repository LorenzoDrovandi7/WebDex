import { aboutText } from "/src/script.js";

export function asignDescription(speciesData) {
  aboutText.innerHTML = "";
  const flavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
  let description = flavorTextEntry ? flavorTextEntry.flavor_text : "Description not available.";
  description = description.replace(/\n|\f/g, " ");
  aboutText.innerHTML += `<p>${description}</p>`;
}
