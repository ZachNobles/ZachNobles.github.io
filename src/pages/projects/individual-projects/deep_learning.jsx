import React from 'react'
import { Divider, ImageList, ImageListItem } from "@mui/material"
import { scroll } from "../scroll animation.js"

import { body1, body2, body3, body4, body5, body6, body7 } from './content/deep_learning.js'
import weights from "./images/weights.png"
import digit1 from "./images/digit1.png"
import digit2 from "./images/digit2.png"
import digit3 from "./images/digit3.png"
import digit4 from "./images/digit4.png"
import digit5 from "./images/digit5.png"
import digit6 from "./images/digit6.png"
import digit7 from "./images/digit7.png"
import digit8 from "./images/digit8.png"
import digit9 from "./images/digit9.png"
import digit10 from "./images/digit10.png"
import cifar10 from "./images/cifar-10.png"
import filters from "./images/filters.png"
import bleu_scores from "./images/bleu_scores.png"

const DeepLearningProjects = () => {
    return <div>
        <div className="projects-container">
            <div className="pleft pimg-container"><img className="pimg" src={weights} alt="a color-coded graph of weights for a neural network"></img></div>
            <div className="pright">
                <div className="glyph ptitle no-highlight pointer" id="deep-learning" data-text="various ai models" onClick={scroll}>various ai models</div>
                <div className="glyph psubtitle">class project, intro to deep learning - spring 2025</div>
                <Divider variant="middle" flexItem className="pdivider" style={{backgroundColor: "#80febd"}}></Divider>
                <div className="geometric pbody">{body1}<br/><br/>{body2}</div>
            </div>
        </div>

        <div className="projects-container pboth">
            <ImageList variant="masonry" cols={5} gap={8}>
                <ImageListItem><img src={digit1} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit2} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit3} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit4} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit5} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit6} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit7} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit8} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit9} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
                <ImageListItem><img src={digit10} alt="a color-coded graph of weights for a neural network"></img></ImageListItem>
            </ImageList>
        </div>

        <div className="projects-container">
            <div className="pleft pbody geometric">
                {body3}<br/><br/>{body4}<br/><br/>{body5}<br/><br/>
                "A girl playing in all water fountain."<br/><br/>
                "A woman is blowing a walk in a grassy field."<br/><br/>
                "A woman holds a large check out the " free hugs ."<br/>
                (The quotation mark in the middle was part of it)
            </div>
            <div className="pright pimg-container">
                <img className="pimg" src={cifar10} alt="10 rows of images categorized into airplane, automobile, bird, and such"></img>
                <div className="gap"></div>
                <img className="pimg" src={filters} alt="filters for a convolutional layer. I genuinely don't know how to describe these. If you're blind, I'm sorry. They look like blurry squares of varying colors. Each one is 5x5 pixels."></img>
            </div>
        </div>

        <div className="projects-container">
            <div className="pleft pimg-container">
                <img className="pimg" src={bleu_scores} alt="a graph of bleu scores (a way of measuring accuracy) over epochs (how many times the model was trained)"></img>
            </div>
            <div className="pright pbody geomtric">
                {body6}<br/><br/>{body7}
            </div>
        </div>
    </div>
}


export default DeepLearningProjects;