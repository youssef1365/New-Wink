import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TIMELINE_EVENTS = [
    { year: '2010', label: 'The Beginning', description: 'Wink was founded in 2010 with a simple mission: helping companies expand internationally through hands-on business development support and strategic connections. As global markets became more complex and opportunities more fragmented, we realized that what companies truly needed was not just advice — but access to the right people.' },
    { year: '2014', label: 'The Matchmaking Focus', description: 'In 2014, Wink evolved into a specialized B2B matchmaking agency, focusing on designing and organizing high-value business meetings between qualified partners across international markets. Over the years, this expertise has led to the facilitation of thousands of meetings across multiple industries and countries.' },
    { year: '2026', label: 'The Technology Shift', description: 'Today, we are entering a new chapter. In 2026, Wink is integrating its proprietary meeting-management platform to power the way business meetings are sourced, scheduled, and managed during international events and trade missions — combining human intelligence with digital efficiency.' },
    { year: '→', label: 'Looking Ahead', description: 'Looking forward, our ambition is to go even further: building structured trade and capital platforms that connect companies, investors, and markets through curated international corridors.' },
];

const STATS = [
    { value: null, label: null, title: '+15 Years of Experience', desc: 'International Business Development Experience', style: 'lines' },
    { value: null, label: null, title: 'Global Network', desc: 'Across Europe, Africa, Asia, America & the Middle East', style: 'clean' },
    { value: null, label: null, title: 'B2B Meetings', desc: 'Curated Meetings Organized Worldwide', style: 'image', bgImage: '/14.jpeg' },
    { value: null, label: null, title: 'Strategic Programs', desc: 'Connecting Buyers & Suppliers Across Markets', style: 'geo' },
];

const CONTINENT_MARKERS = [
    { name: 'Americas', cx: 0.155, cy: 0.42 },
    { name: 'Europe', cx: 0.47, cy: 0.26 },
    { name: 'Middle East', cx: 0.565, cy: 0.40 },
    { name: 'Africa', cx: 0.495, cy: 0.57 },
    { name: 'Asia', cx: 0.72, cy: 0.32 },
];

const LAND = [
    [6,8,14],[7,7,16],[8,7,17],[9,7,18],[10,6,19],[11,6,19],[12,7,18],[13,8,17],
    [14,9,17],[15,10,16],[16,10,15],[17,11,15],[18,12,15],[19,13,15],[20,14,15],
    [3,14,18],[4,13,19],[5,13,19],[6,14,18],
    [21,13,16],[22,12,17],[23,12,17],[24,12,17],[25,12,16],[26,12,16],
    [27,13,16],[28,13,15],[29,13,15],[30,14,15],[31,14,14],[32,14,14],
    [7,34,42],[8,33,44],[9,33,44],[10,33,44],[11,34,43],[12,35,42],
    [13,35,41],[14,36,40],[15,37,40],
    [5,37,41],[6,36,42],[7,36,41],
    [8,32,34],[9,31,34],
    [13,37,44],[14,36,45],[15,36,46],[16,36,46],[17,36,46],[18,37,45],
    [19,37,45],[20,37,45],[21,37,45],[22,37,44],[23,38,44],[24,38,43],
    [25,38,43],[26,39,43],[27,39,43],[28,39,42],[29,40,42],[30,40,42],
    [12,45,52],[13,44,53],[14,44,54],[15,44,54],[16,44,53],[17,45,52],[18,45,51],
    [5,42,65],[6,40,66],[7,40,67],[8,39,67],[9,39,68],[10,39,67],[11,40,66],
    [12,40,65],[13,40,63],[14,40,62],
    [15,52,60],[16,51,62],[17,51,62],[18,52,61],[19,53,60],[20,54,60],[21,54,59],[22,54,58],
    [16,60,68],[17,59,68],[18,58,67],[19,58,66],[20,59,65],[21,60,65],[22,60,65],[23,61,65],[24,62,65],
    [8,55,68],[9,54,69],[10,54,70],[11,54,70],[12,53,69],[13,52,68],[14,52,68],[15,52,65],[16,53,64],
    [10,68,71],[11,67,71],[12,67,70],
    [24,65,72],[25,64,72],[26,63,72],[27,64,71],[28,65,71],[29,65,70],[30,66,70],
];

const DPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 2;
const W = 520, H = 300, COLS = 72, ROWS = 38;
const DX = W / COLS, DY = H / ROWS;
const DOT_R = 2.8;

