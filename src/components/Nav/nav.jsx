import React from 'react'
import { NavButton } from "./button";
import "./nav.css"

const Nav = () => {
    return <div id="nav">
        {NavButton("projects", "projects")}
        {NavButton("about", "about")}
        {NavButton("miscellaneous", "misc.")}
    </div>;
}

export default Nav;