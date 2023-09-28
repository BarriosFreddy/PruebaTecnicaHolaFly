const { peopleFactory } = require("../../app/People");
const AbstractPeople = require("../../app/People/abstractPeople");
const Planet = require("../../app/Planet/Planet");
const PeopleService = require("../../app/db/services/peopleService");
const PlanetService = require("../../app/db/services/planetService");

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == "wookiee") {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {
  server.get("/hfswapi/test", async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      "https://swapi.dev/api/",
      "GET",
      null,
      true
    );
    res.send(data);
  });
  server.get("/hfswapi/getPeople/:id", async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(+id) || +id < 0)
      return res.status(400).send({ message: "The ID must be a valid number" });
    let people = await peopleFactory(id, req.query.format);
    res.status(200).send(people);
  });
  server.get("/hfswapi/getPlanet/:id", async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(+id) || +id < 0)
      return res.status(400).send({ message: "The ID must be a valid number" });
    let planet = new Planet(id);
    const planetResult = await planet.init();
    res.status(200).send(planetResult);
  });
  server.get("/hfswapi/getWeightOnPlanetRandom", (req, res) =>
    getWeightOnPlanetRandom(app, req, res)
  );
  server.get("/hfswapi/getLogs", async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;

/**
 * Calculates the weight on a different planet
 * @param {*} app
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getWeightOnPlanetRandom(app, req, res) {
  const { personId, planetId } = req.query;
  if (!personId)
    return res.status(400).send("You're missing the personId value");
  if (!planetId)
    return res.status(400).send("You're missing the planetId value");
  const personPlanetData = await Promise.all([
    PeopleService.getInstance().findById(personId),
    PlanetService.getInstance().findById(planetId),
  ]);
  let [
    {
      mass: personMass,
      name: personName,
      homeworld,
      detail: personErrorDetail,
    } = {},
    {
      gravity: planetGravity,
      name: planetName,
      detail: planetErrorDetail,
    } = {},
  ] = personPlanetData;
  if (personErrorDetail)
    return res
      .status(404)
      .send({ message: "Person not found", error: personErrorDetail });
  if (planetErrorDetail)
    return res
      .status(404)
      .send({ message: "Planet not found", error: planetErrorDetail });
  if (homeworld.match(AbstractPeople.PLANET_ID_REGEX)[3] === planetId)
    return res.status(400).send({
      error: "It's not allowed to calculate the weight in the home world",
    });
  let weightOnPlanet = null;
  if (typeof planetGravity === "string") {
    const gravityAsArrayString = planetGravity.split(" ");
    if (gravityAsArrayString.length > 1)
      planetGravity = +gravityAsArrayString.shift();
  }
  if (Number.isNaN(+personMass))
    return res
      .status(404)
      .send({ message: "The mass value must be a valid number", personMass });
  if (Number.isNaN(+planetGravity))
    return res.status(404).send({
      message: "The gravity value must be a valid number",
      planetGravity,
    });
  if (personMass && planetGravity) {
    weightOnPlanet = app.swapiFunctions.getWeightOnPlanet(
      personMass,
      planetGravity
    );
  }
  res.status(200).send({
    personName,
    personMass,
    planetName,
    planetGravity,
    weightOnPlanet,
  });
}
