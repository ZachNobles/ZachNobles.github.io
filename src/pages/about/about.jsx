import React from 'react'
import "./about.css"
import me from "../../images/me.jpg"
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { aboutBody1, aboutBody2, aboutBody3 } from "./about-body";


const About = () => {
    return <div className="page">
        <div id="about-container">
        <Tooltip title="home" placement="right" style={{position: "absolute"}}>
            <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
        </Tooltip>
            <div className="glyph" id="about-header">
                About Me
                <div className="about-body geometric"  style={{paddingTop: "1rem"}}>
                    {aboutBody1}<br/><br/>{aboutBody2}<br/><br/>{aboutBody3}
                </div>
            </div>
            <div id="about-img" style={{backgroundImage: `url(${me})`, borderRadius: "0.25rem", marginTop:"1rem"}}>
                <figcaption style={{display: "none"}}>
                    Photo taken by Daniel Collins, ca. 2024
                </figcaption>
            </div>
            <div id="extracurriculars">
                <p className="glyph">extracurriculars</p>
                Pep Band<br/>The Forge (a student-run 3D printer lab)<br/>Rensselaer Union Student Senate<br/>Senate Academic Affairs Committee<br/>Senate Student Life Committee<br/>Senate Webtech Group<br/>
                ECSE Undergraduate Student Council<br/>Robotics Club<br/>Class of 2027 Council<br/>Mercer Lab Research Group<br/>RPI Student Advisory Council<br/>Alcohol, Other Drugs, and Hazing Advisory Committee
            </div>

            <div id="skills">
                <p className="glyph">skills</p>
                Python, Java, C++, C<br/>
                HTML, CSS, Javascript, Typescript, React<br/>
                data structures and algorithms<br/>
                Git and GitHub<br/>
                OpenCV<br/>
                MATLAB<br/>
                LTSpice & circuit design<br/>
                embedded systems<br/>
                STM32 microcontrollers<br/>
                computer aided design, Fusion 360, Siemens NX<br/>
                ROS2, RVIZ, Gazebo<br/>
                robot kinematics
            </div>

            <div id="about-website">
                <p className="glyph">About this website</p>
                <p className="exo">This website was made 
                    with <a className="no-link-styling link" href="https://react.dev/" aria-label="React">React</a>
                    &nbsp;and <a className="no-link-styling link" href="https://mui.com/" aria-label="MUI">MUI</a>
                    . You can look at the source 
                    code <a className="no-link-styling link" href="https://github.com/ZachNobles/ZachNobles.github.io" aria-label="GitHub repo">here</a>
                    &nbsp;if you really want to.
                </p>
            </div>
        </div>
    </div>;
}

export default About;