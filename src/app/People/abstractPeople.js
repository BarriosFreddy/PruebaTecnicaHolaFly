class AbstractPeople {
  static PLANET_ID_REGEX = /(.*)(planets\/)(\d{0,})(.*)/;
  constructor(id) {
    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async init() {
    throw new Error("To be implemented");
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMass() {
    return this.mass;
  }

  getHeight() {
    return this.height;
  }

  getHomeworldName() {
    return this.homeworldName;
  }

  getHomeworlId() {
    return this.homeworlId;
  }

  getWeightOnPlanet(planetId) {
    throw new Error("To be implemented");
  }
}

module.exports = AbstractPeople;
