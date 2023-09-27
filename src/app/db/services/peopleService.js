const db = require("../../db/index");
const { genericRequest } = require("../../swapiFunctions");

class PeopleService {
  static peopleServiceInstance;
  static getInstance() {
    if (!this.peopleServiceInstance) {
      this.peopleServiceInstance = new PeopleService();
    }
    return this.peopleServiceInstance;
  }

  async findById(id) {
    let person = await db.swPeople.findOne({
      where: {
        id,
      },
    });
    if (!person) {
      console.log("Retrieving data from external source...");
      person = await genericRequest(
        "https://swapi.dev/api/people/" + id,
        "GET",
        null,
        false
      );
      if (person) db.swPeople.create(person);
    }
    return person;
  }
}

module.exports = PeopleService;
