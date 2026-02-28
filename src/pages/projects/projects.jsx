import React from 'react'
import './projects.css'
import { IconButton, Tooltip, Divider, Button, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';

import RoboticsProject from "./individual-projects/robotics1.jsx";
import EmbeddedProject from './individual-projects/embedded.jsx';
import ResearchProject from './individual-projects/stretch.jsx';
import MPSProject from "./individual-projects/theremin.jsx";

function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <div id="projects-menu" style={{width: "30vh", height: "inherit"}}>
            <div style={{margin: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                <a className="projects-menu-link" href="#microcontroller car" onClick={toggleDrawer(false)}>Microcontroller Car</a>
                <a className="projects-menu-link" href="#robotics I project" onClick={toggleDrawer(false)}>Robotics I Project</a>
                <a className="projects-menu-link" href="#greeter robot" onClick={toggleDrawer(false)}>Greeter Robot</a>
                <a className="projects-menu-link" href="#theremin" onClick={toggleDrawer(false)}>Theremin</a>
            </div>
        </div>
    );

    return (
        <div>
            <Tooltip title="menu" placement="right" style={{position: "absolute", marginTop: "2rem"}}>
                <IconButton onClick={toggleDrawer(true)} className="generic-icon-button" size="large"><TimelineIcon /></IconButton>
            </Tooltip>
            {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
            <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
            </Drawer>
        </div>
    );
}


const Projects = () => {
    return <div className="page">
        <div id="projects-main-container">
            <Tooltip title="home" placement="right" style={{position: "absolute"}}>
                <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
            </Tooltip>

            <TemporaryDrawer />

            <div className="projects-container">
                <p className="glyph pboth pointer no-highlight" id="projects-header" data-text="projects" onMouseDown={headerLoad}
                style={{fontSize: "4rem", textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>projects</p>
            </div>
        </div>

        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap"></div>

        <EmbeddedProject />
        <div className="gap" style={{height:"2vh"}}></div>
        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap" style={{height:"2vh"}}></div>

        <RoboticsProject />
        <div className="gap" style={{height:"2vh"}}></div>
        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap" style={{height:"2vh"}}></div>
        
        <ResearchProject />
        <div className="gap" style={{height:"2vh"}}></div>
        <Divider flexItem className="divider" style={{width: "inherit"}}/>
        <div className="gap" style={{height:"2vh"}}></div>

        <MPSProject />
        <Divider flexItem className="divider" style={{width: "inherit"}}/>

        <div className="projects-container exo" style={{textAlign:"center"}}><div className="pboth">more projects to come, but it takes me a while to track down all the images and write descriptions</div></div>
        <div className="gap" style={{height: "10vh"}}></div>
    </div>;
}


const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&";
function headerLoad() {
    let header = document.getElementById("projects-header")
    if (!header) return;
    
    let iterations = 0;
    var text = header.dataset.text;
    const interval = setInterval(() => {
        header.innerText = text.split("")
        .map((letter, index) => {
            if (index < (iterations ** 0.6) - 5) {
                return header.dataset.text[index];
            }
            return alphabet[Math.floor(Math.random() * 41)];
        }).join("")

        if (iterations >= 100) {
            clearInterval(interval);
            header.innerText = text
        }
        iterations++;
    }, 40)
}

window.onload = function() {
    headerLoad();
};


export default Projects;