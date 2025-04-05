import { fetchPokemonSprite } from "../api/fetchPokemonSprite.js";
import { createEvolutionElement } from "../ui/createEvolutionElement.js";

export async function asignEvolutions(data) {
  const evolutionsContainer = document.getElementById("evolution-container");
  if (!evolutionsContainer) return;

  evolutionsContainer.innerHTML = "";

  let queue = [{ species: data.chain.species, level: null, evolves_to: data.chain.evolves_to }];

  if (!data.chain.evolves_to || data.chain.evolves_to.length === 0) {
    evolutionsContainer.innerHTML = "<p class='no-evolution-text'>No evolutions available.</p>";
    return;
  }

  while (queue.length > 0) {
    const { species, level, evolves_to } = queue.shift();
    const sprite = (await fetchPokemonSprite(species.name)) || "https://example.com/default.png";
    const element = createEvolutionElement(species.name, sprite, level);
    evolutionsContainer.appendChild(element);

    if (!evolves_to || evolves_to.length === 0) continue;

    evolves_to.forEach((evolution) => {
      queue.push({
        species: evolution.species,
        level: evolution.evolution_details.length > 0 ? evolution.evolution_details[0].min_level : null,
        evolves_to: evolution.evolves_to,
      });
    });
  }
}
