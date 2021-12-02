import React, {useEffect, useState} from "react";
import APIRequests from "../../services/APIRequests";
import getCharacters from "../../services/getCharacters";
import './styles.scss';
import TableCell from "./TableCell";

const {get} = APIRequests;

const Table = () => {
        const [characters, setCharacters] = useState([]);
        const [filteredCharacters, setFilteredCharacters] = useState([]);
        const [page, setPage] = useState('');
        const [name, setName] = useState('');
        const [activeSortType, setActiveSortByType] = useState({code: null, type: null});
        const [loading, setLoading] = useState(false);
        const [hideBtn, setHideBtn] = useState(false);
        let tableHeadingNames = [{name: 'Title', code: 'name'}, {name: 'Birth Year', code: 'birth_year'}, {
            name: 'Height', code: 'height'
        }, {name: 'Mass', code: 'mass'}]


        const loadMore = () => {
            setLoading(true);
            get(page)
                .then(({results: nextCharacters, next}) => {
                    setPage(next);
                    let list = [...characters, ...nextCharacters];
                    setCharacters(list);
                    setFilteredCharacters(list);
                    if (name) {
                        setFilteredCharacters(filter(list))
                    }
                    next === null ? setHideBtn(true) : setHideBtn(false);
                    setLoading(false);
                })
        };
        useEffect(() => {
            let cleanupFunction = false;
            getCharacters()
                .then(({results: characters, next}) => {
                    if (!cleanupFunction) {
                        setCharacters(characters || []);
                        setFilteredCharacters(characters || [])
                        setPage(next || null)
                    }
                })
            return () => {
                cleanupFunction = true
            }
        }, []);


        function filterByName(e) {
            e.preventDefault();
            if (name !== "") {
                setFilteredCharacters(filter(characters))
            }
        }

        function filter(list) {
            return list.filter(character => character.name.toLowerCase().includes(name.toLowerCase()))
        }

        function checkIsNaN(a) {
            return isNaN(a) ? a : +a
        }

        function sortByParams(column, type, list) {
            setActiveSortByType({code: column.code, type: type})
            setFilteredCharacters((list || filteredCharacters).sort(function (a, b) {
                a = checkIsNaN(a[column.code])
                b = checkIsNaN(b[column.code])

                if (a > b) {
                    return type === "asc" ? 1 : -1;
                }
                if (a < b) {
                    return type === "asc" ? -1 : 1;
                }
                return 0;
            }))
        }


        return (
            <div className='table'>
                <h2 className="table__title"> StarWars characters table info</h2>
                <form className="filter__block" id="comment-form"
                      onSubmit={e => {
                          filterByName(e)
                      }}>
                    <input type="text" placeholder='Type name here'
                           className="filter__input"
                           value={name}
                           onChange={(e => setName(e.target.value))}
                           name="name"/>
                    <button type='submit' className="filter__btn">Filter</button>
                </form>
                <div className="table__container">
                    <div className="table__row heading">
                        {tableHeadingNames.map(cell => {
                            return (
                                <TableCell data={cell} key={cell.name} heading={true} filter={sortByParams}
                                           activeSortType={activeSortType}/>
                            )
                        })}

                    </div>
                    {characters.length === 0
                        ?

                        <div className="loading">
                            <i className="fa fa-spinner fa-spin"/>
                        </div>

                        :
                        <>
                            {filteredCharacters.map(character => {
                                return (
                                    <TableCell data={character} key={character.name} heading={false}/>
                                )
                            })}
                        </>
                    }
                </div>
                <button className={`btn-loadMore ${hideBtn ? 'hidden' : ''}`} onClick={loadMore}>
                    {loading ? <i className="fa fa-spinner fa-spin"/> : ''}Load more
                </button>
            </div>
        )
    }
;
export default Table;
