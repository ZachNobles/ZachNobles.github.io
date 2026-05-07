import React from 'react'
import { NavButton } from "./button";
import "./nav.css"

const Nav = () => {
    return <div id="nav">
        {NavButton("projects", "Projects")}
        {NavButton("about", "About")}
        {NavButton("miscellaneous", "Misc.")}
    </div>;
}

export default Nav;