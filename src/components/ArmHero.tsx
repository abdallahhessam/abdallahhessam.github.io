import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A planar two-link (2R) arm drawn like a technical drawing.
 * It solves inverse kinematics toward the pointer (anywhere in the hero),
 * a tap/drag on touch screens, or the arrow keys when focused.
 * No continuous animation: it only moves in response to input.
 */

const W = 560;
const H = 460;
const BASE = { x: 150, y: 384 };
const L1 = 180;
const L2 = 150;
const REACH_MAX = L1 + L2 - 6;
const REACH_MIN = Math.abs(L1 - L2) + 24;
const REST = { x: 372, y: 168 };
const deg = (r: number) => (r * 180) / Math.PI;

interface Angles {
  q1: number; // shoulder, radians, CCW from +x (math convention, y up)
  q2: number; // elbow, radians, relative to link 1
}

/** Clamp the target into the reachable workspace (and keep it above the floor). */
function clampTarget(x: number, y: number) {
  let dx = x - BASE.x;
  let dy = Math.max(BASE.y - y, -10); // y up; allow a little below shoulder height
  const d = Math.hypot(dx, dy) || 1;
  const r = Math.min(REACH_MAX, Math.max(REACH_MIN, d));
  dx = (dx / d) * r;
  dy = (dy / d) * r;
  return { x: BASE.x + dx, y: BASE.y - dy };
}

/** Elbow-up analytic IK solution. */
function solveIK(x: number, y: number): Angles {
  const dx = x - BASE.x;
  const dy = BASE.y - y;
  const d2 = dx * dx + dy * dy;
  const c = Math.min(1, Math.max(-1, (d2 - L1 * L1 - L2 * L2) / (2 * L1 * L2)));
  const q2 = -Math.acos(c);
  const q1 = Math.atan2(dy, dx) + Math.atan2(L2 * Math.sin(-q2), L1 + L2 * Math.cos(q2));
  return { q1, q2 };
}

function forward({ q1, q2 }: Angles) {
  const ex = BASE.x + L1 * Math.cos(q1);
  const ey = BASE.y - L1 * Math.sin(q1);
  const tx = ex + L2 * Math.cos(q1 + q2);
  const ty = ey - L2 * Math.sin(q1 + q2);
  return { elbow: { x: ex, y: ey }, tool: { x: tx, y: ty } };
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const x1 = cx + r * Math.cos(from);
  const y1 = cy - r * Math.sin(from);
  const x2 = cx + r * Math.cos(to);
  const y2 = cy - r * Math.sin(to);
  const large = Math.abs(to - from) > Math.PI ? 1 : 0;
  const sweep = to > from ? 0 : 1;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}

