export function createMoveElement(move, additionalText) {
  const moveElement = document.createElement("p");
  const moveName = move.name.charAt(0).toUpperCase() + move.name.slice(1);
  const type = move.type.name.charAt(0).toUpperCase() + move.type.name.slice(1);
  const damageClass = move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1);

  moveElement.textContent = `${moveName} - ${damageClass} - ${type} ${additionalText}`;

  return moveElement;
}
