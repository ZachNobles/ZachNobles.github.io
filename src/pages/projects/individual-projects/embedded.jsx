import React from 'react'
import { Divider } from "@mui/material"
import { embeddedBody1, embeddedBody2, embeddedBody3, embeddedBody4, embeddedBody5 } from './content/embedded.js'
import scroll from "../scroll animation.js"
import car from "./images/beep beep.png"
import potentiometers from "./images/potentiometers.png"
import wheels_spinning from "./images/wheels_spinning.gif"
import compass_still from "./images/compass_still.png"

const EmbeddedProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container" style={{maxWidth: "100vw"}}><img className="pimg" src={car} alt="microcontroller car"></img>
            </div>
            <div className = "pright">
                <div className="glyph ptitle no-highlight pointer" data-text="microcontroller car" onClick={scroll}>microcontroller car</div>
                <div className="glyph psubtitle">class project for embedded control - fall 2024</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#95191e"}}></Divider>
                <div className="geometric pbody">{embeddedBody1}</div>
            </div>
        </div>

        <div className="projects-container">
            <div className="pleft pbody">
                {embeddedBody2}
                <div className="pimg-container">
                    <img className="pimg" src={wheels_spinning} alt="wheels spinning" style={{maxHeight: "20rem"}}></img>
                </div>
            </div>
            <div className="pright pimg-container">
                <img className="pimg" src={potentiometers} alt="car wired to a breadboard with potentiometers"></img>
            </div>
        </div>

        <div className="projects-container">
            <div className="pleft pimg-container">
                <img className="pimg" src={compass_still} style={{height: "30rem"}} alt="car with a wired controller"></img>
            </div>
            <div className="pright pbody">
                {embeddedBody3}
                <br/><br/>
                {embeddedBody4}
                <br/><br/>
                {embeddedBody5}
            </div>
        </div>
    </div>
}

export default EmbeddedProject;