function isLand(col, row) {
    for (const [r, c0, c1] of LAND) {
        if (row === r && col >= c0 && col <= c1) return true;
    }
    return false;
}
function hexX(col, row) { return col * DX + (row % 2 === 0 ? 0 : DX * 0.5) + DX * 0.5; }
function hexY(row) { return row * DY * 0.82 + DY * 0.5; }

const WorldMap = () => {
    const canvasRef = useRef(null);
    const hoveredRef = useRef(null);
    const animRef = useRef(null);
    const pulseRef = useRef(0);
    const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 });

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        pulseRef.current += 0.04;
        ctx.clearRect(0, 0, W * DPR, H * DPR);
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!isLand(c, r)) continue;
                ctx.beginPath();
                ctx.arc(hexX(c, r) * DPR, hexY(r) * DPR, DOT_R * DPR, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,206,193,0.35)';
                ctx.fill();
            }
        }
        CONTINENT_MARKERS.forEach((pt, i) => {
            const px = pt.cx * W * DPR;
            const py = pt.cy * H * DPR;
            const isHovered = hoveredRef.current === pt.name;
            const pulseMod = Math.sin(pulseRef.current + i * 1.2) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(px, py, (11 + pulseMod * 5) * DPR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.04 + pulseMod * 0.06})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px, py, (isHovered ? 9 : 7) * DPR, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.16)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px, py, (isHovered ? 4.5 : 3.5) * DPR, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });
        animRef.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (W / rect.width);
        const my = (e.clientY - rect.top) * (H / rect.height);
        let found = null;
        for (const pt of CONTINENT_MARKERS) {
            const dx = mx - pt.cx * W;
            const dy = my - pt.cy * H;
            if (Math.sqrt(dx * dx + dy * dy) < 16) { found = pt; break; }
        }
        hoveredRef.current = found ? found.name : null;
        if (found) {
            setTooltip({ visible: true, name: found.name, x: found.cx * rect.width, y: found.cy * rect.height });
            canvas.style.cursor = 'pointer';
        } else {
            setTooltip(t => ({ ...t, visible: false }));
            canvas.style.cursor = 'default';
        }
    };

    const handleMouseLeave = () => {
        hoveredRef.current = null;
        setTooltip(t => ({ ...t, visible: false }));
    };

    return (
        <>
            <div className="wmap-wrap">
                <div className="wmap-canvas-wrap">
                    <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ display: 'block', borderRadius: '8px', background: 'rgba(2,13,20,0.7)' }} />
                    {tooltip.visible && <div className="wmap-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.name}</div>}
                </div>
                <div className="wmap-legend">
                    {CONTINENT_MARKERS.map((c, i) => (
                        <motion.span key={c.name} className="wmap-legend-item" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} onMouseEnter={() => { hoveredRef.current = c.name; }} onMouseLeave={() => { hoveredRef.current = null; }}>
                            <span className="wmap-legend-dot" />{c.name}
                        </motion.span>
                    ))}
                </div>
            </div>
            <style>{`
                .wmap-wrap { width: 420px; flex-shrink: 0; display: flex; flex-direction: column; gap: 1rem; }
                .wmap-canvas-wrap { position: relative; width: 100%; }
                .wmap-tooltip { position: absolute; background: rgba(2,13,20,0.92); border: 1px solid rgba(0,206,193,0.3); color: #00CEC1; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; pointer-events: none; white-space: nowrap; transform: translate(-50%,-140%); font-family: 'Montserrat', sans-serif; }
                .wmap-legend { display: flex; flex-wrap: wrap; gap: 0.35rem; }
                .wmap-legend-item { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(0,206,193,0.42); padding: 0.2rem 0.55rem; border: 1px solid rgba(0,206,193,0.13); border-radius: 4px; background: rgba(0,206,193,0.03); cursor: pointer; transition: all 0.25s ease; }
                .wmap-legend-item:hover { color: var(--color-third); border-color: rgba(0,206,193,0.3); background: rgba(0,206,193,0.07); }
                .wmap-legend-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(0,206,193,0.7); flex-shrink: 0; }
                .wmap-legend-item:hover .wmap-legend-dot { background: #00CEC1; box-shadow: 0 0 5px rgba(0,206,193,0.5); }
            `}</style>
        </>
    );
};

