import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import scroll from "../scroll animation.js"

import { circuitsBody1 } from './content/circuits.js'
import full_circuit from "./images/full_circuit.png"

const MPSProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={full_circuit} alt="a plastic box containing multiple breadboards and a bunch of wires"></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" data-text="theremin" id="theremin" onClick={scroll}>theremin</div>
                <div className="glyph psubtitle">class project for microprocessor systems - fall 2025</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#fef180"}}></Divider>
                <div className="geometric pbody">u i i a</div>
            </div>
        </div>

        <div className="gap"></div>
    </div>
}


export default MPSProject;