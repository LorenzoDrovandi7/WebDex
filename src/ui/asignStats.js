import { pokemonHp } from "../script.js";
import { pokemonAttack } from "../script.js";
import { pokemonDefense } from "../script.js";
import { pokemonSAttack } from "../script.js";
import { pokemonSDefense } from "../script.js";
import { pokemonSpeed } from "../script.js";

export function asignStats(data) {
  pokemonHp.innerHTML = `${data.stats[0].base_stat}`;
  pokemonAttack.innerHTML = `${data.stats[1].base_stat}`;
  pokemonDefense.innerHTML = `${data.stats[2].base_stat}`;
  pokemonSAttack.innerHTML = `${data.stats[3].base_stat}`;
  pokemonSDefense.innerHTML = `${data.stats[4].base_stat}`;
  pokemonSpeed.innerHTML = `${data.stats[5].base_stat}`;
}
