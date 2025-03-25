const pokemonInput = document.getElementById("pokemon-input");
const searchButton = document.getElementById("search-button");
const pokemonImageContainer = document.getElementById("pokemon-image-container");
const pokemonTypeContainer = document.getElementById("pokemon-type-container");
let pokemonName = document.getElementById("pokemon-name");
let pokemonType = document.getElementById("pokemon-type");
let pokemonNumber = document.getElementById("pokemon-number");
let pokemonHp = document.getElementById("hp-text");
let pokemonAttack = document.getElementById("attack-text");
let pokemonDefense = document.getElementById("defense-text");
let pokemonSAttack = document.getElementById("s-attack-text");
let pokemonSDefense = document.getElementById("s-defense-text");
let pokemonSpeed = document.getElementById("speed-text");
let abilitiesText = document.getElementById("abilities-text");
let aboutText = document.getElementById("about-text");
let weightText = document.getElementById("weight-text");
let heightText = document.getElementById("height-text");
let captureRateText = document.getElementById("capture-rate-text");
let eggGroupText = document.getElementById("egg-group-text");
let growthRateText = document.getElementById("growth-rate-text");
let generationText = document.getElementById("generation-text");

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json();
    asignSprites(data);
    asignName(data);
    asignType(data);
    asignId(data);
    verifyTypesAmount(data);
    asignStats(data);
    asignAbilities(data);
    asignWeightHeight(data);
    asignMoves(data);
    fetchPokemonSpecies(pokemon);
  } catch (error) {
    pokemonImageContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

async function fetchPokemonSpecies(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Description not found");
    }
    const data = await response.json();
    asignDescription(data);
    asignSpeciesData(data);
    const evolutionChainUrl = data.evolution_chain.url;
    fetchEvolutionChain(evolutionChainUrl);
  } catch (error) {
    pokemonAbout.innerHTML += `<p>${error.message}</p>`;
  }
}

function asignSprites(data) {
  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  img.alt = data.name;
  img.className = "pokemon-sprite";
  pokemonImageContainer.innerHTML = "";
  pokemonImageContainer.appendChild(img);
}

function asignName(data) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokemonName.textContent = name;

  // Eliminar clases anteriores
  pokemonName.classList.remove("pokemon-name-extra-small", "pokemon-name-small");

  // Aplicar la clase según la longitud del nombre
  if (name.length > 15) {
    pokemonName.classList.add("pokemon-name-extra-small");
  } else if (name.length > 10) {
    pokemonName.classList.add("pokemon-name-small");
  }
}

function asignType(data) {
  pokemonTypeContainer.innerHTML = "";
  const typeOne = data.types[0].type.name;
  const typeOneCapitalized = typeOne.charAt(0).toUpperCase() + typeOne.slice(1);
  const firstType = document.createElement("p");
  firstType.textContent = typeOneCapitalized;
  firstType.className = "pokemon-type-" + typeOne;
  firstType.id = "type-1";
  pokemonTypeContainer.appendChild(firstType);
  if (data.types.length > 1) {
    const typeTwo = data.types[1].type.name;
    const typeTwoCapitalized = typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1);
    const secondType = document.createElement("p");
    secondType.textContent = typeTwoCapitalized;
    secondType.className = "pokemon-type-" + typeTwo;
    secondType.id = "type-2";
    pokemonTypeContainer.appendChild(secondType);
  }
}

function asignId(data) {
  pokemonNumber.textContent = `#${data.id}`;
}

function verifyTypesAmount(data) {
  const typeOne = document.getElementById("type-1");
  const typeTwo = document.getElementById("type-2");
  if (data.types.length > 1) {
    typeOne.classList.add("one-of-two");
    typeTwo.classList.add("two-of-two");
  } else {
    typeOne.classList.remove("one-of-two");
  }
}

function asignStats(data) {
  pokemonHp.innerHTML = `${data.stats[0].base_stat}`;
  pokemonAttack.innerHTML = `${data.stats[1].base_stat}`;
  pokemonDefense.innerHTML = `${data.stats[2].base_stat}`;
  pokemonSAttack.innerHTML = `${data.stats[3].base_stat}`;
  pokemonSDefense.innerHTML = `${data.stats[4].base_stat}`;
  pokemonSpeed.innerHTML = `${data.stats[5].base_stat}`;
}

