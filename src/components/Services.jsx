import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const expertises = [
    {
        id: '01',
        label: 'Trade',
        title: 'Cross-Border Trade Acceleration',
        description: 'We design and operate structured international trade programs that enable institutions and companies to access new markets with precision and strategic intent.',
        capLabel: 'Core capabilities include',
        capabilities: [
            'Multi-country trade missions and roadshows',
            'Sector-focused export acceleration programs',
            'Buyer sourcing, qualification, and alignment',
            'Trade corridor structuring across high-growth regions',
            'Structured opportunity tracking and follow-up',
        ],
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.5"/>
                <ellipse cx="24" cy="24" rx="8.5" ry="17" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 15h28M10 33h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
            </svg>
        ),
    },
    {
        id: '02',
        label: 'Capital',
        title: 'Strategic Capital Connections',
        description: 'We facilitate curated capital connection programs that bring together growth-ready companies and qualified investors within structured, outcome-driven environments.',
        capLabel: 'Core capabilities include',
        capabilities: [
            'Investor roundtables and private capital sessions',
            'Project-investor alignment and positioning support',
            'Cross-border investment engagement programs',
            'Capital-focused business forums',
        ],
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <circle cx="12" cy="34" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="24" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="38" cy="32" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="14" x2="32" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="29" x2="18.5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="30" y1="28" x2="18" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        id: '03',
        label: 'Programs',
        title: 'Program Architecture & Execution',
        description: 'We go beyond event management to architect high-impact international business environments designed to produce measurable commercial results.',
        capLabel: 'Core capabilities include',
        capabilities: [
            'Structured engagement design aligned with defined objectives',
            'Precision agenda building and meeting orchestration',
            'Delegation coordination and executive-level facilitation',
            'Outcome-oriented reporting frameworks',
        ],
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <rect x="8" y="8" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="27" y="8" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="8" y="27" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="27" y="27" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
                <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
            </svg>
        ),
    },
    {
        id: '04',
        label: 'Technology',
        title: 'Technology-Enabled Precision',
        description: 'Our programs are enhanced by smart infrastructure that increases efficiency, precision, and scalability.',
        capLabel: 'Core capabilities include',
        capabilities: [
            'Data-driven participant profiling',
            'Matching intelligence and optimization',
            'Agenda automation and workflow coordination',
            'Structured post-program opportunity monitoring',
        ],
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3.5 3.5"/>
                <line x1="24" y1="7" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="24" y1="36" x2="24" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="7" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="36" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="2" fill="currentColor"/>
            </svg>
        ),
    },
    {
        id: '05',
        label: 'Markets',
        title: 'High-Growth Market Specialization',
        description: 'Wink operates across dynamic and emerging markets, bringing structured growth methodologies to diverse sectors and regional contexts.',
        capLabel: 'Active footprint includes',
        capabilities: ['Middle East', 'Africa', 'Europe', 'Americas', 'Asia', 'Strategic emerging corridors'],
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
                <polyline points="7,36 16,22 24,29 34,14 41,19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="41" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="41" x2="41" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="7" y1="12" x2="7" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
    },
];

const Modal = ({ item, onClose }) => (
    <motion.div
        className="ep-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div
            className="ep-modal"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
        >
            <button className="ep-modal-close" onClick={onClose}>✕</button>
            <div className="ep-modal-icon">{item.icon}</div>
            <span className="ep-modal-badge">{item.label}</span>
            <h2 className="ep-modal-title">{item.title}</h2>
            <div className="ep-modal-rule" />
            <p className="ep-modal-desc">{item.description}</p>
            <p className="ep-modal-cap-label">{item.capLabel}</p>
            <ul className="ep-modal-list">
                {item.capabilities.map((c, i) => (
                    <motion.li key={i}
                               initial={{ opacity: 0, x: -8 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.15 + i * 0.05 }}
                    >{c}</motion.li>
                ))}
            </ul>
        </motion.div>
    </motion.div>
);

