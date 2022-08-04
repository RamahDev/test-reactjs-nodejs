import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/Menu">
                Menu
            </NavLink>
            <NavLink exact to="/">
                Home
            </NavLink>
            <NavLink exact to="/About">
                 About
            </NavLink>
            <NavLink exact to="/Contact">
                Contact
            </NavLink>
        </div>
    );
}

export default Navigation;
