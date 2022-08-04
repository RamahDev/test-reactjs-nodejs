import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/menu">
                Menu
            </NavLink>
            <NavLink exact to="/">
                Home
            </NavLink>
            <NavLink exact to="/produit">
                Produit
            </NavLink>
            <NavLink exact to="/about">
                 About
            </NavLink>
            <NavLink exact to="/contact">
                Contact
            </NavLink>
            <NavLink exact to="/portfolio">
                Contact
            </NavLink>
            <NavLink exact to="/blogs">
                Blogs
            </NavLink>
        </div>
    );
}

export default Navigation;
