import "./footer.css";
import Tooltip from '@mui/material/Tooltip';

const Footer = () => {
    return <div className="footer">
        <Tooltip title="My Github">
            <a href="https://github.com/ZachNobles" target="_blank" rel="noreferrer" id="github-link">
                <i className="fa fa-github" id="github-logo"></i>
            </a>
        </Tooltip>

        <Tooltip title="My Linkedin">
            <a href="https://www.linkedin.com/in/zachary-nobles/" target="_blank" rel="noreferrer" id="linkedin">
                <i class="fa fa-linkedin-square"></i
            ></a>
        </Tooltip>
    </div>;
}

export default Footer;