const Timeline = () => {
    const [active, setActive] = useState(null);
    const [reached, setReached] = useState(-1);
    const outerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ['start start', 'end end'],
    });

    const lineWidth = useTransform(scrollYProgress, [0.01, 0.99], ['0%', '100%']);

    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            if (v < 0.01) { setActive(null); setReached(-1); return; }
            const ratio = Math.min((v - 0.01) / 0.98, 1);
            const i = Math.min(Math.floor(ratio * TIMELINE_EVENTS.length), TIMELINE_EVENTS.length - 1);
            setActive(i);
            setReached(prev => Math.max(prev, i));
        });
    }, [scrollYProgress]);

    const isUnlocked = (i) => i <= reached + 1;

    return (
        <div className="tl-outer" ref={outerRef}>
            <div className="tl-sticky">
                <div className="tl-inner">
                    <div className="tl-track">
                        <div className="tl-line-bg" />
                        <motion.div className="tl-line-fill" style={{ width: lineWidth }} />
                        {TIMELINE_EVENTS.map((ev, i) => (
                            <button
                                key={i}
                                className={`tl-node ${active === i ? 'tl-node--active' : ''} ${i <= reached ? 'tl-node--past' : ''} ${!isUnlocked(i) ? 'tl-node--locked' : ''}`}
                                onClick={() => { if (!isUnlocked(i)) return; setActive(i); setReached(prev => Math.max(prev, i)); }}
                                disabled={!isUnlocked(i)}
                            >
                                {active === i && <div className="tl-dot-glow" />}
                                <div className="tl-dot">
                                    {!isUnlocked(i) ? <div className="tl-dot-lock" /> : <div className="tl-dot-inner" />}
                                </div>
                                <span className="tl-year">{isUnlocked(i) ? ev.year : '—'}</span>
                                <span className="tl-label">{isUnlocked(i) ? ev.label : '...'}</span>
                            </button>
                        ))}
                    </div>
                    <div className="tl-content-area">
                        <AnimatePresence mode="wait">
                            {active === null ? (
                                <motion.div key="hint" className="tl-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '1.6rem' }}>↓</motion.div>
                                    <span>Scroll to explore our story</span>
                                </motion.div>
                            ) : (
                                <motion.div key={active} className="tl-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                                    <div className="tl-panel-inner">
                                        <span className="tl-panel-eyebrow">{String(active + 1).padStart(2, '0')} / {String(TIMELINE_EVENTS.length).padStart(2, '0')}</span>
                                        <h4 className="tl-panel-year-big">{TIMELINE_EVENTS[active].year}</h4>
                                        <h3 className="tl-panel-title">{TIMELINE_EVENTS[active].label}</h3>
                                        <p className="tl-panel-desc">{TIMELINE_EVENTS[active].description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GlanceSection = () => (
    <>
        <div className="glance-wrap">
            <motion.div className="glance-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="glance-eyebrow">Wink at a Glance</p>
                <h2 className="glance-title">What <span className="glance-accent">Defines</span> WINK</h2>
            </motion.div>
            <div className="glance-grid">
                {STATS.map((s, i) => (
                    <motion.div
                        key={i}
                        className={`glance-card glance-card--${s.style}`}
                        style={s.style === 'image' ? { '--card-bg': `url(${s.bgImage})` } : {}}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {s.style === 'lines' && <div className="glance-lines-bg">{[...Array(8)].map((_, li) => <span key={li} className="glance-line" style={{ '--li': li }} />)}</div>}
                        {s.style === 'image' && <div className="glance-img-overlay" />}
                        {s.style === 'geo' && (
                            <div className="glance-geo-bg">
                                <svg viewBox="0 0 200 280" fill="none" className="glance-geo-svg">
                                    <circle cx="160" cy="220" r="90" stroke="rgba(0,206,193,0.18)" strokeWidth="1.5"/>
                                    <circle cx="160" cy="220" r="60" stroke="rgba(0,206,193,0.12)" strokeWidth="1"/>
                                    <rect x="110" y="170" width="80" height="80" rx="4" stroke="rgba(0,206,193,0.2)" strokeWidth="1.2" transform="rotate(22 150 210)"/>
                                    <circle cx="60" cy="240" r="5" fill="rgba(0,206,193,0.35)"/>
                                    <circle cx="40" cy="260" r="2.5" fill="rgba(0,206,193,0.2)"/>
                                    <path d="M20 180 L50 130 L80 180 Z" stroke="rgba(0,206,193,0.15)" strokeWidth="1.2" fill="none"/>
                                </svg>
                            </div>
                        )}
                        <div className="glance-card-content">
                            <div className="glance-top">
                                {s.value && (
                                    <div className="glance-stat-row">
                                        <span className="glance-value">{s.value}</span>
                                        {s.label && <span className="glance-value-label">{s.label}</span>}
                                    </div>
                                )}
                                <span className="glance-card-title">{s.title}</span>
                                <p className="glance-desc">{s.desc}</p>
                            </div>
                            <div className="glance-bottom">
                                <span className="glance-arrow">
                                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 15L15 3M15 3H7M15 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
        <style>{`
            .glance-wrap { position: relative; z-index: 2; max-width: 1240px; margin: clamp(4rem,8vw,7rem) auto 0; display: flex; flex-direction: column; gap: 2.5rem; }
            .glance-header { display: flex; flex-direction: column; gap: 0.3rem; }
            .glance-value { font-size: clamp(2.2rem,3.5vw,2rem); font-weight: 800; letter-spacing: -0.04em; color: #ffffff; line-height: 1; font-family: 'Montserrat', sans-serif; }
            .glance-card-title { font-size: clamp(2.2rem,3.5vw,2rem); font-weight: 800; letter-spacing: -0.04em; color: #ffffff; line-height: 1; font-family: 'Montserrat', sans-serif; }
            .glance-accent { color: var(--color-one,#00CEC1); }
            .glance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
            .glance-card { background: #07283d; border-radius: 18px; min-height: 280px; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; cursor: default; }
            .glance-card:hover { transform: translateY(-6px); box-shadow: 0 28px 70px rgba(0,0,0,0.4); }
            .glance-lines-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
            .glance-line { position: absolute; left: calc(-40% + var(--li) * 18%); top: -20%; width: 3px; height: 160%; background: rgba(0,206,193,0.12); transform: rotate(-28deg); transform-origin: top center; border-radius: 2px; transition: background 0.35s ease; }
            .glance-line:nth-child(odd) { width: 6px; background: rgba(0,206,193,0.07); }
            .glance-card--lines:hover .glance-line { background: rgba(0,206,193,0.22); }
            .glance-card--lines:hover .glance-line:nth-child(odd) { background: rgba(0,206,193,0.12); }
            .glance-card--image { background: #07283d; background-image: var(--card-bg); background-size: cover; background-position: center; }
            .glance-img-overlay { position: absolute; inset: 0; z-index: 0; background: linear-gradient(to right, rgba(7,40,61,0.88) 0%, rgba(7,40,61,0.6) 55%, rgba(7,40,61,0.15) 100%); border-radius: 18px; }
            .glance-geo-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
            .glance-geo-svg { position: absolute; bottom: -10px; right: -10px; width: 75%; height: auto; }
            .glance-card-content { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 2.2rem 1.75rem 1.6rem; }
            .glance-top { display: flex; flex-direction: column; gap: 0.5rem; }
            .glance-stat-row { display: flex; align-items: baseline; gap: 0.5rem; }
            ..glance-value { font-size: 1rem; font-weight: 800; letter-spacing: 0.04em; color: #0073a9; line-height: 1; font-family: 'Montserrat', sans-serif; }
             .glance-value-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: var(#00CEC1); opacity: 0.6; font-family: 'Montserrat', sans-serif; }
            .glance-desc { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0.3rem 0 0; max-width: 160px; font-family: 'Montserrat', sans-serif; }
            .glance-bottom { display: flex; align-items: center; margin-top: 1.5rem; }
            .glance-arrow { width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.65); transition: all 0.25s ease; flex-shrink: 0; }
            .glance-card:hover .glance-arrow { border-color: var(--color-one,#00CEC1); color: var(--color-one,#00CEC1); background: rgba(0,206,193,0.12); }
            @media (max-width: 1000px) { .glance-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .glance-grid { grid-template-columns: 1fr; } }
        `}</style>
    </>
);

const blocks = [
    { id: 'B1', side: 'left',  tag: ' Core Statement',     title: 'Building the Next Generation of Growth Platforms', short: 'Wink is building the next generation of international growth platforms connecting high-growth markets through strategic trade and investment ecosystems.', full: null, image: '/2.png' },
    { id: 'B2', side: 'right', tag: ' Programs & Approach', title: 'Structured Programs. Measurable Impact.',           short: 'We design and operate structured international programs that bring together institutions, companies, investors, and decision-makers — transforming cross-border ambition into measurable economic impact.', full: 'From multi-market trade acceleration initiatives and curated business forums to capital connection programs powered by smart technology, Wink goes beyond traditional matchmaking to architect scalable pathways for market expansion and long-term growth.', image: '/3.png' },
    { id: 'B3', side: 'left',  tag: ' Differentiation',     title: 'Precision. Networks. Intelligence.',               short: 'What differentiates Wink is our ability to combine curated networks, disciplined execution, and technology-driven intelligence to structure international opportunities with precision and purpose.', full: null, image: '/4.png' },
    { id: 'B4', side: 'right', tag: ' Global Footprint',     title: 'Trusted Global Operator',                         short: 'With active operations across the Middle East, Africa, Europe, and other dynamic regions, Wink is evolving into a trusted global operator shaping how markets connect, collaborate, and grow.', full: null, image: '/5.png' },
];

const AboutBlock = ({ block }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <motion.div className="abt-row" data-side={block.side} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
            <div className="abt-row__visual">
                <img src={block.image} alt={block.title} className="abt-row__img" />
                <div className={`abt-row__img-fade abt-row__img-fade--${block.side}`} />
            </div>
            <div className="abt-row__text">
                <span className="abt-row__tag">{block.tag}</span>
                <h3 className="abt-row__title">{block.title}</h3>
                <div className="abt-row__rule" />
                <p className="abt-row__short">{block.short}</p>
                <AnimatePresence>
                    {expanded && block.full && (
                        <motion.p className="abt-row__expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                            {block.full}
                        </motion.p>
                    )}
                </AnimatePresence>
                {block.full && (
                    <button className="abt-row__more" onClick={() => setExpanded(v => !v)}>
                        {expanded ? 'Read less ↑' : 'Read more ↓'}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const HeroSection = () => (
    <>
        <section className="hero-section">
            <div className="hero-bg">
                <div className="hero-bg__orb-a" /><div className="hero-bg__orb-b" />
                <div className="hero-bg__dots" /><div className="hero-bg__ring" /><div className="hero-bg__ring-2" />
            </div>
            <div className="hero-inner">
                <motion.div className="hero-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="hero-eyebrow__line" />
                    <span className="hero-eyebrow__text">International Growth Platform Builder</span>
                </motion.div>
                <motion.h1 className="hero-headline" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                    WINK —<br /><em>International</em><br />Growth Platform
                </motion.h1>
                <motion.p className="hero-subline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                    Connecting decision-makers through carefully curated business experiences.
                </motion.p>
                <motion.div className="hero-cta-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <a href="/contact" className="hero-cta__primary">Start Your Program →</a>
                    <a href="#about" className="hero-cta__secondary">Connect</a>
                </motion.div>
            </div>
        </section>
        <style>{`
            .hero-section { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: clamp(5rem,9vw,9rem) clamp(1.5rem,7vw,8rem) clamp(3rem,5vw,5rem); overflow: hidden; background-color: var(--color-two); }
            .hero-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
            .hero-bg__orb-a { position: absolute; border-radius: 50%; filter: blur(120px); width: 70vw; height: 70vw; top: -20%; left: -15%; background: radial-gradient(circle, rgba(0,206,193,0.07) 0%, transparent 70%); }
            .hero-bg__orb-b { position: absolute; border-radius: 50%; filter: blur(100px); width: 50vw; height: 50vw; bottom: -10%; right: -10%; background: radial-gradient(circle, rgba(0,63,92,0.25) 0%, transparent 70%); }
            .hero-bg__dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,206,193,0.045) 1px, transparent 1px); background-size: 38px 38px; }
            .hero-bg__ring { position: absolute; width: min(600px,60vw); height: min(600px,60vw); border-radius: 50%; border: 1px solid rgba(0,206,193,0.06); top: 50%; right: -10%; transform: translateY(-50%); }
            .hero-bg__ring-2 { position: absolute; width: min(900px,85vw); height: min(900px,85vw); border-radius: 50%; border: 1px solid rgba(0,206,193,0.03); top: 50%; right: -25%; transform: translateY(-50%); }
            .hero-inner { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; width: 100%; }
            .hero-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.6rem; }
            .hero-eyebrow__line { width: 28px; height: 1px; background: var(--color-one,#00cec1); opacity: 0.6; }
            .hero-eyebrow__text { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.38em; color: var(--color-one,#00cec1); opacity: 0.7; }
            .hero-headline { font-size: clamp(2.2rem,5.5vw,4.8rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.04em; color: var(--color-third); text-transform: uppercase; margin: 0 0 1.4rem; }
            .hero-headline em { font-style: normal; color: var(--color-one,#00cec1); position: relative; display: inline-block; }
            .hero-subline { font-size: clamp(0.85rem,1.1vw,1rem); color: var(--color-third); opacity: 0.6; line-height: 1.8; max-width: 440px; margin: 0 0 2.4rem; }
            .hero-cta-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
            .hero-cta__primary { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2.2rem; background: var(--color-one,#00cec1); color: rgba(4,18,28,1); font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; border-radius: 6px; border: none; cursor: pointer; transition: all 0.25s; text-decoration: none; }
            .hero-cta__primary:hover { background: #00ede0; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,206,193,0.3); }
            .hero-cta__secondary { font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; color: var(--color-third); opacity: 0.4; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 2px; transition: all 0.22s; }
            .hero-cta__secondary:hover { opacity: 0.8; border-color: rgba(255,255,255,0.3); }
            @media (max-width: 860px) { .hero-headline { font-size: clamp(2rem,10vw,3.5rem); } }
        `}</style>
    </>
);

const AboutUsSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

    return (
        <>
            <section className="abt-section" ref={ref} id="about">
                <motion.div className="abt-bg" style={{ y: bgY }}>
                    <div className="abt-bg__a" /><div className="abt-bg__b" /><div className="abt-bg__dots" />
                </motion.div>

                <div className="abt-header-block">
                    <motion.span className="abt-header__eye" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        What We Do / About the Company
                    </motion.span>
                    <motion.h2 className="abt-header__h" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}>
                        Our<br /><em>Story</em>
                    </motion.h2>
                </div>

                <Timeline />

                <div className="abt-content-block">
                    <div className="abt-rows">
                        {blocks.map((block) => <AboutBlock key={block.id} block={block} />)}
                    </div>

                    <GlanceSection />

                    <motion.div className="abt-tagline" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                        <div className="abt-tagline-left">
                            <p className="abt-tagline__q">At Wink, growth is not accidental.<br />It is architected.</p>
                            <a href="/contact" className="abt-cta__primary">Work With Us →</a>
                        </div>
                        <WorldMap />
                    </motion.div>
                </div>
            </section>

            <style>{`
                .abt-section { position: relative; overflow: visible; background-color: var(--color-two); transition: background-color 0.3s ease; }
                .abt-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
                .abt-bg__a { position: absolute; border-radius: 50%; filter: blur(100px); width: 60vw; height: 60vw; top: 0; left: -10%; background: radial-gradient(circle, rgba(0,206,193,0.055) 0%, transparent 70%); }
                .abt-bg__b { position: absolute; border-radius: 50%; filter: blur(100px); width: 50vw; height: 50vw; bottom: 0; right: -5%; background: radial-gradient(circle, rgba(0,63,92,0.2) 0%, transparent 70%); }
                .abt-bg__dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,206,193,0.045) 1px, transparent 1px); background-size: 38px 38px; }

                .abt-header-block { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; padding: clamp(4rem,7vw,7rem) clamp(1.5rem,7vw,8rem) clamp(3rem,5vw,4rem); display: flex; flex-direction: column; gap: 1.2rem; }
                .abt-header__eye { display: block; font-size: 0.67rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.38em; color: var(--color-third); opacity: 0.5; }
                .abt-header__h { font-size: clamp(3rem,7vw,6.5rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.04em; color: var(--color-third); text-transform: uppercase; margin: 0; }
                .abt-header__h em { color: var(--color-third); font-style: normal; }

                .tl-outer { position: relative; height: ${(TIMELINE_EVENTS.length + 1) * 100}vh; width: 100%; z-index: 2; }
                .tl-sticky { position: sticky; top: 0; height: 100vh; width: 100%; background: var(--color-two, #020d14); display: flex; align-items: center; justify-content: center; z-index: 2; }
                .tl-inner { width: 100%; max-width: 1240px; padding: 0 clamp(1.5rem,7vw,8rem); display: flex; flex-direction: column; gap: 2.5rem; }
                .tl-track { position: relative; display: flex; align-items: flex-start; justify-content: space-between; padding: 2rem 0 0; flex-shrink: 0; }
                .tl-line-bg { position: absolute; top: 2.72rem; left: 0; right: 0; height: 1px; background: rgba(0,206,193,0.1); }
                .tl-line-fill { position: absolute; top: 2.72rem; left: 0; height: 1px; background: linear-gradient(90deg, var(--color-one,#00CEC1), rgba(0,206,193,0.35)); }
                .tl-node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.55rem; flex: 1; background: none; border: none; cursor: pointer; padding: 0; transition: all 0.35s ease; }
                .tl-node--locked { opacity: 0.18; filter: blur(0.6px); cursor: default; }
                .tl-dot-glow { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); width: 64px; height: 64px; border-radius: 50%; background: radial-gradient(circle, rgba(0,206,193,0.28) 0%, rgba(0,206,193,0.06) 55%, transparent 72%); pointer-events: none; z-index: 0; animation: tlGlow 2.2s ease-in-out infinite; }
                @keyframes tlGlow { 0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.65; } 50% { transform: translateX(-50%) scale(1.3); opacity: 1; } }
                .tl-dot { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid rgba(0,206,193,0.2); display: flex; align-items: center; justify-content: center; background: var(--color-two,#020d14); transition: all 0.4s ease; position: relative; z-index: 1; }
                .tl-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: rgba(0,206,193,0.35); transition: all 0.35s ease; }
                .tl-dot-lock { width: 5px; height: 5px; border-radius: 1px; background: rgba(0,206,193,0.15); }
                .tl-node--active .tl-dot { border-color: var(--color-one,#00CEC1); box-shadow: 0 0 0 5px rgba(0,206,193,0.12), 0 0 22px rgba(0,206,193,0.35); }
                .tl-node--active .tl-dot-inner { background: var(--color-one,#00CEC1); box-shadow: 0 0 12px rgba(0,206,193,0.85); width: 10px; height: 10px; }
                .tl-node--past .tl-dot { border-color: rgba(0,206,193,0.45); }
                .tl-node--past .tl-dot-inner { background: rgba(0,206,193,0.55); }
                .tl-year { font-size: 0.75rem; font-weight: 900; letter-spacing: 0.06em; color: var(--color-third); opacity: 0.28; transition: all 0.35s ease; font-family: 'Montserrat', sans-serif; }
                .tl-node--active .tl-year { color: var(--color-one,#00CEC1); opacity: 1; }
                .tl-node--past .tl-year { opacity: 0.55; }
                .tl-label { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-third); opacity: 0.18; text-align: center; max-width: 85px; line-height: 1.4; transition: all 0.35s ease; font-family: 'Montserrat', sans-serif; }
                .tl-node--active .tl-label { opacity: 0.9; }
                .tl-node--past .tl-label { opacity: 0.4; }
                .tl-content-area { min-height: 280px; display: flex; flex-direction: column; justify-content: center; }
                .tl-hint { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; color: var(--color-third); opacity: 0.3; font-family: 'Montserrat', sans-serif; padding: 2rem 0; }
                .tl-hint span:last-child { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; }
                .tl-panel { border-top: 1px solid rgba(0,206,193,0.1); }
                .tl-panel-inner { background: rgba(0,206,193,0.025); border: 1px solid rgba(0,206,193,0.07); border-top: 2px solid var(--color-one,#00CEC1); border-radius: 0 0 12px 12px; padding: 2.5rem 2.8rem; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; }
                .tl-panel-inner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 50% 40% at 6% 12%, rgba(0,206,193,0.08) 0%, transparent 58%); pointer-events: none; }
                .tl-panel-eyebrow { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-one,#00CEC1); opacity: 0.65; font-family: 'Montserrat', sans-serif; position: relative; z-index: 1; }
                .tl-panel-year-big { font-size: clamp(3rem,6vw,5.5rem); font-weight: 900; letter-spacing: -0.04em; color: var(--color-third); line-height: 0.88; margin: 0; opacity: 0.1; font-family: 'Montserrat', sans-serif; }
                .tl-panel-title { font-size: clamp(1.3rem,2.5vw,2rem); font-weight: 900; color: var(--color-third); margin: 0; letter-spacing: -0.025em; text-transform: uppercase; line-height: 1.1; font-family: 'Montserrat', sans-serif; position: relative; z-index: 1; }
                .tl-panel-desc { font-size: clamp(0.88rem,1.2vw,1rem); color: var(--color-third); opacity: 0.58; line-height: 1.9; margin: 0; max-width: 700px; font-family: 'Montserrat', sans-serif; position: relative; z-index: 1; }

                .abt-content-block { position: relative; z-index: 2; padding: clamp(4rem,7vw,7rem) clamp(1.5rem,7vw,8rem) clamp(6rem,11vw,11rem); }
                .abt-rows { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3rem,6vw,5rem); }
                .abt-row { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: 340px; border-radius: 12px; overflow: hidden; }
                .abt-row[data-side="left"] .abt-row__visual { order: 1; }
                .abt-row[data-side="left"] .abt-row__text { order: 2; }
                .abt-row[data-side="right"] .abt-row__visual { order: 2; }
                .abt-row[data-side="right"] .abt-row__text { order: 1; }
                .abt-row__visual { position: relative; overflow: hidden; min-height: 280px; }
                .abt-row__img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.8s ease; }
                .abt-row:hover .abt-row__img { transform: scale(1.04); }
                .abt-row__img-fade { position: absolute; inset: 0; pointer-events: none; }
                .abt-row__img-fade--left { background: linear-gradient(to right, transparent 30%, var(--color-two,#020d14) 100%); }
                .abt-row__img-fade--right { background: linear-gradient(to left, transparent 30%, var(--color-two,#020d14) 100%); }
                .abt-row__text { display: flex; flex-direction: column; justify-content: center; gap: 0; padding: 2.5rem 2.8rem; background: var(--color-two,#020d14); }
                .abt-row__tag { display: block; font-size: 0.63rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.22em; color: var(--color-third); opacity: 0.5; margin-bottom: 0.85rem; }
                .abt-row__title { font-size: clamp(1.25rem,2.2vw,1.85rem); font-weight: 800; color: var(--color-third); line-height: 1.15; letter-spacing: -0.03em; margin: 0 0 1.2rem; }
                .abt-row__rule { width: 34px; height: 2px; background: linear-gradient(90deg,var(--color-one,#00cec1),transparent); border-radius: 2px; margin-bottom: 1.4rem; }
                .abt-row__short { font-size: clamp(0.84rem,1vw,0.96rem); color: var(--color-third); line-height: 1.85; margin: 0; opacity: 0.7; }
                .abt-row__expanded { font-size: clamp(0.84rem,1vw,0.96rem); color: var(--color-third); line-height: 1.85; margin-top: 1rem; overflow: hidden; opacity: 0.7; }
                .abt-row__more { margin-top: 1.3rem; background: none; border: none; padding: 0; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-third); opacity: 0.48; cursor: pointer; transition: opacity 0.2s; align-self: flex-start; }
                .abt-row__more:hover { opacity: 1; }

                .abt-tagline { max-width: 1240px; margin: clamp(5rem,9vw,9rem) auto 0; padding-top: clamp(2.5rem,5vw,5rem); border-top: 1px solid rgba(0,206,193,0.1); display: flex; align-items: center; gap: 4rem; }
                .abt-tagline-left { display: flex; flex-direction: column; gap: 1.5rem; flex: 1; min-width: 0; }
                .abt-tagline__q { font-size: clamp(1.05rem,2.1vw,1.75rem); font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-third); line-height: 1.2; margin: 0; }
                .abt-cta__primary { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.9rem 2.2rem; background: var(--color-one,#00cec1); color: rgba(4,18,28,1); font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; border-radius: 6px; border: none; cursor: pointer; transition: all 0.25s; text-decoration: none; width: fit-content; }
                .abt-cta__primary:hover { background: #00ede0; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,206,193,0.28); }

                @media (max-width: 860px) {
                    .abt-row { grid-template-columns: 1fr; }
                    .abt-row[data-side="left"] .abt-row__visual, .abt-row[data-side="right"] .abt-row__visual { order: 1; min-height: 200px; }
                    .abt-row[data-side="left"] .abt-row__text, .abt-row[data-side="right"] .abt-row__text { order: 2; }
                    .abt-row__img-fade--left, .abt-row__img-fade--right { background: linear-gradient(to bottom, transparent 40%, var(--color-two,#020d14) 100%); }
                    .abt-tagline { flex-direction: column; gap: 2rem; }
                    .wmap-wrap { width: 100%; }
                    .tl-label { display: none; }
                    .tl-panel-inner { padding: 1.5rem 1.25rem; }
                }
            `}</style>
        </>
    );
};

const AboutPage = () => (
    <>
        <HeroSection />
        <AboutUsSection />
    </>
);

export default AboutPage;