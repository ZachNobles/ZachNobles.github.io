import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import { scroll_binary } from "../scroll animation.js"

import { body1 } from './content/SRP1.js'
import studio from "./images/studio.jpg"

const SRP1Project = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={studio} alt="a production studio with a lot of faders and a few speakers"></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" data-text="binary data" onClick={scroll_binary}>binary data</div>
                <div className="glyph psubtitle">class project for sound recording & production i - spring 2025</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#80a8fe"}}></Divider>
                <div className="geometric pbody">{body1} <a className="no-link-styling link" href="https://www.youtube.com/watch?v=bU0FliX_p9s">Binary Data Volume IV</a>
                    {" "}inspired by the
                </div>
            </div>
        </div>

        <div className="projects-container">
            <div></div>
        </div>
    </div>
}


export default SRP1Project;