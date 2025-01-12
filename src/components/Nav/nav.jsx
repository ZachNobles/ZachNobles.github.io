import { NavButton } from "./button";
import "./nav.css"

const Nav = () => {
    return <div id="nav">
        {NavButton("projects", "projects")}
        {NavButton("about", "about")}
        {NavButton("coming soon", "nothing here yet")}
        {NavButton("coming soon", "nothing here yet")}
    </div>;
}

export default Nav;