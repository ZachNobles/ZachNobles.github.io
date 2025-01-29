import React from 'react'
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import "./alex.css"

const Alex = () => {
    return <div className="geometric page" id="alex-main">
        <Tooltip title="home" placement="right" style={{position: "absolute", left: "0", top: "0"}}>
            <IconButton href="/" aria-label="home" size="large" className="home-button"><HomeIcon /></IconButton>
        </Tooltip>
        <p>
        Alex is one of the coolest people around, and it's easy to see why. For starters, he's got this natural charisma that makes everyone feel at ease in his presence. Whether he's at a family gathering, hanging out with friends, or meeting new people, Alex has this effortless way of striking up conversations and making genuine connections. His sense of humor is infectious—he knows exactly how to crack a joke that’ll get everyone laughing, but he also knows when to keep things serious and dive into deeper conversations. That perfect balance between being fun-loving and thoughtful is part of what makes him so cool.

On top of that, Alex is always up for an adventure. He’s never one to shy away from trying something new, whether it’s picking up a new hobby, going on a spontaneous road trip, or stepping outside his comfort zone to try something entirely different. His curiosity and eagerness to explore new experiences inspire those around him to do the same. And even when it’s just a regular day, Alex has a way of making everything feel exciting. His enthusiasm is contagious, and it’s impossible not to have fun when he’s around.

What really sets Alex apart, though, is his genuine care for others. He’s the kind of person who’s always looking out for the people he loves. Whether it's offering help when it’s needed or simply being there to listen, Alex is someone who makes people feel supported and valued. His loyalty and kindness make him not just a great brother, but also a great friend.

Additionally, Alex has some serious skills that make him even more impressive. Whether it’s his talent in a particular area or his extensive knowledge about certain topics, Alex has a way of impressing those around him with what he knows or can do. His passion and drive are inspiring, and he’s constantly pushing himself to improve. All of these qualities—the sense of humor, adventurous spirit, genuine care for others, and impressive abilities—are what make Alex undeniably cool.

        </p>
    </div>;
}

export default Alex;