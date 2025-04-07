import { asignAbilities } from "../ui/asignAbilities.js";
import { asignDescription } from "../ui/asignDescription.js";
import { asignEvolutions } from "../ui/asignEvolutions.js";
import { fetchPokemonSprite } from "../api/fetchPokemonSprite.js";
import { createEvolutionElement } from "../ui/createEvolutionElement.js";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("asignAbilities", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="abilities-text" data-testid="abilities-text"></div>`;
  });

  test("debe asignar correctamente las habilidades al elemento", () => {
    const mockData = {
      abilities: [{ ability: { name: "Overgrow" } }, { ability: { name: "Chlorophyll" } }],
    };

    asignAbilities(mockData);

    const abilitiesTextElement = screen.getByTestId("abilities-text");
    expect(abilitiesTextElement.innerHTML).toBe("Overgrow, Chlorophyll");
  });

  test("no hace nada si no encuentra el elemento #abilities-text", () => {
    const mockData = {
      abilities: [{ ability: { name: "Overgrow" } }, { ability: { name: "Chlorophyll" } }],
    };

    document.body.innerHTML = "";

    asignAbilities(mockData);

    expect(document.body.innerHTML).toBe("");
  });
});

describe("asignDescription", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="about-text" data-testid="about-text"></div>`;
  });

  test("debe asignar correctamente la descripción si hay texto en inglés", () => {
    const mockData = {
      flavor_text_entries: [
        { language: { name: "en" }, flavor_text: "A Pokémon with a long history." },
        { language: { name: "es" }, flavor_text: "Un Pokémon con una larga historia." },
      ],
    };

    asignDescription(mockData);

    const aboutTextElement = screen.getByTestId("about-text");
    expect(aboutTextElement).toHaveTextContent("A Pokémon with a long history.");
  });

  test("debe asignar un mensaje por defecto si no hay texto en inglés", () => {
    const mockData = {
      flavor_text_entries: [{ language: { name: "es" }, flavor_text: "Un Pokémon con una larga historia." }],
    };

    asignDescription(mockData);

    const aboutTextElement = screen.getByTestId("about-text");
    expect(aboutTextElement).toHaveTextContent("Description not available.");
  });

  test("debe eliminar saltos de línea y caracteres especiales", () => {
    const mockData = {
      flavor_text_entries: [{ language: { name: "en" }, flavor_text: "A Pokémon\nwith\nnewlines." }],
    };

    asignDescription(mockData);

    const aboutTextElement = screen.getByTestId("about-text");
    expect(aboutTextElement).toHaveTextContent("A Pokémon with newlines.");
  });

  test("no debe modificar el contenido de #about-text si no hay datos", () => {
    const mockData = { flavor_text_entries: [] };

    asignDescription(mockData);

    const aboutTextElement = screen.getByTestId("about-text");
    expect(aboutTextElement).toHaveTextContent("Description not available.");
  });
});

jest.mock("../api/fetchPokemonSprite.js");
jest.mock("../ui/createEvolutionElement.js");

describe("asignEvolutions", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div data-testid="evolution-container" id="evolution-container"></div>`;
    fetchPokemonSprite.mockResolvedValue("https://example.com/sprite.png");
    createEvolutionElement.mockReturnValue(document.createElement("div"));
  });

  test("no hace nada si no encuentra el contenedor de evoluciones", async () => {
    document.body.innerHTML = "";

    const mockData = {
      chain: {
        species: { name: "bulbasaur" },
        evolves_to: [{ species: { name: "ivysaur" }, evolves_to: [] }],
      },
    };

    await asignEvolutions(mockData);

    expect(fetchPokemonSprite).not.toHaveBeenCalled();
    expect(createEvolutionElement).not.toHaveBeenCalled();
  });

  test("debe añadir elementos de evolución al contenedor", async () => {
    const mockData = {
      chain: {
        species: { name: "bulbasaur" },
        evolves_to: [
          {
            species: { name: "ivysaur" },
            evolution_details: [{ min_level: 16 }],
            evolves_to: [
              {
                species: { name: "venusaur" },
                evolution_details: [{ min_level: 32 }],
                evolves_to: [],
              },
            ],
          },
        ],
      },
    };

    await asignEvolutions(mockData);

    const evolutionContainer = screen.getByTestId("evolution-container");
    expect(evolutionContainer).not.toBeEmptyDOMElement();
    expect(createEvolutionElement).toHaveBeenCalledTimes(3);
  });

  test("debe mostrar un mensaje si no hay evoluciones disponibles", async () => {
    const mockData = {
      chain: {
        species: { name: "bulbasaur" },
        evolves_to: [],
      },
    };

    await asignEvolutions(mockData);

    const evolutionContainer = screen.getByTestId("evolution-container");
    expect(evolutionContainer).toHaveTextContent("No evolutions available.");
  });

  test("debe llamar a fetchPokemonSprite y createEvolutionElement con los datos correctos", async () => {
    const mockData = {
      chain: {
        species: { name: "bulbasaur" },
        evolves_to: [
          {
            species: { name: "ivysaur" },
            evolution_details: [{ min_level: 16 }],
            evolves_to: [],
          },
        ],
      },
    };

    await asignEvolutions(mockData);

    expect(fetchPokemonSprite).toHaveBeenCalledWith("bulbasaur");
    expect(fetchPokemonSprite).toHaveBeenCalledWith("ivysaur");
    expect(createEvolutionElement).toHaveBeenCalledWith("bulbasaur", "https://example.com/sprite.png", null);
    expect(createEvolutionElement).toHaveBeenCalledWith("ivysaur", "https://example.com/sprite.png", 16);
  });
});

import { asignId } from "../ui/asignId";

describe("asignId", () => {
  test("debe asignar correctamente el id al elemento pokemon-number", () => {
    document.body.innerHTML = `<div id="pokemon-number"></div>`;

    const mockData = { id: 25 };
    asignId(mockData);

    const pokemonNumberElement = document.getElementById("pokemon-number");
    expect(pokemonNumberElement).toHaveTextContent("#25");
  });

  test("debe manejar el caso cuando el elemento pokemon-number no existe", () => {
    document.body.innerHTML = "";

    const mockData = { id: 25 };
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    asignId(mockData);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Elemento pokemonNumber no encontrado");

    consoleErrorSpy.mockRestore();
  });
});
