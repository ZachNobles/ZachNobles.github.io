import React from "react";

import Gears from "./Gears/gears"
import Traces from "./Traces/traces"
import Arm from "./AssemblyLine/assembly_line"

const Background = () => {
    const backgrounds = [<Gears />, <Traces />, <Arm />];
    const random_background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return <div className="bg-art">
        {random_background}
    </div>;
}

export default Background;