export function ArmHero({ areaRef }: { areaRef: RefObject<HTMLElement> }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const target = useRef(clampTarget(REST.x, REST.y));
  const goal = useRef<Angles>(solveIK(target.current.x, target.current.y));
  const raf = useRef<number | null>(null);
  const [angles, setAngles] = useState<Angles>(goal.current);
  const [tgt, setTgt] = useState(target.current);

  const step = useCallback(() => {
    setAngles((a) => {
      const n = {
        q1: a.q1 + (goal.current.q1 - a.q1) * 0.2,
        q2: a.q2 + (goal.current.q2 - a.q2) * 0.2,
      };
      const done = Math.abs(goal.current.q1 - n.q1) < 0.0008 && Math.abs(goal.current.q2 - n.q2) < 0.0008;
      raf.current = done ? null : requestAnimationFrame(step);
      return done ? goal.current : n;
    });
  }, []);

  const aimAt = useCallback(
    (x: number, y: number) => {
      const t = clampTarget(x, y);
      target.current = t;
      goal.current = solveIK(t.x, t.y);
      setTgt(t);
      if (reduce) {
        setAngles(goal.current);
      } else if (raf.current === null) {
        raf.current = requestAnimationFrame(step);
      }
    },
    [reduce, step],
  );

  // Pointer anywhere in the hero area steers the arm.
  useEffect(() => {
    const area = areaRef.current;
    const svg = svgRef.current;
    if (!area || !svg) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.type === "pointermove" && !(e.target as Element).closest?.("[data-arm]")) return;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      aimAt(p.x, p.y);
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerdown", onMove);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerdown", onMove);
    };
  }, [areaRef, aimAt]);

  useEffect(() => () => { if (raf.current !== null) cancelAnimationFrame(raf.current); }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const s = e.shiftKey ? 40 : 14;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-s, 0],
      ArrowRight: [s, 0],
      ArrowUp: [0, -s],
      ArrowDown: [0, s],
    };
    const m = moves[e.key];
    if (m) {
      e.preventDefault();
      aimAt(target.current.x + m[0], target.current.y + m[1]);
    } else if (e.key === "Home") {
      e.preventDefault();
      aimAt(REST.x, REST.y);
    }
  };

  const { elbow, tool } = forward(angles);
  const q1d = deg(angles.q1);
  const q2d = deg(angles.q2);
  const toolAngle = angles.q1 + angles.q2;

  // Dimension label positions: link midpoints pushed out along the link normal.
  const n1 = { x: -Math.sin(angles.q1), y: -Math.cos(angles.q1) };
  const m1 = { x: (BASE.x + elbow.x) / 2 + n1.x * 34, y: (BASE.y + elbow.y) / 2 + n1.y * 34 };
  const n2 = { x: Math.sin(toolAngle), y: Math.cos(toolAngle) };
  const m2 = { x: (elbow.x + tool.x) / 2 + n2.x * 34, y: (elbow.y + tool.y) / 2 + n2.y * 34 };

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 0.9, delay, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.1, delay } },
        };
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay } };

  return (
    <div
      data-arm
      tabIndex={0}
      onKeyDown={onKey}
      role="group"
      aria-label="Interactive robot arm drawing. Move the pointer over this area, or focus it and use the arrow keys, to move the arm's target. Shift moves faster; Home resets."
      className="relative w-full touch-none select-none rounded-md outline-offset-4"
    >
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        <defs>
          <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#66737D" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Workspace envelope (reachable annulus) */}
        <motion.g {...fade(0.1)}>
          <path d={arcPath(BASE.x, BASE.y, REACH_MAX + 6, -0.03, Math.PI + 0.03)} fill="none" stroke="#2B343B" strokeDasharray="3 6" />
          <path d={arcPath(BASE.x, BASE.y, REACH_MIN - 24, -0.03, Math.PI + 0.03)} fill="none" stroke="#2B343B" strokeDasharray="3 6" />
          <text x={BASE.x - 128} y={BASE.y - REACH_MAX + 2} className="fill-faint" fontSize="11" fontFamily="JetBrains Mono, monospace">
            workspace r = {L1 + L2}
          </text>
        </motion.g>

        {/* Ground and base */}
        <motion.g {...fade(0.2)}>
          <rect x={BASE.x - 70} y={BASE.y + 26} width="140" height="12" fill="url(#hatch)" />
          <line x1={BASE.x - 70} y1={BASE.y + 26} x2={BASE.x + 70} y2={BASE.y + 26} stroke="#93A1AC" strokeWidth="1.5" />
          <path d={`M ${BASE.x - 34} ${BASE.y + 26} L ${BASE.x - 18} ${BASE.y - 6} L ${BASE.x + 18} ${BASE.y - 6} L ${BASE.x + 34} ${BASE.y + 26}`} fill="#1A2025" stroke="#93A1AC" strokeWidth="1.5" />
        </motion.g>

        {/* Shoulder angle annotation */}
        <motion.g {...fade(1.2)}>
          <line x1={BASE.x} y1={BASE.y} x2={BASE.x + 92} y2={BASE.y} stroke="#66737D" strokeDasharray="10 3 2 3" />
          <path d={arcPath(BASE.x, BASE.y, 64, 0, angles.q1)} fill="none" stroke="#3FD0C4" strokeWidth="1.2" />
          <text
            x={BASE.x + 78 * Math.cos(angles.q1 / 2)}
            y={BASE.y - 78 * Math.sin(angles.q1 / 2) + 4}
            className="fill-signal"
            fontSize="13"
            fontFamily="JetBrains Mono, monospace"
          >
            θ₁
          </text>
        </motion.g>

        {/* Link 1 */}
        <g transform={`translate(${BASE.x} ${BASE.y}) rotate(${-q1d})`}>
          <motion.rect x={-16} y={-16} width={L1 + 32} height={32} rx={16} fill="#1A2025" stroke="#E6EBEE" strokeWidth="1.6" {...draw(0.35)} />
          <line x1={0} y1={0} x2={L1} y2={0} stroke="#66737D" strokeDasharray="14 4 2 4" />
          {/* Link 2, nested so it inherits link 1's pose */}
          <g transform={`translate(${L1} 0) rotate(${-q2d})`}>
            <motion.rect x={-13} y={-13} width={L2 + 18} height={26} rx={13} fill="#1A2025" stroke="#E6EBEE" strokeWidth="1.6" {...draw(0.75)} />
            <line x1={0} y1={0} x2={L2} y2={0} stroke="#66737D" strokeDasharray="14 4 2 4" />
            {/* Gripper */}
            <motion.g {...fade(1.4)}>
              <path d={`M ${L2 + 4} -16 L ${L2 + 30} -16 L ${L2 + 30} -8`} fill="none" stroke="#E6EBEE" strokeWidth="1.6" />
              <path d={`M ${L2 + 4} 16 L ${L2 + 30} 16 L ${L2 + 30} 8`} fill="none" stroke="#E6EBEE" strokeWidth="1.6" />
              <line x1={L2 + 4} y1={-16} x2={L2 + 4} y2={16} stroke="#E6EBEE" strokeWidth="1.6" />
            </motion.g>
          </g>
        </g>

        {/* Joints */}
        {[BASE, elbow].map((j, i) => (
          <motion.g key={i} {...fade(0.5 + i * 0.4)}>
            <circle cx={j.x} cy={j.y} r={9} fill="#121619" stroke="#E6EBEE" strokeWidth="1.6" />
            <line x1={j.x - 5} y1={j.y} x2={j.x + 5} y2={j.y} stroke="#93A1AC" />
            <line x1={j.x} y1={j.y - 5} x2={j.x} y2={j.y + 5} stroke="#93A1AC" />
          </motion.g>
        ))}

        {/* Link length labels */}
        <motion.g {...fade(1.3)} fontFamily="JetBrains Mono, monospace" fontSize="12" className="fill-muted">
          <text x={m1.x} y={m1.y} textAnchor="middle">L₁ {L1}</text>
          <text x={m2.x} y={m2.y} textAnchor="middle">L₂ {L2}</text>
        </motion.g>

        {/* Target */}
        <motion.g {...fade(1.5)}>
          <circle cx={tgt.x} cy={tgt.y} r={14} fill="none" stroke="#3FD0C4" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1={tgt.x - 22} y1={tgt.y} x2={tgt.x + 22} y2={tgt.y} stroke="#3FD0C4" strokeWidth="1" />
          <line x1={tgt.x} y1={tgt.y - 22} x2={tgt.x} y2={tgt.y + 22} stroke="#3FD0C4" strokeWidth="1" />
        </motion.g>
      </svg>

      {/* Live readout */}
      <motion.dl
        {...fade(1.6)}
        className="absolute bottom-1 right-1 grid grid-cols-[auto_auto] gap-x-3 rounded-sm border border-rule bg-ground/85 px-3 py-2 font-mono text-[11px] leading-5 text-muted sm:bottom-3 sm:right-3 sm:text-xs"
        aria-hidden="true"
      >
        <dt>θ₁</dt>
        <dd className="text-right tabular-nums text-ink">{q1d.toFixed(1)}°</dd>
        <dt>θ₂</dt>
        <dd className="text-right tabular-nums text-ink">{q2d.toFixed(1)}°</dd>
        <dt>tool x, y</dt>
        <dd className="text-right tabular-nums text-ink">
          {Math.round(tool.x - BASE.x)}, {Math.round(BASE.y - tool.y)}
        </dd>
      </motion.dl>
    </div>
  );
}
