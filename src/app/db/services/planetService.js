const db = require("../../db/index");
const { genericRequest } = require("../../swapiFunctions");

class PlanetService {
  static planetServiceInstance;
  static getInstance() {
    if (!this.planetServiceInstance) {
      this.planetServiceInstance = new PlanetService();
    }
    return this.planetServiceInstance;
  }

  async findById(id) {
    let planet = await db.swPlanet.findOne({
      where: {
        id,
      },
    });
    if (!planet) {
      console.log("Retrieving data from external source...");
      planet = await genericRequest(
        "https://swapi.dev/api/planets/" + id,
        "GET",
        null,
        false
      );
      if (planet) db.swPlanet.create(planet);
    }
    return planet;
  }
}

module.exports = PlanetService;
