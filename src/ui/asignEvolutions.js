import { fetchPokemonSprite } from "/src/api/fetchPokemonSprite.js";
import { createEvolutionElement } from "/src/ui/createEvolutionElement.js";

export async function asignEvolutions(data) {
  let evolutionsContainer = document.getElementById("evolution-container");
  evolutionsContainer.innerHTML = "";

  let currentEvolution = data.chain;

  if (!currentEvolution.evolves_to || currentEvolution.evolves_to.length === 0) {
    evolutionsContainer.innerHTML = "<p class=no-evolution-text>No evolutions available.</p>";
    return;
  }

  const initialPokemonName = currentEvolution.species.name;
  const initialPokemonSprite = await fetchPokemonSprite(initialPokemonName);
  const initialPokemonElement = createEvolutionElement(initialPokemonName, initialPokemonSprite, null);
  evolutionsContainer.appendChild(initialPokemonElement);

  while (currentEvolution.evolves_to.length > 0) {
    for (let evolution of currentEvolution.evolves_to) {
      const evolutionName = evolution.species.name;
      const evolutionLevel = evolution.evolution_details.length > 0 ? evolution.evolution_details[0].min_level : null;

      const evolutionSprite = await fetchPokemonSprite(evolutionName);
      const evolutionElement = createEvolutionElement(evolutionName, evolutionSprite, evolutionLevel);
      evolutionsContainer.appendChild(evolutionElement);

      currentEvolution = evolution;
    }
  }
}
