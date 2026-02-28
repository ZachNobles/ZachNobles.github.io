import React from 'react'
import { Divider } from "@mui/material"
import scroll from "../scroll animation.js"

import { body1, body2, body3, body4 } from './content/theremin.js'
import theremin from "./images/theremin.jpg"
import theremin_video from "./images/theremin.mp4"
import theremin_circuitry from "./images/theremin_circuitry.jpg"
import capacitive_sensor from "./images/capacitive_sensor.jpg"

const MPSProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft">
                <div className="glyph ptitle no-highlight pointer" data-text="theremin" id="theremin" onClick={scroll}>theremin</div>
                <div className="glyph psubtitle">class project for microprocessor systems - fall 2025</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#8bfe80"}}></Divider>
                <div className="geometric pbody">{body1}</div>
            </div>
            <div className="pright pimg-container"><video className="pimg" src={theremin_video} alt="a homemade theremin in a cardboard box being played" controls></video></div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft pimg-container">
                <img className="pimg" src={capacitive_sensor} alt="a breadboard with a capacitive sensor" style={{height: "30rem"}}></img>
            </div>
            <div className="pright geometric pbody">
                {body2}
                <br/><br/>
                {body3}
                <br/><br/>
                {body4}
            </div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft pimg-container">
                <img className="pimg" src={theremin_circuitry} alt="various breadboards, two microcontrollers, a speaker, and a bunch of wires" style={{height: "30rem", marginRight: "1vw"}}></img>
            </div>
            <div className="pright pimg-container">
                <img className="pimg" src={theremin} alt="a homemade theremin in a cardboard box" style={{height: "30rem"}}></img>
            </div>
        </div>

        <div className="gap"></div>
    </div>
}


export default MPSProject;