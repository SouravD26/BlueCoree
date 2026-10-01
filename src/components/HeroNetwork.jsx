import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, ShieldCheck, Server, Video, MonitorSmartphone, Code2, Activity } from 'lucide-react';
import { ease } from './ui';

/* Positions are percentages of a square stage; the SVG uses the same 0–100 space. */
const CORE = { x: 50, y: 50 };
const NODES = [
  { id: 'cloud', icon: Cloud, label: 'Cloud & M365', sub: 'synced', x: 50, y: 7 },
  { id: 'fw', icon: ShieldCheck, label: 'Firewall', sub: '0 threats', x: 12, y: 27 },
  { id: 'srv', icon: Server, label: 'Servers', sub: '12 online', x: 88, y: 27 },
  { id: 'cctv', icon: Video, label: 'CCTV', sub: '24 cams live', x: 12, y: 73 },
  { id: 'pc', icon: MonitorSmartphone, label: 'Office devices', sub: 'AMC covered', x: 50, y: 93 },
  { id: 'app', icon: Code2, label: 'Web & Apps', sub: '99.9% up', x: 88, y: 73 },
];

/* Gentle curve from the core to a node */
const pathTo = (n) => {
  const mx = (CORE.x + n.x) / 2 + (n.y - CORE.y) * 0.18;
  const my = (CORE.y + n.y) / 2 - (n.x - CORE.x) * 0.18;
  return `M${CORE.x},${CORE.y} Q${mx},${my} ${n.x},${n.y}`;
};

function useLiveStats() {
  const [s, setS] = useState({ mbps: 842, devices: 1284, latency: 4 });
  useEffect(() => {
    const t = setInterval(() => {
      setS((p) => ({
        mbps: Math.max(600, Math.min(990, p.mbps + Math.round((Math.random() - 0.5) * 80))),
        devices: p.devices + (Math.random() > 0.7 ? 1 : 0),
        latency: 3 + Math.round(Math.random() * 3),
      }));
    }, 1400);
    return () => clearInterval(t);
  }, []);
  return s;
}

export default function HeroNetwork() {
  const stats = useLiveStats();

  return (
    <motion.div className="net" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease }}>
      {/* radar sweep + rings behind the core */}
      <div className="net-radar" aria-hidden="true" />
      <div className="net-ring" aria-hidden="true" />
      <div className="net-ring r2" aria-hidden="true" />

      <svg className="net-svg" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="cable" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="0.8" /></filter>
        </defs>

        {/* Ring cable linking the edge nodes */}
        <motion.polygon
          points={NODES.map((n) => `${n.x},${n.y}`).join(' ')}
          fill="none" stroke="rgba(120,160,255,0.12)" strokeWidth="0.25" strokeDasharray="1 1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
        />

        {NODES.map((n, i) => {
          const d = pathTo(n);
          return (
            <g key={n.id}>
              {/* cable draws itself in */}
              <motion.path d={d} fill="none" stroke="url(#cable)" strokeWidth="0.45" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.12, ease }} />
              {/* moving dashes = traffic */}
              <path d={d} fill="none" stroke="#9cc2ff" strokeWidth="0.3" strokeDasharray="0.6 3" className="net-flow"
                style={{ animationDuration: `${2 + (i % 3) * 0.6}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }} />
              {/* packets out and back */}
              <circle r="1" fill="#22d3ee" filter="url(#glow)">
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} begin={`${1.8 + i * 0.2}s`} />
              </circle>
              <circle r="0.7" fill="#fff">
                <animateMotion dur={`${3 + i * 0.25}s`} repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin={`${2.2 + i * 0.3}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Core: animated server rack */}
      <motion.div className="net-core" style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.5, stiffness: 120 }}>
        <div className="rack">
          {[0, 1, 2, 3].map((u) => (
            <div className="rack-u" key={u}>
              <span className="rack-led" style={{ animationDelay: `${u * 0.37}s` }} />
              <span className="rack-led b" style={{ animationDelay: `${u * 0.23 + 0.5}s` }} />
              <i className="rack-bar"><b style={{ animationDelay: `${u * 0.4}s` }} /></i>
            </div>
          ))}
        </div>
        <span className="net-core-label">Bluecoree Core</span>
      </motion.div>

      {/* Edge nodes */}
      {NODES.map((n, i) => {
        const I = n.icon;
        return (
          <motion.div key={n.id} className="net-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.12, type: 'spring', stiffness: 160 }}
            whileHover={{ scale: 1.08 }}>
            <span className="net-ico"><I /><span className="net-pulse" style={{ animationDelay: `${i * 0.4}s` }} /></span>
            <span className="net-txt">
              <b>{n.label}</b>
              <small><i className="dot" /> {n.sub}</small>
            </span>
          </motion.div>
        );
      })}

      {/* Live status panel */}
      <motion.div className="net-status" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8, ease }}>
        <div className="ns-head"><Activity size={14} /> NETWORK STATUS <span className="ns-ok"><i className="dot" /> Operational</span></div>
        <div className="ns-grid">
          <div><small>Throughput</small><b>{stats.mbps}<em> Mbps</em></b></div>
          <div><small>Devices</small><b>{stats.devices.toLocaleString()}</b></div>
          <div><small>Latency</small><b>{stats.latency}<em> ms</em></b></div>
        </div>
        <div className="ns-bars" aria-hidden="true">
          {Array.from({ length: 24 }, (_, k) => <i key={k} style={{ animationDelay: `${(k * 0.11) % 1.3}s` }} />)}
        </div>
      </motion.div>
    </motion.div>
  );
}
