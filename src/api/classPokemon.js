export class pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.types = data.types.map((t) => t.type.name);
    this.height = data.height;
    this.weight = data.weight;
    this.abilities = data.abilities.map((a) => a.ability.name);
    this.stats = data.stats.map((stat) => stat.base_stat);
    this.moves = data.moves;
    this.captureRate = null;
    this.eggGroups = [];
    this.growthRate = "";
    this.generation = "";
    this.description = "";
    this.evolutionChain = null;
    this.stats = data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));
  }

  getFormattedName() {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  getHeightInMeters() {
    return `${this.height / 10} m`;
  }

  getWeightInKg() {
    return `${this.weight / 10} kg`;
  }

  getTypeString() {
    return this.types.join(" / ");
  }

  getAbilitiesString() {
    return this.abilities.join(", ");
  }

  getEggMoves() {
    return this.moves.filter((move) =>
      move.version_group_details.some((detail) => detail.move_learn_method.name === "egg")
    );
  }

  getOtherMoves() {
    return this.moves.filter((move) =>
      move.version_group_details.every((detail) => detail.move_learn_method.name !== "egg")
    );
  }

  getDescription(speciesData) {
    const entry = speciesData.flavor_text_entries.find((e) => e.language.name === "en");
    return entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "Description not available.";
  }

  setDescriptionFromSpeciesData(speciesData) {
    const flavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
    this.description = flavorTextEntry
      ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ")
      : "Description not available.";

    this.captureRate = speciesData.capture_rate;
    this.eggGroups = speciesData.egg_groups.map((g) => g.name);
    this.growthRate = speciesData.growth_rate.name;
    this.generation = speciesData.generation.name;
  }

  setDescriptionFromSpeciesData(speciesData) {
    const flavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
    this.description = flavorTextEntry
      ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ")
      : "Description not available.";

    this.captureRate = speciesData.capture_rate;
    this.eggGroups = speciesData.egg_groups.map((g) => g.name);
    this.growthRate = speciesData.growth_rate.name;
    this.generation = speciesData.generation.name;

    this.evolutionUrl = speciesData.evolution_chain.url;
  }

  setEvolutionChain(dataEvolution) {
    this.evolutionChain = dataEvolution;
  }
}
