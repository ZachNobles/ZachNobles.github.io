import React from "react";
import "./assembly_line.css"

const AssemblyLine = () => {
    return <div className="assembly-line-container">
        <div className="assembly-line">
            <div className="belt"></div>
        </div>
        <div className="assembly-line-side" />

        <div className="arm">
            <div className="arm-base"></div>
                <div className="arm-link-container">
                    <div className="arm-link">
                        <div class="link-face-front"></div>
                        <div class="link-face-right"></div>
                    </div>
                </div>

        </div>
    </div>;
}

export default AssemblyLine;