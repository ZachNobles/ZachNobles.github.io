import React from 'react'

export function NavButton(link, label) {
    return(
        <a
        href={link}
        aria-label={label}
        className="NavButton"
        onMouseEnter={randomizeBackground}>
            <div className="buttonBackground">{label}</div>
        </a>
    );
}

function randomizeBackground(event) {
    let gradient = `linear-gradient(${Math.floor(Math.random() * 360)}deg, #6a19d5, #c0c0c0)`

    if (event.target.classList.contains("NavButton")) {
        event.target.style.backgroundImage = gradient;
    } else if (event.target.classList.contains("buttonBackground")) {
        event.target.parentElement.style.background = gradient;
    }
}