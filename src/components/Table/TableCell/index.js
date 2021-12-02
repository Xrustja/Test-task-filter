import React, {useEffect, useState} from "react";
import './styles.scss';

const TableCell = ({data, heading, filter, activeSortType}) => {
    const [active, setActive] = useState('');

    function activateSort(type) {
        filter(data, type)
    }

    useEffect(() => {
        if (activeSortType && activeSortType.code === data.code) {
            setActive(activeSortType.type);
        } else {
            setActive('');
        }
    }, [activeSortType])

    return (
        heading
            ?
            <div className="cell">
                <p className="cell__name">{data.name}</p>
                <div className="cell__filters">
                    <i className={`${(active === 'asc')
                        ? 'fas fa-caret-up active'
                        : 'fas fa-caret-up'}`}
                       onClick={() => activateSort('asc')}/>
                    <i className={`${(active === 'desc')
                        ? 'fas fa-caret-down active'
                        : 'fas fa-caret-down'}`}
                       onClick={() => activateSort('desc')}
                    />
                </div>
            </div>
            :
            <div className="table__row">
                <div className="cell">{data.name}</div>
                <div className="cell">{data.birth_year}</div>
                <div className="cell">{data.height}</div>
                <div className="cell">{data.mass}</div>
            </div>

    )
};
export default TableCell;
