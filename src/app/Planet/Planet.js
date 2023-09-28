const PlanetService = require("../db/services/planetService");

class Planet {
  constructor(id) {
    this.id = id;
  }

  async init() {
    const { detail, name, gravity } =
      (await PlanetService.getInstance().findById(this.id)) || {};
    if (!detail) {
      this.name = name;
      this.gravity = gravity;
      return this;
    }
    return null;
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = Planet;
