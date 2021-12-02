import axios from 'axios';
import getCharacters from "./getCharacters";

jest.mock('axios');

const mockedData = {
    "results": [
        {
            "name": "Luke Skywalker",
            "birth_year": "123",
            "height": "172",
            "mass": "77"
        },
        {
            "name": "C-3PO",
            "birth_year": "123",
            "height": "167",
            "mass": "75"
        }]
};

beforeEach(() => {
    axios.get.mockResolvedValue({data: mockedData})
});

test('should fetch data', () => {
    getCharacters().then(data => expect(data).toEqual(mockedData));
})
