import React from "react";
import {NavLink} from "react-router-dom";
import './styles.scss';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="option">
                <NavLink to="/home" activeclassname="selected">
                    Home
                </NavLink>
            </div>
            <div className="option">
                <NavLink to="/table" activeclassname="selected">
                    Table
                </NavLink>
            </div>
        </div>
    )
};
export default Sidebar;
