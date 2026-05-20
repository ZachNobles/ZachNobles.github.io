import React from "react";
import "./assembly_line.css"

const AssemblyLine = () => {
    return <div className="assembly-line-container">
        <div className="assembly-line">
            <div className="belt"></div>
        </div>
        <div className="assembly-line-side" />

        <div className="arm">
            <div className="arm-base">
                <div className="arm-link-container" id="link0-1">
                    <div className="arm-link" id="link0-1-inner">
                        <div className="link-face link-face-front"></div>
                        <div className="link-face link-face-right"></div>
                        <div className="link-face link-face-top"></div>


                        <div className="arm-link-container" id="link1-2">
                            <div className="arm-link" id="link1-2-inner">
                                <div className="link-face link-face-front"></div>
                                <div className="link-face link-face-right"></div>
                                <div className="link-face link-face-top"></div>


                                <div className="arm-link-container" id="link2-3">
                                    <div className="arm-link" id="link2-3-inner">
                                        <div className="link-face link-face-front"></div>
                                        <div className="link-face link-face-right"></div>
                                        <div className="link-face link-face-top"></div>


                                        <div className="arm-link-container" id="gripper-base">
                                            <div className="arm-link" id="gripper-base-inner">
                                                <div className="link-face link-face-front"></div>
                                                <div className="link-face link-face-right"></div>
                                                <div className="link-face link-face-top"></div>
                                                <div className="link-face link-face-bottom gripper-base-bottom"></div>


                                                <div className="arm-link-container" id="gripper-left">
                                                    <div className="arm-link" id="gripper-left-inner">
                                                        <div className="link-face link-face-front"></div>
                                                        <div className="link-face gripper-face-back"></div>
                                                        <div className="link-face link-face-right gripper-face-right"></div>
                                                        <div className="link-face link-face-top gripper-face-top"></div>
                                                        <div className="link-face gripper-face-bottom"></div>

                                                        <div className="arm-link-container" id="gripper-left-connector">
                                                            <div className="arm-link" id="gripper-left-connector-inner">
                                                                <div className="link-face link-face-front"></div>
                                                                <div className="link-face link-face-right gripper-face-right"></div>
                                                                <div className="link-face link-face-top gripper-face-top"></div>
                                                                <div className="link-face gripper-face-bottom"></div>
                                                                

                                                            </div>
                                                        </div>
                                                        

                                                    </div>
                                                </div>

                                                <div className="arm-link-container" id="gripper-right">
                                                    <div className="arm-link" id="gripper-right-inner">
                                                        <div className="link-face link-face-front"></div>
                                                        <div className="link-face link-face-right gripper-face-right"></div>
                                                        <div className="link-face link-face-top gripper-face-top"></div>
                                                        <div className="link-face gripper-face-bottom"></div>


                                                        <div className="arm-link-container" id="gripper-right-connector">
                                                            <div className="arm-link" id="gripper-right-connector-inner">
                                                                <div className="link-face link-face-front"></div>
                                                                <div className="link-face link-face-right gripper-face-right"></div>
                                                                <div className="link-face link-face-top gripper-face-top" id="t1"></div>
                                                                <div className="link-face gripper-face-bottom"></div>
                                                                

                                                            </div>
                                                        </div>
                                                        

                                                    </div>
                                                </div>
                                                

                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div class="box-container" id="moving-box">
            <div class="box">
                <div class="box-face box-face-front"></div>
                <div class="box-face box-face-top"></div>
                <div class="box-face box-face-right"></div>
            </div>
        </div>

    </div>;
}

export default AssemblyLine;