import React from 'react';
import "./assembly_line.css";
import Icon from '@mui/material/Icon';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const arm = () => {
    return(
        <div className="arm">
            <div className="arm-link-01">
                <div className="arm-link-12">
                    <div className="arm-link-23">
                        <div className="arm-gripper-left-1">
                            <div className="arm-gripper-left-2"></div>
                        </div>
                        <div className="arm-gripper-right-1">
                            <div className="arm-gripper-right-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Arm = () => (
    <div className="arm-container">
        <div className="assembly-line">
            <div className="belt"></div>
        </div>
        <div className="assembly-line-side" />
        {arm()}

        <div className="box" id="box-1">
            <div className="box-inner">
                <Icon className="box-icon" component={PrecisionManufacturingIcon} />
            </div>
        </div>
        <div className="box" id="box-2">
            <div className="box-inner">
                <Icon className="box-icon" component={PrecisionManufacturingIcon} />
            </div>
        </div>
    </div>
);

export default Arm;
