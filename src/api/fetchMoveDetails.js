export async function fetchMoveDetails(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error");
    }
    const move = await response.json();
    return move;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
