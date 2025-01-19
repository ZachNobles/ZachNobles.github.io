import React from 'react'
import { NavButton } from "./button";
import "./nav.css"

const Nav = () => {
    return <div id="nav">
        {NavButton("#/projects", "projects")}
        {NavButton("#/about", "about")}
        {NavButton("#/nothing here yet", "nothing here yet")}
        {NavButton("#/nothing here yet", "nothing here yet")}
    </div>;
}

export default Nav;