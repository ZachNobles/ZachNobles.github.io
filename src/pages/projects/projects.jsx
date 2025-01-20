import React from 'react'
import './projects.css'
import { IconButton, Tooltip, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import dofbot from "./images/dofbot_with_blocks.png"
import { r1Body } from "./content/robotics-1.js"

const Projects = () => {
    return <div className="page">
        <div id="projects-main-container">
            <Tooltip title="home" placement="right" style={{position: "absolute"}}>
                <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
            </Tooltip>

            <div className="projects-container">
                <p className="glyph pboth" style={{fontSize: "4rem", textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>projects</p>
            </div>
        </div>

        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap"></div>

        <div className="projects-container" style={{maxHeight:"50vh"}}>
            <div className="pleft" style={{width:"35vw", maxWidth:"50vw"}}>
                <div className="glyph ptitle">squares on squares on squares</div>
                <div className="glyph psubtitle">class project for robotics i</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#fe9580"}}></Divider>
                <div className="geometric pbody">{r1Body}</div>
            </div>
            <div className="pright pimg-container" style={{maxWidth:"50vw"}}><img className="pimg" src={dofbot} ></img></div>
        </div>
    </div>;
}

export default Projects;