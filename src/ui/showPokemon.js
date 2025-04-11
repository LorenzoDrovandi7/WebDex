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
import { asignSpeciesData } from "../ui/asignSpeciesData.js";
import { asignEvolutions } from "../ui/asignEvolutions.js";

export async function showPokemon(pokemon) {
  asignSprites(pokemon);
  asignName(pokemon);
  asignType(pokemon);
  asignId(pokemon);
  verifyTypesAmount(pokemon);
  asignStats(pokemon);
  asignAbilities(pokemon);
  asignWeightHeight(pokemon);
  asignMoves(pokemon);
  asignDescription(pokemon);
  asignSpeciesData(pokemon);
  asignEvolutions(pokemon.evolutionChain);
}
