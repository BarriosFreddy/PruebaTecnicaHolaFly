const WookieePeople = require('./wookieePeople.js');
const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, lang) => {
    let people = null;
    if (lang == 'wookiee'){
        people = new WookieePeople(id);
    } else {
        people = new CommonPeople(id);
    }
    const peopleResult = await people.init();
    return peopleResult;
}

module.exports = { peopleFactory }