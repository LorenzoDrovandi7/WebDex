export function createEvolutionElement(name, sprite, level) {
  const evolutionElement = document.createElement("div");
  evolutionElement.classList.add("evolution-item");
  const img = document.createElement("img");
  img.src = sprite;
  img.alt = name;
  img.classList.add("evolution-sprite");
  const infoElement = document.createElement("p");
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  infoElement.textContent = level ? `${formattedName} (Level ${level})` : `${formattedName}`;
  infoElement.classList.add("evolution-text");
  evolutionElement.appendChild(img);
  evolutionElement.appendChild(infoElement);
  return evolutionElement;
}
