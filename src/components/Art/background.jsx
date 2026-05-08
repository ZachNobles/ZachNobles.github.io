import React from "react";

import Gears from "./Gears/gears"
import Traces from "./Traces/traces"
import AssemblyLine from "./AssemblyLine/assembly_line"

const Background = () => {
    const backgrounds = [<Gears />, <Traces />];
    const random_background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return <div className="bg-art">
        {/* {random_background} */}
        <AssemblyLine />
    </div>;
}

export default Background;