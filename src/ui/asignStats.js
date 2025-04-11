import { pokemonHp, pokemonAttack, pokemonDefense, pokemonSAttack, pokemonSDefense, pokemonSpeed } from "../script.js";

export function asignStats(pokemon) {
  pokemon.stats.forEach((stat) => {
    switch (stat.name) {
      case "hp":
        pokemonHp.textContent = stat.value;
        break;
      case "attack":
        pokemonAttack.textContent = stat.value;
        break;
      case "defense":
        pokemonDefense.textContent = stat.value;
        break;
      case "special-attack":
        pokemonSAttack.textContent = stat.value;
        break;
      case "special-defense":
        pokemonSDefense.textContent = stat.value;
        break;
      case "speed":
        pokemonSpeed.textContent = stat.value;
        break;
    }
  });
}
