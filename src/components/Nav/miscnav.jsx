import React from 'react'
import { NavButton } from "./button";
import "./nav.css"

const MiscNav = () => {
    return <div id="nav">
        {NavButton("scrabble", "scrabble score keeper")}
    </div>;
}

export default MiscNav;