import APIRequests from "./APIRequests";

const {get} = APIRequests;

const getCharacters = async () => await get(`https://swapi.dev/api/people/`);

export default getCharacters;