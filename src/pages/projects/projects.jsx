import React from 'react'
import './projects.css'
import { IconButton, Tooltip, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import RoboticsProject from "./individual-projects/robotics1.jsx";

const Projects = () => {
    return <div className="page">
        <div id="projects-main-container">
            <Tooltip title="home" placement="right" style={{position: "absolute"}}>
                <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
            </Tooltip>

            <div className="projects-container">
                <p className="glyph pboth pointer no-highlight" id="projects-header" data-text="projects" onMouseDown={headerLoad}
                style={{fontSize: "4rem", textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>projects</p>
            </div>
        </div>

        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap"></div>

        <RoboticsProject />

        <div className="gap"></div>
        <Divider flexItem className="divider" style={{width: "inherit"}}/>

        <div className="projects-container exo" style={{textAlign:"center"}}><div className="pboth">more projects to come, but it takes me a while to track down all the images and write descriptions</div></div>
        <div className="gap"></div>
        <div className="gap"></div>
    </div>;
}


const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&";
function headerLoad(event) {
    let iterations = 0;

    const interval = setInterval(() => {
        var text = event.target.dataset.text;
        event.target.innerText = text.split("")
        .map((letter, index) => {
            if (index < (iterations ** 0.6) - 5) {
                return event.target.dataset.text[index];
            }
            return alphabet[Math.floor(Math.random() * 41)];
        }).join("")

        if (iterations >= 100) {
            clearInterval(interval);
            event.target.innerText = text
        }
        iterations++;
    }, 40)
}


export default Projects;