import React from 'react';
import "./gears.css";

const toothLength = 5; // in vw

function makeRng(seed = 0xf00dcafe) {
    let s = seed >>> 0;
    return () => {
        s ^= s << 13; s ^= s >> 17; s ^= s << 5;
        return (s >>> 0) / 0xffffffff;
    };
}

function buildGearPolygon(radius, teeth, length = toothLength) {
    const r = radius;              // outer radius in vw
    const innerR = r - length; // inner (valley) radius in vw

    const points = [];
    const step = 360 / teeth;

    // Center of the element in vw — assumes the element is (radius*2) vw wide
    const cx = radius; // half of element width
    const cy = radius; // half of element height

    const gapFrac = 0.12;      // fraction of slot taken by each gap side (left and right)
    const slopeFrac = 0.2;    // fraction of slot used by each slope (rise and fall)
    // tooth tip occupies the remaining center: 1 - 2*gapFrac - 2*slopeFrac

    const tipStart = gapFrac;
    const tipEnd = 1 - gapFrac;
    const riseEnd = tipStart + slopeFrac;
    const fallStart = tipEnd - slopeFrac;

    for (let i = 0; i < teeth; i++) {
        const base = i * step;
        const angles = [
            base,
            base + step * tipStart,
            base + step * riseEnd,
            base + step * fallStart,
            base + step * tipEnd,
            base + step,
        ];
        const radii = [innerR, innerR, r, r, innerR, innerR];

        for (let j = 0; j < angles.length; j++) {
            const rad = (angles[j] - 90) * Math.PI / 180;
            const x = cx + radii[j] * Math.cos(rad);
            const y = cy + radii[j] * Math.sin(rad);
            points.push(`${x.toFixed(3)}vw ${y.toFixed(3)}vw`);
        }
    }
  return `polygon(${points.join(', ')})`;
}

const gear = (radius, teeth, x, y, classes, baseRotation = 0) => (
    <div className="gear-wrapper" style={{
        width: `${radius * 2}vw`, height: `${radius * 2}vw`,
        top: `${y - radius}vw`, left: `${x - radius}vw`,
        position: "absolute",
        transform: `rotate(${-baseRotation}deg)`,
        transformOrigin: "center center",
    }}>
        <div className={`gear ${classes}`} style={{
            clipPath: buildGearPolygon(radius, teeth),
            backgroundColor: "var(--accent)",
            width: "100%", height: "100%",
        }}></div>
    </div>
);

const gearCoordinates = (r1, r2, x1, y1, angle) => {
    const centerDistance = r1 + r2 - toothLength / 2;
    const x2 = x1 + centerDistance * Math.cos(angle * Math.PI / 180);
    const y2 = y1 - centerDistance * Math.sin(angle * Math.PI / 180);
    return [x2, y2];
};

const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

const wrap = (angle) => {
    while (angle < 0) angle += 360;
    while (angle > 360) angle -= 360;
    return angle;
}

const anyConflicts = (target_gear, other_gears, parent) => {
    // returns true if gear conflicts with any others
    for (const placed_gear of other_gears) {
        if (placed_gear.id === parent) continue;
        if ( distance(placed_gear.x, placed_gear.y, target_gear.x, target_gear.y) < (placed_gear.r + target_gear.r) ) {
            return true;
        }
    }
    return false;
};

const baseRotation = (parent_base_rotation, angle, driver_teeth, driven_teeth) => {
    const ratio = driver_teeth / driven_teeth;
    const rotation = (parent_base_rotation - angle) * -ratio + angle + 180 + (180 / driven_teeth);
    return wrap(rotation);
}

