import { fetchMoveDetails } from "/src/api/fetchMoveDetails.js";
import { createMoveElement } from "/src/ui/createMoveElement.js";

export function asignMoves(data) {
  const allMoves = data.moves;
  const eggMoves = allMoves.filter((move) =>
    move.version_group_details.some((detail) => detail.move_learn_method.name === "egg")
  );
  const otherMoves = allMoves.filter((move) =>
    move.version_group_details.every((detail) => detail.move_learn_method.name !== "egg")
  );

  let movementsContainer = document.getElementById("movements-container");
  movementsContainer.innerHTML = "";

  eggMoves.forEach(async (moveData) => {
    const move = await fetchMoveDetails(moveData.move.url);
    const moveElement = createMoveElement(move, "- Egg-Move");
    moveElement.classList.add("movement-item");
    movementsContainer.appendChild(moveElement);
  });
  otherMoves.forEach(async (moveData) => {
    const move = await fetchMoveDetails(moveData.move.url);
    const moveElement = createMoveElement(move, "");
    moveElement.classList.add("movement-item");
    movementsContainer.appendChild(moveElement);
  });
}
