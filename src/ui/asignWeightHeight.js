import { heightText, weightText } from "../script.js";

export function asignWeightHeight(data) {
  const height = data.height / 10;
  const weight = data.weight / 10;
  heightText.textContent = height + "M";
  weightText.textContent = weight + "KG";
}
