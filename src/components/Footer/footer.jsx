import React from 'react'
import "./footer.css";
import Tooltip from '@mui/material/Tooltip';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import pkg from '../../../package.json';

const Footer = () => {
    return <div className="footer">
        <Tooltip title="My Github">
            <a href="https://github.com/ZachNobles" target="_blank" rel="noreferrer" id="github-link">
                <i className="fa fa-github" id="github-logo"></i>
            </a>
        </Tooltip>

        <Tooltip title="My Linkedin">
            <a href="https://www.linkedin.com/in/zachary-nobles/" target="_blank" rel="noreferrer" id="linkedin">
                <i className="fa fa-linkedin-square"></i>
            </a>
        </Tooltip>

        <Tooltip title="Email">
            <a href="mailto:zachnobles@outlook.com" target="_blank" rel="noreferrer" id="email" style={{display:"flex", placeItems:"center"}}>
                <MailOutlineIcon fontSize="large"/>
            </a>
        </Tooltip>
        <p className="glyph" style={{ position: "absolute", right: "1vw", bottom: "0vh", fontSize: "0.5rem" }}>v{pkg.version}</p>
    </div>;
}

export default Footer;