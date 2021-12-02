import '@testing-library/jest-dom'
import axios from "axios";
import renderer, {act} from "react-test-renderer";
import Table from "./index";

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

test('component renders correctly', async () => {
    let table;
    await act(async () => {
        table = renderer.create(<Table/>);
    })
    expect(table.toJSON()).toMatchSnapshot();
})
