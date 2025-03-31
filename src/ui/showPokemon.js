import { asignSprites } from "/src/ui/asignSprites.js";
import { asignName } from "/src/ui/asignName.js";
import { asignType } from "/src/ui/asignType.js";
import { asignId } from "/src/ui/asignId.js";
import { verifyTypesAmount } from "/src/ui/verifyTypesAmount.js";
import { asignStats } from "/src/ui/asignStats.js";
import { asignAbilities } from "/src/ui/asignAbilities.js";
import { asignWeightHeight } from "/src/ui/asignWeightHeight.js";
import { asignMoves } from "/src/ui/asignMoves.js";
import { asignDescription } from "/src/ui/asignDescription.js";
import { fetchPokemonSpecies } from "/src/api/fetchPokemonSpecies.js";
import { asignSpeciesData } from "/src/ui/asignSpeciesData.js";
import { fetchEvolutionChain } from "/src/api/fetchEvolutionChain.js";
import { asignEvolutions } from "/src/ui/asignEvolutions.js";

export async function showPokemon(data, pokemon) {
  asignSprites(data);
  asignName(data);
  asignType(data);
  asignId(data);
  verifyTypesAmount(data);
  asignStats(data);
  asignAbilities(data);
  asignWeightHeight(data);
  asignMoves(data);
  const dataSpecies = await fetchPokemonSpecies(pokemon);
  asignDescription(dataSpecies);
  asignSpeciesData(dataSpecies);
  const evolutionChainUrl = dataSpecies.evolution_chain.url;
  const dataEvolution = await fetchEvolutionChain(evolutionChainUrl);
  asignEvolutions(dataEvolution);
}
