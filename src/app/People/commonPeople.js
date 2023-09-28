const PeopleService = require("../db/services/peopleService");
const { genericRequest } = require("../swapiFunctions");
const AbstractPeople = require("./abstractPeople");

class CommonPeople extends AbstractPeople {
  constructor(id) {
    super();
    this.id = id;
  }

  async init() {
    const people = await PeopleService.getInstance().findById(this.id);
    if (!people.detail) {
      this.name = people.name;
      this.mass = people.mass;
      this.height = people.height;
      this.homeworldName = (
        await genericRequest(people.homeworld, "GET", null, false)
      ).name;
      this.homeworlId = people.homeworld.match(
        AbstractPeople.PLANET_ID_REGEX
      )[3];
      return this;
    }
    return null;
  }
}

module.exports = CommonPeople;
