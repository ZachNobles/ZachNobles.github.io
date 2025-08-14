import React from 'react'
import { NavButton } from "./button";
import "./nav.css"

const MiscNav = () => {
    return <div id="nav">
        {NavButton("scrabble", "scrabble score keeper")}
        {NavButton("binary", "RPI logo binary encoder")}
    </div>;
}

export default MiscNav;