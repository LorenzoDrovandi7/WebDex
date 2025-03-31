export async function fetchMoveDetails(url) {
  const response = await fetch(url);
  const move = await response.json();
  return move;
}
