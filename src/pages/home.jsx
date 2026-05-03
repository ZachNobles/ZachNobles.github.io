import React from 'react'
import Header from "../components/Header/header"
import Footer from "../components/Footer/footer"
import Nav from "../components/Nav/nav"
import Traces from "../components/Art/traces"
import { IconButton, Tooltip, Divider, Drawer, Switch } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

function Menu() {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(() => {
        const saved = localStorage.getItem("backgroundVisible");
        return saved !== null ? JSON.parse(saved) : true;
    });

    React.useEffect(() => {
        localStorage.setItem("backgroundVisible", JSON.stringify(checked));
        
        const traces = document.querySelector(".traces");
        if (traces) {
            traces.style.visibility = checked ? "visible" : "hidden";
        }
    }, [checked]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleSwitch = (event) => {
        setChecked(event.target.checked);
    };

    const DrawerList = (
        <div className="drawer" style={{width: "30vh", height: "inherit"}}>
            <div style={{margin: "2rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center"}}>
                <div>
                    Background
                    <Switch 
                        checked={checked} 
                        onChange={toggleSwitch}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                            color: getComputedStyle(document.body).getPropertyValue("--accent").trim(), // Thumb color when checked
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: getComputedStyle(document.body).getPropertyValue("--accent").trim(), // Track color when checked
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Tooltip title="menu" placement="right" style={{position: "absolute"}}>
                <IconButton onClick={toggleDrawer(true)} className="generic-icon-button settings" size="large"><SettingsIcon /></IconButton>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
            </Drawer>
        </div>
    );
}

const Home = () => {
    return <div>
        <Traces />
        <Menu />
        <Header /> 
        <div className = "main-content">
            <Nav />
        </div>
        <Footer />
    </div>;
}

export default Home;