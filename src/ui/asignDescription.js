import { aboutText } from "../script.js";

export function asignDescription(pokemon) {
  aboutText.innerHTML = "";

  if (!pokemon.description) {
    aboutText.innerHTML = "<p>Description not available.</p>";
    return;
  }

  aboutText.innerHTML = `<p>${pokemon.description}</p>`;
}
