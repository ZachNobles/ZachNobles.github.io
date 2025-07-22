import React from 'react'
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MiscNav from '../../components/Nav/miscnav';
import "./miscellaneous.css"

const Miscellaneous = () => {
    return <div className="geometric">
        <Tooltip title="home" placement="right" style={{position: "absolute", left: "0", top: "0"}}>
            <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
        </Tooltip>
        <div className="header" style={{alignSelf: "center"}}>
            <p className="glyph" id="misc-header">random stuff</p>
        </div>
        <div className="main-content">
            <MiscNav />
        </div>
    </div>;
}

export default Miscellaneous;