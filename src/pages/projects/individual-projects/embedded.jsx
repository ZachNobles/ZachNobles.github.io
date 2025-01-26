import React from 'react'
import { Divider } from "@mui/material"
import { embeddedBody1 } from './content/embedded.js'
import scroll from "../scroll animation.js"
import car from "./images/beep beep.png"

const EmbeddedProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container" style={{maxWidth: "100vw"}}><img className="pimg" src={car} alt="microcontroller car"></img>
            </div>
            <div className = "pright">
                <div className="glyph ptitle no-highlight pointer" data-text="microcontroller car" onClick={scroll}>microcontroller car</div>
                <div className="glyph psubtitle">class project for embedded control</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#95191e"}}></Divider>
                <div className="geometric pbody">{embeddedBody1}</div>
            </div>
        </div>
    </div>
}

export default EmbeddedProject;