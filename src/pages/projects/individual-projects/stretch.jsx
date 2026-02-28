import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import scroll from "../scroll animation.js"

import { stretchBody1, stretchBody2, stretchBody3, stretchBody4, stretchBody5, stretchBody6, stretchBody7 } from './content/stretch.js'
import stretch_tour from "./images/stretch_tour.gif"
import NUC_1 from "./images/NUC_1.jpg"
import batteries from "./images/batteries.jpg"
import batteries_close from "./images/batteries_close.jpg"
import open_NUC from "./images/open_NUC.jpg"
import NUC_motherboard from "./images/NUC_motherboard.jpg"
import NUC_motherboard_closer from "./images/NUC_motherboard_closer.jpg"
import new_NUC from "./images/new_NUC.jpg"
import NUC_replacement from "./images/NUC_replacement.png"
import NUC_replaced from "./images/NUC_replaced.jpg"
import stretch from "./images/stretch.png"
import map from "./images/map.png"

const ResearchProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={stretch_tour} alt="A Hello Robot Stretch RE1 navigating a small room" style={{minWidth: "20vw"}}></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" data-text="greeter robot" id="greeter robot" onClick={scroll}>greeter robot</div>
                <div className="glyph psubtitle">research project - spring 2025 to present</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#b080fe"}}></Divider>
                <div className="geometric pbody">{stretchBody1}</div>
            </div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft">
                <div className="geometric pbody">{stretchBody2}</div>
                <div className="geometric pbody">{stretchBody3}</div>
            </div>
            <div className="pright pimg-container"><img className="pimg" src={NUC_1} alt="A disassembled robot"></img></div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" style={{marginRight: "1vw"}} src={batteries_close} alt="A close shot of the robot's internal electronics"></img></div>
            <div className="pright pimg-container"><img className="pimg" src={batteries} alt="The robot disassembled again"></img>
                <div className="geometric pbody">After we replaced the batteries, the robot worked for a few weeks beforeone day when it stopped turning on.</div>
            </div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft">
                <div className="geometric pbody">
                    {stretchBody4}
                    <br/><br/>
                    {stretchBody5}
                </div>
                <br/>
                <div className="pimg-container">
                    <img className="pimg" src={stretch} alt="the robot standing there, not doing anything"></img>
                </div>
            </div>

            <div className="pright"><ImageList variant="masonry" cols={2} gap={15}>
                <ImageListItem><img src={open_NUC} alt="an open Intel NUC"></img></ImageListItem>
                <ImageListItem><img src={NUC_motherboard} alt="a PCB from a NUC"></img></ImageListItem>
                <ImageListItem><img src={NUC_motherboard_closer} alt="a close shot of the NUC PCB. Part of it is burned"></img></ImageListItem>
                <ImageListItem><img src={new_NUC} alt="two NUCs side by side"></img></ImageListItem>
                <ImageListItem><img src={NUC_replacement} alt="a person (me, specifically) working on an open robot"></img></ImageListItem>
                <ImageListItem><img src={NUC_replaced} alt="the robot with internal electronics visible and connected to a tv in the background"></img></ImageListItem>
            </ImageList></div>
        </div>

        <div className="gap"></div>

        <div className="projects-container">
            <div className="pleft pimg-container">
                <img className="pimg" style={{marginRight: "1vw"}} src={map} alt="a lidar scan of a large room"></img>
                A lidar scan of the lab
            </div>
            <div className="pright geometric pbody">{stretchBody6}<br/><br/>{stretchBody7}</div>
        </div>

        <div className="gap"></div>

    </div>
}


export default ResearchProject;