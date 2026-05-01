import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import { scroll } from "../scroll animation.js"

import { body1, body2 } from './content/circuits.js'
import full_circuit from "./images/full_circuit.png"
import schematic from "./images/schematic.png"
import transformer_cores from "./images/transformer_cores.jpg"
// import transformer_test from "./images/transformer_test.jpg"
import transformer from "./images/transformer.jpg"
import rectifier from "./images/rectifier.png"
import regulator from "./images/regulator.png"
import filter from "./images/filter.jpg"

const CircuitsProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={full_circuit} alt="a plastic box containing multiple breadboards and a bunch of wires"></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" data-text="air pressure monitor" id="air pressure monitor" onClick={scroll}>air pressure monitor</div>
                <div className="glyph psubtitle">class project, electric circuits - spring 2025</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#fef180"}}></Divider>
                <div className="geometric pbody">{body1}</div>
            </div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pboth pimg-container"><img src={schematic} className="pimg" alt = "LTSpice schematic of the circuit" style={{width: "100%"}}></img><i>finished schematic of the circuit</i></div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft pbody geometric">{body2}<br/><br/>Components of the circuit from left to right: the transformer we ended up using, the full bridge rectifier, the voltage regulator, and the low pass filter</div>
            <div className="pright pimg-container"><img className="pimg" src={transformer_cores} alt="two transformer cores, one wrapped loosely in wire"></img></div>
        </div>

        <div className="projects-container">
            <div>
            <ImageList variant="masonry" cols={4} gap={15}>
                <ImageListItem><img src={transformer} alt="a transformer"></img></ImageListItem>
                <ImageListItem><img src={rectifier} alt="a full bridge rectifier"></img></ImageListItem>
                <ImageListItem><img src={regulator} alt="a voltage regulator"></img></ImageListItem>
                <ImageListItem><img src={filter} alt="a low pass filter"></img></ImageListItem>
            </ImageList>
            </div>
        </div>

    </div>
}


export default CircuitsProject;