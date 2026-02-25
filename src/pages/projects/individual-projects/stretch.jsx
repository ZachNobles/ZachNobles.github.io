import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import scroll from "../scroll animation.js"

import { circuitsBody1 } from './content/circuits.js'
import stretch_tour from "./images/stretch_tour.gif"

const ResearchProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={stretch_tour} alt="A Hello Robot Stretch RE1 navigating a small room" style={{minWidth: "20vw"}}></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" data-text="greeter robot" onClick={scroll}>greeter robot</div>
                <div className="glyph psubtitle">research project - spring 2025 to present</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#b080fe"}}></Divider>
                <div className="geometric pbody">{circuitsBody1}</div>
            </div>
        </div>

        <div className="gap"></div>

        {/* <div className="projects-container">
            <div className="pboth pimg-container"><img src={schematic} className="pimg" alt = "LTSpice schematic of the circuit" style={{width: "100%"}}></img><i>finished schematic of the circuit</i></div>
        </div> */}
    </div>
}


export default ResearchProject;