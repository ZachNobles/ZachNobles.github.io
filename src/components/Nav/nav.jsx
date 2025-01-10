import { NavButton } from "./button";
import "./nav.css"

const Nav = () => {
    return <div id="nav">
        {NavButton("about", "sss")}
    </div>;
}

export default Nav;