export default function ExpertisePage() {
    const [active, setActive] = useState(null);

    return (
        <div className="ep-page">
            <motion.div
                className="ep-hero"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="ep-eyebrow">Our Expertise</span>
                <h1 className="ep-headline">What We <em>Deliver</em></h1>
            </motion.div>

            <div className="ep-track">
                {expertises.map((item, i) => (
                    <motion.div
                        key={item.id}
                        className="ep-pill"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setActive(item)}
                    >
                        <div className="ep-pill-icon">{item.icon}</div>
                        <div className="ep-pill-body">
                            <span className="ep-pill-label">{item.label.toUpperCase()}</span>
                            <p className="ep-pill-title">{item.title}</p>
                        </div>
                        <span className="ep-pill-arrow">↗</span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {active && <Modal item={active} onClose={() => setActive(null)} />}
            </AnimatePresence>

            <style>{`
        :root {
          --ep-bg: #002e43;
          --ep-modal-bg: #071520;
          --ep-text: #ffffff;
          --ep-text-muted: rgba(255,255,255,0.35);
          --ep-text-body: rgba(255,255,255,0.6);
          --ep-text-cap: rgba(255,255,255,0.7);
          --ep-pill-bg: rgba(255,255,255,0.03);
          --ep-overlay-bg: rgba(2,13,20,0.88);
        }

        [data-theme="light"] {
          --ep-bg: #D1DBDC;
          --ep-modal-bg: #bfcccd;
          --ep-text: #020d14;
          --ep-text-muted: rgba(2,13,20,0.45);
          --ep-text-body: rgba(2,13,20,0.65);
          --ep-text-cap: rgba(2,13,20,0.75);
          --ep-pill-bg: rgba(2,13,20,0.04);
          --ep-overlay-bg: rgba(180,195,196,0.88);
        }

        .ep-page {
          min-height: 100vh;
          background: var(--ep-bg);
          color: var(--ep-text);
          font-family: 'Montserrat', sans-serif;
          position: relative;
          padding-top: 90px;
          padding-bottom: 8rem;
          overflow: hidden;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .ep-hero {
          position: relative; z-index: 1;
          text-align: center;
          padding: 4rem 2rem 3rem;
        }
        .ep-eyebrow {
          display: block; font-size: 1.5rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.32em;
          color: var(--color-third);
          margin-bottom: 0.9rem;
        }
        .ep-headline {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900; color: var(--color-third);
          letter-spacing: -0.03em; margin: 0; line-height: 1.1;
        }
        .ep-headline em {
          font-style: normal; color: var(--color-one, #00cec1);
        }

        .ep-track {
                  position: relative;
                  z-index: 1;
                  display: flex;
                  gap: 1rem;
                  padding: 80px 5vw;
                  margin-top: -60px;
                  margin-bottom: -60px;
                  justify-content: center;
                  flex-wrap: nowrap;
                  overflow-x: auto;
                  scrollbar-width: none;
                }
                .ep-track::-webkit-scrollbar { display: none; }

        .ep-pill {
          display: flex; flex-direction: column;
          justify-content: space-between;
          width: 180px; min-width: 160px;
          min-height: 280px;
          border-radius: 999px;
          padding: 2rem 1.4rem;
          cursor: pointer;
          border: 1px solid rgba(0,206,193,0.18);
          background: var(--ep-pill-bg);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
          flex-shrink: 0;
          overflow: visible;
        }
        .ep-pill:hover {
          border-color: rgba(0, 206, 193, 0.7);
          background: rgba(0, 206, 193, 0.45);
          transform: translateY(-6px);
          box-shadow:
            0 0 50px 0 rgba(0, 206, 193, 0.6),
            0 20px 60px 0 rgba(0, 206, 193, 0.3);
          clip-path: none !important;
        }

        .ep-pill-icon {
          width: 44px; height: 44px;
          color: var(--color-one, #00cec1);
          opacity: 0.6;
          margin: 0 auto;
          transition: opacity 0.3s;
        }
        .ep-pill:hover .ep-pill-icon { opacity: 0.9; }

        .ep-pill-body { text-align: center; flex: 1; padding: 1.2rem 0 0.6rem; }
        .ep-pill-label {
          display: block; font-size: 0.80rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ep-text-muted);
          margin-bottom: 0.5rem;
        }
        .ep-pill-title {
          font-size: 1rem; font-weight: 700;
          color: var(--color-third); line-height: 1.35;
          margin: 0;
        }

        .ep-pill-arrow {
          display: block; text-align: center;
          font-size: 1rem;
          color: var(--color-third);
          transition: color 0.2s, transform 0.2s;
        }
        .ep-pill:hover .ep-pill-arrow {
          color: var(--ep-text);
          transform: translate(2px, -2px);
        }

        .ep-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: var(--ep-overlay-bg);
          backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .ep-modal {
          background: #002e43;
          border: 1px solid rgba(0,206,193,0.18);
          border-radius: 24px;
          padding: 3rem 3.5rem;
          max-width: 560px; width: 100%;
          position: relative;
          max-height: 85vh; overflow-y: auto;
          scrollbar-width: none;
          transition: background 0.3s ease;
        }
        .ep-modal::-webkit-scrollbar { display: none; }
        .ep-modal-close {
          position: absolute; top: 1.4rem; right: 1.4rem;
          background: none; border: 1px solid rgba(0,206,193,0.2);
          color: var(--ep-text-muted);
          width: 32px; height: 32px; border-radius: 50%;
          cursor: pointer; font-size: 0.8rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .ep-modal-close:hover { color: var(--ep-text); border-color: rgba(0,206,193,0.5); }
        .ep-modal-icon {
          width: 52px; height: 52px;
          color: var(--color-one, #00cec1); opacity: 0.7;
          margin-bottom: 1.2rem;
        }
        .ep-modal-badge {
          display: inline-block;
          font-size: 0.62rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--color-one, #00cec1);
          padding: 0.22rem 0.6rem;
          border: 1px solid rgba(0,206,193,0.2);
          border-radius: 4px; background: rgba(0,206,193,0.07);
          margin-bottom: 1rem;
        }
        .ep-modal-title {
          font-size: clamp(1.15rem, 2.5vw, 1.55rem);
          font-weight: 800; color: var(--ep-text);
          letter-spacing: -0.025em; margin: 0 0 1rem; line-height: 1.2;
        }
        .ep-modal-rule {
          width: 34px; height: 2px;
          background: linear-gradient(90deg, var(--color-one, #00cec1), transparent);
          border-radius: 2px; margin-bottom: 1.1rem;
        }
        .ep-modal-desc {
          font-size: 0.88rem; color: var(--ep-text-body);
          line-height: 1.78; margin: 0 0 1.3rem;
        }
        .ep-modal-cap-label {
          font-size: 0.65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--color-one, #00cec1); opacity: 0.7;
          margin: 0 0 0.6rem;
        }
        .ep-modal-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .ep-modal-list li {
          font-size: 0.84rem; font-weight: 600;
          color: var(--ep-text-cap);
          line-height: 1.5; padding-left: 1.1rem; position: relative;
        }
        .ep-modal-list li::before {
          content: '—'; position: absolute; left: 0;
          color: var(--color-one, #00cec1); font-weight: 400;
        }

        @media (max-width: 768px) {
          .ep-track { flex-wrap: wrap; justify-content: center; }
          .ep-pill { width: 140px; min-height: 220px; }
          .ep-modal { padding: 2rem; }
        }
      `}</style>
        </div>
    );
}