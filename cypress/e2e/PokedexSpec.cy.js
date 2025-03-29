describe("Pokédex App", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("should display Pokémon selection buttons", () => {
    cy.get(".pokemon-button").should("have.length.greaterThan", 0);
  });

  it("should display Pokémon details and stats when selected", () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?limit=1010").as("getPokemon");
    cy.wait("@getPokemon");
    cy.get(".pokemon-button").first().click();
    cy.get("#pokemon-name").should("not.have.text", "...");
    cy.get("#pokemon-image-container img").should("have.attr", "src").should("include", "pokemon");
    cy.get("#hp-text").should("not.be.empty");
    cy.get("#attack-text").should("not.be.empty");
    cy.get("#defense-text").should("not.be.empty");
    cy.get("#speed-text").should("not.be.empty");
    cy.get("#special-attack-text").should("not.be.empty");
    cy.get("#special-defense-text").should("not.be.empty");
    cy.get("#pokemon-type").should("not.be.empty");
    cy.get("#pokemon-abilities").should("not.be.empty");
  });

  it("should search for Pokémon by name", () => {
    cy.get("#pokemon-input").type("pikachu");
    cy.get("#search-button").click();
    cy.get("#pokemon-name").should("have.text", "Pikachu");
    cy.get("#hp-text").should("not.be.empty");
    cy.get("#attack-text").should("not.be.empty");
    cy.get("#defense-text").should("not.be.empty");
  });

  it("should display error message when Pokémon is not found", () => {
    cy.get("#pokemon-input").type("nonexistentpokemon");
    cy.get("#search-button").click();
    cy.get("#error").should("have.text", "Not found");
    cy.get("#pokemon-image-container").should("not.have.descendants");
  });
  it("should search for Pokémon by number", () => {
    cy.get("#pokemon-input").type("25");
    cy.get("#search-button").click();
    cy.get("#pokemon-name").should("have.text", "Pikachu");
  });
  it("should display the correct Pokémon type", () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?limit=1010").as("getPokemon");
    cy.wait("@getPokemon");
    cy.get("#pokemon-input").type("squirtle");
    cy.get("#search-button").click();
    cy.get("#type-1").should("have.text", "Water");
  });
});
