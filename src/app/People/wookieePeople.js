const PeopleService = require("../db/services/peopleService");
const { genericRequest } = require("../swapiFunctions");
const AbstractPeople = require("./abstractPeople");

class WookieePeople extends AbstractPeople {
  constructor(id) {
    super();
    this.id = id;
  }

  async init() {
    const people = await PeopleService.getInstance().findById(this.id, true);
    if (!people.detail) {
      this.name = people.whrascwo;
      this.mass = people.scracc;
      this.height = people.acwoahrracao;
      const planetId = people.acooscwoohoorcanwa.match(
        /(.*)(akanrawhwoaoc\/)(\d{0,})(.*)/
      )[3];
      this.homeworldName = (
        await genericRequest(
          `https://swapi.dev/api/planets/${planetId}?format=wookiee`,
          "GET",
          null,
          false
        )
      ).whrascwo;
      this.homeworlId = planetId;
      return this;
    }
    return null;
  }
}

module.exports = WookieePeople;
