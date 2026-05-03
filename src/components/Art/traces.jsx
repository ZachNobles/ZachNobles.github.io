import React from 'react';
import "./traces.css";

// ─── Constants & Configuration ──────────────────────────────────────────────

const OFFSET = 50;
const VIEWPORT_W = document.documentElement.clientWidth;
const VIEWPORT_H = document.documentElement.clientHeight;

const W = VIEWPORT_W + OFFSET * 2;
const H = VIEWPORT_H + OFFSET * 2;
const STROKE = 2;
const COLOR = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#00ffcc";
const VIA_R = 4;
const LANE_PITCH = 9;
const GROUP_GAP = 9;
const CLEAR = STROKE + 3;
const REM = 16;
const PULSE_CHANCE = 0.20; 

const VISUAL_CENTER_X = (VIEWPORT_W / 2) + OFFSET;

const EXCLUSION_ZONE = {
    x1: VISUAL_CENTER_X - (16 * REM), 
    x2: VISUAL_CENTER_X + (12 * REM),
    y1: (-2 * REM) + OFFSET,          
    y2: (6 * REM) + OFFSET           
};

// ─── Geometry Helpers ────────────────────────────────────────────────────────

function makeRng(seed = 0xf00dcafe) {
    let s = seed >>> 0;
    return () => {
        s ^= s << 13; s ^= s >> 17; s ^= s << 5;
        return (s >>> 0) / 0xffffffff;
    };
}

const snap = (v, g = 8) => Math.round(v / g) * g;
const rand = (rng, lo, hi) => lo + rng() * (hi - lo);

function segAABB(seg, pad = 0) {
    return {
        x1: Math.min(seg.x1, seg.x2) - pad,
        y1: Math.min(seg.y1, seg.y2) - pad,
        x2: Math.max(seg.x1, seg.x2) + pad,
        y2: Math.max(seg.y1, seg.y2) + pad,
    };
}