const placeGear = (gear_list, rng, target_gear, parent_gear, className) => {
    let roll = rng();
    let n = 0;
    target_gear.angle = Math.round(roll * 24) * -15;
    console.log(`trying to place gear ${target_gear.id} as child of ${parent_gear.id}`);
    const [x, y] = gearCoordinates(parent_gear.r, target_gear.r, parent_gear.x, parent_gear.y, target_gear.angle);
    target_gear.x = x; target_gear.y = y;
    while ( anyConflicts(target_gear, gear_list, parent_gear.id) ) {
        target_gear.angle = wrap(target_gear.angle - 15);
        [target_gear.x, target_gear.y] = gearCoordinates(parent_gear.r, target_gear.r, parent_gear.x, parent_gear.y, target_gear.angle);
        n++; if (n > 25) break;
    }
    console.log(`parent ${parent_gear.id} at ${parent_gear.x}, ${parent_gear.y}\nchild ${target_gear.id} at ${target_gear.x}, ${target_gear.y} with angle ${target_gear.angle} after ${n} iterations`)
    if (n < 25) {
        let rotation = wrap(baseRotation(parent_gear.baseRotation, target_gear.angle, parent_gear.teeth, target_gear.teeth));
        target_gear.baseRotation += rotation;
        console.log(`calculated base rotation of ${target_gear.baseRotation}`)
        target_gear.object = gear(target_gear.r, target_gear.teeth, target_gear.x, target_gear.y, className, target_gear.baseRotation);
        gear_list.push(target_gear);
    }

}


const generateGears = () => {
    const rng = makeRng(Date.now());
    var COLOR = document.documentElement.style.getPropertyValue("--accent").trim();

    const gear0 = { r: 40, x: -5, y: -5, teeth: 24, baseRotation: 0, id: 0 }
    let placed_gears = [gear0]
    
    let rotation = 0;
    let roll = rng();
    let gear1 = { r: 20, x: 0, y: 0, angle: 0, teeth: 12, baseRotation: 0, id: 1 };
    let gear2 = { r: 20, x: 0, y: 0, angle: 0, teeth: 12, baseRotation: 0, id: 2 };
    let gear3 = { r: 13.33, x: 0, y: 0, angle: 0, teeth: 8, baseRotation: 0, id: 3 };
    let gear4 = { r: 13.33, x: 0, y: 0, angle: 0, teeth: 8, baseRotation: 0, id: 4 };
    let gear5 = { r: 13.33, x: 0, y: 0, angle: 0, teeth: 8, baseRotation: 0, id: 5 };
    let gear6 = { r: 13.33, x: 0, y: 0, angle: 0, teeth: 8, baseRotation: 0, id: 6 };
    let gear7 = { r: 20, x: 0, y: 0, angle: 0, teeth: 12, baseRotation: 0, id: 7 };
    let gear8 = { r: 20, x: 0, y: 0, angle: 0, teeth: 12, baseRotation: 0, id: 8 };
    gear1.angle = Math.round(roll * 6) * -15;
    [gear1.x, gear1.y] = gearCoordinates(gear0.r, gear1.r, gear0.x, gear0.y, gear1.angle);
    rotation = baseRotation(gear0.baseRotation, gear1.angle, gear0.teeth, gear1.teeth);
    gear1.baseRotation = rotation;
    gear1.object = gear(gear1.r, 12, gear1.x, gear1.y, "gear-12-ccw", rotation);
    placed_gears.push(gear1);
    
    // gear 2 - 12 teeth, off gear 1
    placeGear(placed_gears, rng, gear2, gear1, "gear-12-cw");
    // gear 3 - 8 teeth, off gear 2
    placeGear(placed_gears, rng, gear3, gear2, "gear-8-ccw");
    // gear 4 - 8 teeth, off gear 1
    placeGear(placed_gears, rng, gear4, gear1, "gear-8-cw");
    // gear 5 - 8 teeth, off gear 1
    placeGear(placed_gears, rng, gear5, gear1, "gear-8-cw");
    // gear 6 - 8 teeth, off gear 4
    placeGear(placed_gears, rng, gear6, gear4, "gear-8-ccw");
    // gear 7 - 12 teeth, off gear 6
    placeGear(placed_gears, rng, gear7, gear6, "gear-12-cw");
    // gear 8 - 12 teeth, off gear 3
    placeGear(placed_gears, rng, gear8, gear3, "gear-12-cw");


    return(
        <div>
            {gear(40, 24, -5, -5, "gear-24-cw", 0)}
            {placed_gears.map((gear) => gear.object)}
        </div>
    );
};

const Gears = () => (
    <div className="gear-container">
        {generateGears()}
    </div>
);

export default Gears;