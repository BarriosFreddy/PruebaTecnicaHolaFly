const PeopleService  = require("../../app/db/services/peopleService");
const PlanetService = require("../../app/db/services/planetService");

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const { id } =  req.params
        if(Number.isNaN(+id) || +id < 0) return res.status(400).send({ message: "The ID must be a valid number"})
        const people = await PeopleService.getInstance().findById(id);
        res.status(200).send(people)
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
      const { id } =  req.params
      if(Number.isNaN(+id) || +id < 0) return res.status(400).send({ message: "The ID must be a valid number"})
      const planet = await PlanetService.getInstance().findById(id);
      res.status(200).send(planet);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;