function aabbOverlap(a, b) {
    return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

function cross2d(ax, ay, bx, by) {
    return ax * by - ay * bx;
}

function segsIntersect(a, b) {
    if (!aabbOverlap(segAABB(a, CLEAR), segAABB(b, 0))) return false;
    const rx = a.x2 - a.x1, ry = a.y2 - a.y1;
    const sx = b.x2 - b.x1, sy = b.y2 - b.y1;
    const denom = cross2d(rx, ry, sx, sy);
    const qpx = b.x1 - a.x1, qpy = b.y1 - a.y1;
    if (Math.abs(denom) < 1e-10) return true;
    const t = cross2d(qpx, qpy, sx, sy) / denom;
    const u = cross2d(qpx, qpy, rx, ry) / denom;
    return t >= -0.01 && t <= 1.01 && u >= -0.01 && u <= 1.01;
}

function hitsExclusionZone(seg) {
    const pad = CLEAR + 2;
    const sX1 = Math.min(seg.x1, seg.x2) - pad;
    const sX2 = Math.max(seg.x1, seg.x2) + pad;
    const sY1 = Math.min(seg.y1, seg.y2) - pad;
    const sY2 = Math.max(seg.y1, seg.y2) + pad;

    return (
        sX1 < EXCLUSION_ZONE.x2 &&
        sX2 > EXCLUSION_ZONE.x1 &&
        sY1 < EXCLUSION_ZONE.y2 &&
        sY2 > EXCLUSION_ZONE.y1
    );
}

function conflicts(newSegs, placed) {
    for (const ns of newSegs) {
        if (hitsExclusionZone(ns)) return true;
        const nb = segAABB(ns, CLEAR);
        for (const ps of placed) {
            if (aabbOverlap(nb, segAABB(ps, 0)) && segsIntersect(ns, ps)) {
                return true;
            }
        }
    }
    return false;
}

// ─── Trace Builders ─────────────────────────────────────────────────────────

function buildHTrace(x1, y, x2, rng) {
    const span = x2 - x1;
    if (span < 40) return [{ x1, y1: y, x2, y2: y }];
    const roll = rng();
    if (roll < 0.20) return [{ x1, y1: y, x2, y2: y }];
    if (roll < 0.36) {
        const turnAt = snap(x1 + span * (0.3 + rng() * 0.4));
        const dir = rng() > 0.5 ? 1 : -1;
        const remaining = x2 - turnAt;
        return [
            { x1, y1: y, x2: turnAt, y2: y },
            { x1: turnAt, y1: y, x2: x2, y2: y + dir * remaining },
        ];
    }
    if (roll < 0.50) {
        const diagLen = snap(span * (0.2 + rng() * 0.3));
        const dir = rng() > 0.5 ? 1 : -1;
        const midX = x1 + diagLen, midY = y + dir * diagLen;
        return [
            { x1, y1: y, x2: midX, y2: midY },
            { x1: midX, y1: midY, x2, y2: midY },
        ];
    }
    const numJogs = roll < 0.78 ? 1 : 2;
    const segs = [];
    let cx = x1, cy = y;
    for (let j = 0; j < numJogs; j++) {
        const remaining = x2 - cx;
        if (remaining < 80) break;
        const jogStart = snap(cx + remaining * (0.15 + rng() * 0.35));
        const step = 16 * (1 + Math.floor(rng() * 2));
        const dir = rng() > 0.5 ? 1 : -1;
        const jogRunLen = snap(rand(rng, 16, 80));
        if (jogStart + step + jogRunLen + step >= x2 - 20) break;
        if (jogStart > cx) segs.push({ x1: cx, y1: cy, x2: jogStart, y2: cy });
        const mx1 = jogStart + step, jy = cy + dir * step;
        segs.push({ x1: jogStart, y1: cy, x2: mx1, y2: jy });
        segs.push({ x1: mx1, y1: jy, x2: mx1 + jogRunLen, y2: jy });
        const mx2 = mx1 + jogRunLen;
        segs.push({ x1: mx2, y1: jy, x2: mx2 + step, y2: cy });
        cx = mx2 + step;
    }
    if (cx < x2) segs.push({ x1: cx, y1: cy, x2, y2: cy });
    return segs.length ? segs : [{ x1, y1: y, x2, y2: y }];
}

function buildVTrace(x, y1, y2, rng) {
    const span = y2 - y1;
    if (span < 40) return [{ x1: x, y1, x2: x, y2 }];
    const roll = rng();
    if (roll < 0.20) return [{ x1: x, y1, x2: x, y2 }];
    if (roll < 0.36) {
        const turnAt = snap(y1 + span * (0.3 + rng() * 0.4));
        const dir = rng() > 0.5 ? 1 : -1;
        const remaining = y2 - turnAt;
        return [
            { x1: x, y1, x2: x, y2: turnAt },
            { x1: x, y1: turnAt, x2: x + dir * remaining, y2 },
        ];
    }
    if (roll < 0.50) {
        const diagLen = snap(span * (0.2 + rng() * 0.3));
        const dir = rng() > 0.5 ? 1 : -1;
        const midY = y1 + diagLen, midX = x + dir * diagLen;
        return [
            { x1: x, y1, x2: midX, y2: midY },
            { x1: midX, y1: midY, x2: midX, y2 },
        ];
    }
    const numJogs = roll < 0.78 ? 1 : 2;
    const segs = [];
    let cx = x, cy = y1;
    for (let j = 0; j < numJogs; j++) {
        const remaining = y2 - cy;
        if (remaining < 80) break;
        const jogStart = snap(cy + remaining * (0.15 + rng() * 0.35));
        const step = 16 * (1 + Math.floor(rng() * 2));
        const dir = rng() > 0.5 ? 1 : -1;
        const jogRunLen = snap(rand(rng, 16, 80));
        if (jogStart + step + jogRunLen + step >= y2 - 20) break;
        if (jogStart > cy) segs.push({ x1: cx, y1: cy, x2: cx, y2: jogStart });
        const my1 = jogStart + step, jx = cx + dir * step;
        segs.push({ x1: cx, y1: jogStart, x2: jx, y2: my1 });
        segs.push({ x1: jx, y1: my1, x2: jx, y2: my1 + jogRunLen });
        const my2 = my1 + jogRunLen;
        segs.push({ x1: jx, y1: my2, x2: cx, y2: my2 + step });
        cy = my2 + step;
    }
    if (cy < y2) segs.push({ x1: cx, y1: cy, x2: cx, y2 });
    return segs.length ? segs : [{ x1: x, y1, x2: x, y2 }];
}

function buildLayout(rng) {
    const hBands = [];
    let y = -50, isH = true;
    while (y < H - 20) {
        if (isH) {
            const laneCount = 3 + Math.floor(rng() * 3);
            const h = laneCount * LANE_PITCH + 6;
            const y2 = Math.min(y + h, H - 20);
            hBands.push({ y1: y, y2, laneCount });
            y = y2;
        } else {
            const h = GROUP_GAP + Math.floor(rng() * 40);
            y = Math.min(y + h, H - 20);
        }
        isH = !isH;
    }
    const vCols = [];
    let x = -50;
    while (x < W - 20) {
        const laneCount = 3 + Math.floor(rng() * 3);
        const w = laneCount * LANE_PITCH + 4;
        vCols.push({ x1: x, x2: Math.min(x + w, W - 20), laneCount });
        x += w + GROUP_GAP + Math.floor(rng() * 30);
    }
    return { hBands, vCols };
}

// ─── Rendering Components ───────────────────────────────────────────────────

function SegDiv({ seg, pulse, pulseDelay, pulseDur }) {
    const dx = seg.x2 - seg.x1, dy = seg.y2 - seg.y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return null;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const cx = (seg.x1 + seg.x2) / 2, cy = (seg.y1 + seg.y2) / 2;
    
    return (
        <div
            className={pulse ? 'trace-seg trace-seg-pulse' : 'trace-seg'}
            style={{
                position: 'absolute',
                left: cx - len / 2, top: cy - STROKE / 2,
                width: len, height: STROKE,
                background: COLOR,
                transform: `rotate(${angle}deg)`,
                transformOrigin: '50% 50%',
                // Pulse timing remains as it is specific to the seed
                ...(pulse && { animationDelay: pulseDelay, animationDuration: pulseDur })
            }}
        />
    );
}

function Endpoint({ x, y, pulse, pulseDelay, pulseDur }) {
    return (
        <div 
            className={pulse ? 'via via-pulse' : 'via'}
            style={{
                position: 'absolute',
                left: x - VIA_R, top: y - VIA_R,
                width: VIA_R * 2, height: VIA_R * 2,
                borderRadius: '50%',
                border: `${STROKE}px solid ${COLOR}`,
                background: 'transparent',
                boxSizing: 'border-box',
                pointerEvents: 'none',
                ...(pulse && { animationDelay: pulseDelay, animationDuration: pulseDur })
            }} 
        />
    );
}

// ─── Main ───────────────────────────────────────────────────────────────────

function createTraces() {
    const rng = makeRng(Date.now());
    const { hBands, vCols } = buildLayout(rng);
    const elements = [];
    const placed = []; 
    let key = 0;

    const tryEmit = (segs, pulse) => {
        if (conflicts(segs, placed)) return false;
        
        placed.push(...segs);
        const delay = `${rand(rng, 0, 7).toFixed(2)}s`;
        const dur   = `${rand(rng, 3, 8).toFixed(2)}s`;
        
        const visualSegs = segs.map((s, idx) => {
            let { x1, y1, x2, y2 } = s;
            const trim = VIA_R; // The amount to pull back

            // If it's the first segment, move the start point (x1, y1) forward
            if (idx === 0) {
                const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                if (len > trim * 2) {
                    x1 += (x2 - x1) * (trim / len);
                    y1 += (y2 - y1) * (trim / len);
                }
            }

            // If it's the last segment, move the end point (x2, y2) backward
            if (idx === segs.length - 1) {
                const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                if (len > trim * 2) {
                    x2 -= (x2 - x1) * (trim / len);
                    y2 -= (y2 - y1) * (trim / len);
                }
            }
            return { x1, y1, x2, y2 };
        });

        visualSegs.forEach(seg => {
            elements.push(<SegDiv key={key++} seg={seg}
                pulse={pulse} pulseDelay={delay} pulseDur={dur} />);
        });

        const s = segs[0], e = segs[segs.length - 1];

        elements.push(
            <Endpoint 
                key={key++} x={s.x1} y={s.y1} 
                pulse={pulse} pulseDelay={delay} pulseDur={dur} 
            />
        );
        elements.push(
            <Endpoint 
                key={key++} x={e.x2} y={e.y2} 
                pulse={pulse} pulseDelay={delay} pulseDur={dur} 
            />
        );
        return true;
    };

    hBands.forEach(band => {
        for (let l = 0; l < band.laneCount; l++) {
            const y = band.y1 + l * LANE_PITCH + LANE_PITCH / 2;
            let cursor = snap(rand(rng, 16, 60));
            while (cursor < W - 40) {
                let isPlaced = false;
                for (let attempt = 0; attempt < 3 && !isPlaced; attempt++) {
                    const len = snap(rand(rng, 140, 600));
                    const x1 = cursor;
                    const x2 = Math.min(x1 + len, W - 20);
                    if (x2 - x1 < 60) break;
                    
                    const segs = buildHTrace(x1, y, x2, rng);
                    if (tryEmit(segs, rng() > (1 - PULSE_CHANCE))) {
                        cursor = x2 + snap(rand(rng, 20, 80));
                        isPlaced = true;
                    }
                }
                if (!isPlaced) cursor += snap(rand(rng, 40, 100));
            }
        }
    });

    vCols.forEach(col => {
        for (let l = 0; l < col.laneCount; l++) {
            const x = col.x1 + l * LANE_PITCH + LANE_PITCH / 2;
            let cursor = snap(rand(rng, 20, 120));
            const limit = H - snap(rand(rng, 20, 120));
            while (cursor < limit - 40) {
                let didPlace = false;
                for (let attempt = 0; attempt < 3 && !didPlace; attempt++) {
                    const len = snap(rand(rng, 100, 420));
                    const y1 = cursor;
                    const y2 = Math.min(y1 + len, limit);
                    if (y2 - y1 < 50) break;
                    
                    const segs = buildVTrace(x, y1, y2, rng);
                    if (tryEmit(segs, rng() > (1 - PULSE_CHANCE))) {
                        cursor = y2 + snap(rand(rng, 20, 70));
                        didPlace = true;
                    }
                }
                if (!didPlace) cursor += snap(rand(rng, 30, 80));
            }
        }
    });

    return elements;
}

const Traces = () => (
    <div className="traces">
        {createTraces()}
    </div>
);

export default Traces;