import React from 'react';
import { IconButton, Tooltip, Drawer, Switch, Slider, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Menu() {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(() => {
        const saved = localStorage.getItem("backgroundVisible");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [accentColor, setAccentColor] = React.useState(() => {
        const saved = localStorage.getItem("accentColor");
        return saved !== null ? saved : getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    });

    const getHue = (color) => {
        if (!color || color === "") return 0;

        // Use a temporary canvas context or element to force the browser 
        // to convert any string (Hex, Name, HSL) into RGB
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = color;
        const computed = ctx.fillStyle; // Always returns #rrggbb

        // Convert Hex to RGB numbers
        const r = parseInt(computed.substring(1, 3), 16) / 255;
        const g = parseInt(computed.substring(3, 5), 16) / 255;
        const b = parseInt(computed.substring(5, 7), 16) / 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h;
        const d = max - min;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                default: h=0; break;
            }
            h /= 6;
        }

        return Math.round(h * 360);
    };

    const getColor = (hue) => {
        return `hsl(${hue}, 100%, 50%)`;
    };


    React.useEffect(() => {
        localStorage.setItem("backgroundVisible", JSON.stringify(checked));

        document.documentElement.style.setProperty("--accent", accentColor);
        localStorage.setItem("accentColor", accentColor);
        
        const art = document.querySelector(".bg-art");
        if (art) {
            art.style.visibility = checked ? "visible" : "hidden";
        }
        window.dispatchEvent(new Event("accentColorChanged"));
    }, [checked, accentColor]);

    const resetToDefault = () => {
        document.documentElement.style.removeProperty("--accent");

        const defaultValue = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim();

        setAccentColor(defaultValue);
        localStorage.setItem("accentColor", defaultValue);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleSwitch = (event) => {
        setChecked(event.target.checked);
    };

    const DrawerList = (
        <div className="drawer" style={{width: "30vh", height: "inherit"}}>
            <div style={{margin: "2rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center"}}>
                <div style={{marginBottom: "1rem"}}>
                    Background
                    <Switch 
                        checked={checked} 
                        onChange={toggleSwitch}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                            color: accentColor, // Thumb color when checked
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: accentColor, // Track color when checked
                            }
                        }}
                    />
                </div>

                <Divider flexItem className="divider" style={{width: "100%"}}/>

                <div>
                    Accent Color
                    <Tooltip title="reset to original" placement="right">
                        <IconButton onClick={resetToDefault} className="generic-icon-button" size="large"><RestartAltIcon /></IconButton>
                    </Tooltip>
                </div>
                <div style={{width: "100%"}}>
                    <Slider
                        min={0}
                        max={360}
                        value={getHue(accentColor)}
                        onChange={(event, newValue) => {
                            setAccentColor(getColor(newValue));
                        }}
                        sx={{
                            color: accentColor
                        }}
                    />
                </div>

                <div className="exo"
                    style={{marginTop: "-1rem", fontSize: "0.6rem", textAlign: "center", display: "flex", flexFlow: "row wrap", alignItems: "center"}}>
                    <p onClick={() => window.location.reload()} className="pointer">Refresh</p>
                    &nbsp;to apply to some backgrounds
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

export default Menu;