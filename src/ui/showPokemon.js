import { asignSprites } from "../ui/asignSprites.js";
import { asignName } from "../ui/asignName.js";
import { asignType } from "../ui/asignType.js";
import { asignId } from "../ui/asignId.js";
import { verifyTypesAmount } from "../ui/verifyTypesAmount.js";
import { asignStats } from "../ui/asignStats.js";
import { asignAbilities } from "../ui/asignAbilities.js";
import { asignWeightHeight } from "../ui/asignWeightHeight.js";
import { asignMoves } from "../ui/asignMoves.js";
import { asignDescription } from "../ui/asignDescription.js";
import { fetchPokemonSpecies } from "../api/fetchPokemonSpecies.js";
import { asignSpeciesData } from "../ui/asignSpeciesData.js";
import { fetchEvolutionChain } from "../api/fetchEvolutionChain.js";
import { asignEvolutions } from "../ui/asignEvolutions.js";

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
