export async function fetchEvolutionChain(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Evolution chain not found");
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