function asignAbilities(data) {
  const abilities = data.abilities.map((ability) => ability.ability.name).join(", ");
  abilitiesText.textContent = abilities;
}

function asignDescription(speciesData) {
  aboutText.innerHTML = "";
  const flavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
  let description = flavorTextEntry ? flavorTextEntry.flavor_text : "Description not available.";
  description = description.replace(/\n|\f/g, " ");
  aboutText.innerHTML += `<p>${description}</p>`;
}

function asignWeightHeight(data) {
  const height = data.height / 10;
  const weight = data.weight / 10;
  heightText.textContent = height + "M";
  weightText.textContent = weight + "KG";
}

function asignSpeciesData(data) {
  const captureRate = data.capture_rate;
  const eggGroups = data.egg_groups.map((group) => group.name).join(", ");
  const growthRate = data.growth_rate.name;
  const generation = data.generation.name;
  captureRateText.textContent = captureRate + "%";
  eggGroupText.textContent = eggGroups;
  growthRateText.textContent = growthRate;
  generationText.textContent = generation;
}

function asignMoves(data) {
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

async function fetchMoveDetails(url) {
  const response = await fetch(url);
  const move = await response.json();
  return move;
}

function createMoveElement(move, additionalText) {
  const moveElement = document.createElement("p");
  const moveName = move.name.charAt(0).toUpperCase() + move.name.slice(1);
  const type = move.type.name.charAt(0).toUpperCase() + move.type.name.slice(1);
  const damageClass = move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1);

  moveElement.textContent = `${moveName} - ${damageClass} - ${type} ${additionalText}`;

  return moveElement;
}

async function fetchEvolutionChain(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Evolution chain not found");
    }
    const data = await response.json();
    asignEvolutions(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function asignEvolutions(data) {
  let evolutionsContainer = document.getElementById("evolution-container");
  evolutionsContainer.innerHTML = "";

  let currentEvolution = data.chain;

  if (!currentEvolution.evolves_to || currentEvolution.evolves_to.length === 0) {
    // Si no hay evoluciones, mostramos un mensaje o simplemente no hacemos nada
    evolutionsContainer.innerHTML = "<p class=no-evolution-text>No evolutions available.</p>";
    return;
  }

  const initialPokemonName = currentEvolution.species.name;
  const initialPokemonSprite = await fetchPokemonSprite(initialPokemonName);
  const initialPokemonElement = createEvolutionElement(initialPokemonName, initialPokemonSprite, null);
  evolutionsContainer.appendChild(initialPokemonElement);

  while (currentEvolution.evolves_to.length > 0) {
    for (let evolution of currentEvolution.evolves_to) {
      const evolutionName = evolution.species.name;
      const evolutionLevel = evolution.evolution_details.length > 0 ? evolution.evolution_details[0].min_level : null;

      const evolutionSprite = await fetchPokemonSprite(evolutionName);
      const evolutionElement = createEvolutionElement(evolutionName, evolutionSprite, evolutionLevel);
      evolutionsContainer.appendChild(evolutionElement);

      currentEvolution = evolution;
    }
  }
}

async function fetchPokemonSprite(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
  const data = await response.json();
  return data.sprites.front_default;
}

function createEvolutionElement(name, sprite, level) {
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

document.addEventListener("DOMContentLoaded", () => {
  loadPokemonList();
});

async function loadPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
  const data = await response.json();

  const buttonContainer = document.querySelector(".button-selector");
  buttonContainer.innerHTML = "";

  data.results.forEach((pokemon) => {
    const button = document.createElement("button");
    button.classList.add("pokemon-button");
    button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.setAttribute("data-pokemon", pokemon.name);

    button.addEventListener("click", async (event) => {
      const pokemonName = event.target.getAttribute("data-pokemon");
      await fetchPokemon(pokemonName);
    });

    buttonContainer.appendChild(button);
  });
}

searchButton.onclick = function () {
  const pokemon = pokemonInput.value.trim();
  if (pokemon) {
    fetchPokemon(pokemon);
  }
};
