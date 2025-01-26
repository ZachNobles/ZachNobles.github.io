import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import scroll from "../scroll animation.js"
import { r1Body, r1Body2, r1Body3, r1Body4, r1Body5, r1Body6, r1Body7, r1Body8 } from "./content/robotics-1.js"

import dofbot_with_blocks from "./images/dofbot_with_blocks.png"
import dofbot_fk from "./images/dofbot_fk.png"
import dofbot_fk2 from "./images/dofbot_fk2.png"
import matlab_arm from "./images/matlab_arm.png"
import block_stack from "./images/block_stack.png"
import blocks1 from "./images/blocks1.png"
import blocks2 from "./images/blocks2.png"
import blocks3 from "./images/blocks3.png"
import blocks4 from "./images/blocks4.png"
import blocks5 from "./images/blocks5.png"
import blocks6 from "./images/blocks6.png"
import blocks7 from "./images/blocks7.png"
import blocks8 from "./images/blocks8.png"
import blocks_final from "./images/blocks_final.png"
import project_finished from "./images/finished.png"

const RoboticsProject = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft">
                <div className="glyph ptitle no-highlight pointer" data-text="squares on squares on squares" onClick={scroll}>squares on squares on squares</div>
                <div className="glyph psubtitle">class project for robotics i</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#fe9580"}}></Divider>
                <div className="geometric pbody">{r1Body}</div>
            </div>
            <div className="pright pimg-container"><img className="pimg" src={dofbot_with_blocks} alt="robot arm with colored blocks"></img></div>
        </div>

        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={dofbot_fk} alt = "robot arm posed at an angle"></img>{r1Body2}</div>
            <div className="pright pbody pimg-container"><img className="pimg" src={dofbot_fk2} alt = "robot arm posed at a different angle"></img></div>
        </div>

        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={matlab_arm} alt = "robot arm posed at an angle"></img></div>
            <div className="pright pbody pimg-container">{r1Body3}<br/><br/><br/>{r1Body4}</div>
        </div>

        <div className="projects-container">
            <div className="pleft pbody"><div className="glyph psubtitle">interesting part</div>{r1Body5}</div>
            <div className="pright pimg-container"><img className="pimg" src={block_stack} alt = "stack of colored blocks"></img></div>
        </div>

        <div className="projects-container">
            <div className="pleft"><ImageList variant="masonry" cols={2} gap={8}>
            <ImageListItem><img src={blocks7} alt="colored blocks on a white background"></img></ImageListItem>
            <ImageListItem><img src={blocks1} alt="a blue block wildly mislabeled by the program"></img></ImageListItem>
            <ImageListItem><img src={blocks3} alt="blocks; the red and yellow are located"></img></ImageListItem>
            <ImageListItem><img src={blocks4} alt="pixelated red and yellow blocks"></img></ImageListItem>
            <ImageListItem><img src={blocks5} alt="blocks with (wrong) dots to indicate their locations"></img></ImageListItem>
            <ImageListItem><img src={blocks2} alt="a very pixelated block"></img></ImageListItem>
            <ImageListItem><img src={blocks6} alt="a red, yellow, and green block"></img></ImageListItem>
            <ImageListItem><img src={blocks8} alt="4 blocks with 2 correctly located"></img></ImageListItem>
            </ImageList></div>
            <div className="pright pbody">{r1Body6}<br/><br/><br/>{r1Body7}
                <div className="pimg-container"><img className="pimg" src={blocks_final} alt="four blocks with colored dots to label them" style={{height: "15rem"}}></img></div>
            </div>
        </div>

        <div className="projects-container">
            <div className="pboth pbody">{r1Body8}</div>
        </div>

        <div className="projects-container">
            <div className="gap"></div>
            <div className="pboth pimg-container"><img className="pimg" src={project_finished} style={{width: "100%"}} alt="the arm with a (somewhat precarious) stack of blocks"></img></div>
        </div>
    </div>
}


export default RoboticsProject;