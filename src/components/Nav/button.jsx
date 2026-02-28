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
    const accent = getComputedStyle(document.body).getPropertyValue("--accent").trim();
    const accent2 = getComputedStyle(document.body).getPropertyValue("--accent2").trim();
    let gradient = `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${accent}, ${accent2})`

    if (event.target.classList.contains("NavButton")) {
        event.target.style.backgroundImage = gradient;
    } else if (event.target.classList.contains("buttonBackground")) {
        event.target.parentElement.style.background = gradient;
    }
}