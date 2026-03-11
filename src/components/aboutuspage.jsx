import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const IllustrationGlobe = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2"/>
        <ellipse cx="50" cy="50" rx="18" ry="38" stroke="currentColor" strokeWidth="1.2"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 30 Q50 20 80 30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
        <path d="M20 70 Q50 80 80 70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
        <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.6"/>
        <circle cx="26" cy="38" r="2.5" fill="currentColor" opacity="0.4"/>
        <circle cx="74" cy="62" r="2.5" fill="currentColor" opacity="0.4"/>
        <line x1="28" y1="38" x2="48" y2="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="52" y1="50" x2="72" y2="62" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
    </svg>
);

const IllustrationNetwork = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <circle cx="50" cy="18" r="8" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="18" cy="66" r="8" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="82" cy="66" r="8" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="50" cy="18" r="15" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3"/>
        <circle cx="18" cy="66" r="15" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3"/>
        <circle cx="82" cy="66" r="15" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3"/>
        <line x1="50" y1="26" x2="25" y2="58" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="50" y1="26" x2="75" y2="58" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="26" y1="66" x2="74" y2="66" stroke="currentColor" strokeWidth="1.1"/>
        <circle cx="50" cy="42" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="37" cy="56" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="63" cy="56" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
);

const IllustrationTarget = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4"/>
        <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.7"/>
        <line x1="50" y1="12" x2="50" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="80" x2="50" y2="88" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="80" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M72 28 L60 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="74" cy="26" r="3" fill="currentColor" opacity="0.5"/>
    </svg>
);

const IllustrationGrowth = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <line x1="14" y1="86" x2="86" y2="86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="14" x2="14" y2="86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="14,72 30,55 46,62 62,38 86,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="72" r="3.5" fill="currentColor" opacity="0.6"/>
        <circle cx="30" cy="55" r="3.5" fill="currentColor" opacity="0.6"/>
        <circle cx="46" cy="62" r="3.5" fill="currentColor" opacity="0.6"/>
        <circle cx="62" cy="38" r="3.5" fill="currentColor" opacity="0.6"/>
        <circle cx="86" cy="22" r="5" fill="currentColor" opacity="0.8"/>
        <circle cx="86" cy="22" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="30" y1="55" x2="30" y2="86" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3"/>
        <line x1="62" y1="38" x2="62" y2="86" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3"/>
    </svg>
);

const blocks = [
    {
        id: 'B1',
        side: 'left',
        tag: 'Block 1 — Core Statement',
        title: 'Building the Next Generation of Growth Platforms',
        short: 'Wink is building the next generation of international growth platforms connecting high-growth markets through strategic trade and investment ecosystems.',
        full: null,
        Illustration: IllustrationGlobe,
    },
    {
        id: 'B2',
        side: 'right',
        tag: 'Block 2 — Programs & Approach',
        title: 'Structured Programs. Measurable Impact.',
        short: 'We design and operate structured international programs that bring together institutions, companies, investors, and decision-makers — transforming cross-border ambition into measurable economic impact.',
        full: 'From multi-market trade acceleration initiatives and curated business forums to capital connection programs powered by smart technology, Wink goes beyond traditional matchmaking to architect scalable pathways for market expansion and long-term growth.',
        Illustration: IllustrationNetwork,
    },
    {
        id: 'B3',
        side: 'left',
        tag: 'Block 3 — Differentiation',
        title: 'Precision. Networks. Intelligence.',
        short: 'What differentiates Wink is our ability to combine curated networks, disciplined execution, and technology-driven intelligence to structure international opportunities with precision and purpose.',
        full: null,
        Illustration: IllustrationTarget,
    },
    {
        id: 'B4',
        side: 'right',
        tag: 'Block 4 — Global Footprint / Final Punch',
        title: 'Trusted Global Operator',
        short: 'With active operations across the Middle East, Africa, Europe, and other dynamic regions, Wink is evolving into a trusted global operator shaping how markets connect, collaborate, and grow.',
        full: null,
        Illustration: IllustrationGrowth,
    },
];

const AboutBlock = ({ block }) => {
    const [expanded, setExpanded] = useState(false);
    const { Illustration } = block;

    return (
        <motion.div
            className="abt-row"
            data-side={block.side}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="abt-row__visual">
                <div className="abt-row__illus-wrap">
                    <Illustration />
                </div>
            </div>
            <div className="abt-row__text">
                <span className="abt-row__tag">{block.tag}</span>
                <h3 className="abt-row__title">{block.title}</h3>
                <div className="abt-row__rule" />
                <p className="abt-row__short">{block.short}</p>
                <AnimatePresence>
                    {expanded && block.full && (
                        <motion.p
                            className="abt-row__expanded"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        >
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
        <style>{`
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(5rem, 9vw, 9rem) clamp(1.5rem, 7vw, 8rem) clamp(3rem, 5vw, 5rem);
        overflow: hidden;
        background-color: var(--color-two);
      }
      .hero-bg {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
      }
      .hero-bg__orb-a {
        position: absolute; border-radius: 50%; filter: blur(120px);
        width: 70vw; height: 70vw; top: -20%; left: -15%;
        background: radial-gradient(circle, rgba(0,206,193,0.07) 0%, transparent 70%);
      }
      .hero-bg__orb-b {
        position: absolute; border-radius: 50%; filter: blur(100px);
        width: 50vw; height: 50vw; bottom: -10%; right: -10%;
        background: radial-gradient(circle, rgba(0,63,92,0.25) 0%, transparent 70%);
      }
      .hero-bg__dots {
        position: absolute; inset: 0;
        background-image: radial-gradient(circle, rgba(0,206,193,0.045) 1px, transparent 1px);
        background-size: 38px 38px;
      }
      .hero-bg__ring {
        position: absolute;
        width: min(600px, 60vw); height: min(600px, 60vw);
        border-radius: 50%;
        border: 1px solid rgba(0,206,193,0.06);
        top: 50%; right: -10%;
        transform: translateY(-50%);
      }
      .hero-bg__ring-2 {
        position: absolute;
        width: min(900px, 85vw); height: min(900px, 85vw);
        border-radius: 50%;
        border: 1px solid rgba(0,206,193,0.03);
        top: 50%; right: -25%;
        transform: translateY(-50%);
      }
      .hero-inner {
        position: relative; z-index: 2;
        max-width: 1240px; margin: 0 auto; width: 100%;
      }
      .hero-eyebrow {
        display: flex; align-items: center; gap: 0.75rem;
        margin-bottom: 1.6rem;
      }
      .hero-eyebrow__line {
        width: 28px; height: 1px;
        background: var(--color-one, #00cec1);
        opacity: 0.6;
      }
      .hero-eyebrow__text {
        font-size: 0.65rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.38em;
        color: var(--color-one, #00cec1); opacity: 0.7;
      }
      .hero-headline {
        font-size: clamp(2.2rem, 5.5vw, 4.8rem);
        font-weight: 900; line-height: 0.92;
        letter-spacing: -0.04em;
        color: var(--color-third);
        text-transform: uppercase;
        margin: 0 0 1.4rem;
      }
      .hero-headline em {
        font-style: normal;
        color: var(--color-one, #00cec1);
        position: relative;
        display: inline-block;
      }
      .hero-headline em::after {
        content: '';
        position: absolute;
        bottom: 0.05em; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-one, #00cec1), transparent);
        border-radius: 2px;
      }
      .hero-subline {
        font-size: clamp(0.85rem, 1.1vw, 1rem);
        color: var(--color-third); opacity: 0.6;
        line-height: 1.8; max-width: 440px;
        margin: 0 0 2.4rem;
      }
      .hero-cta-row {
        display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
      }
      .hero-cta__primary {
        display: inline-flex; align-items: center; gap: 0.6rem;
        padding: 0.9rem 2.2rem;
        background: var(--color-one, #00cec1);
        color: rgba(4,18,28,1);
        font-size: 0.74rem; font-weight: 800;
        text-transform: uppercase; letter-spacing: 0.18em;
        border-radius: 6px; border: none; cursor: pointer;
        transition: all 0.25s; text-decoration: none;
      }
      .hero-cta__primary:hover {
        background: #00ede0;
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0,206,193,0.3);
      }
      .hero-cta__secondary {
        font-size: 0.74rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.16em;
        color: var(--color-third); opacity: 0.4;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.12);
        padding-bottom: 2px; transition: all 0.22s;
      }
      .hero-cta__secondary:hover {
        opacity: 0.8;
        border-color: rgba(255,255,255,0.3);
      }
      .hero-stats {
        display: flex; gap: clamp(1.5rem, 3vw, 3.5rem);
        margin-top: clamp(2.5rem, 4vw, 4rem);
        padding-top: clamp(1.5rem, 2.5vw, 2.5rem);
        border-top: 1px solid rgba(0,206,193,0.08);
        flex-wrap: wrap;
      }
      .hero-stat__num {
        font-size: clamp(1.3rem, 2.5vw, 2rem);
        font-weight: 900; letter-spacing: -0.04em;
        color: var(--color-third); line-height: 1;
        margin-bottom: 0.25rem;
      }
      .hero-stat__num span { color: var(--color-one, #00cec1); }
      .hero-stat__label {
        font-size: 0.6rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.2em;
        color: var(--color-third); opacity: 0.35;
      }
      @media (max-width: 860px) {
        .hero-headline { font-size: clamp(2rem, 10vw, 3.5rem); }
        .hero-stats { gap: 1.5rem; }
      }
    `}</style>

        <section className="hero-section">
            <div className="hero-bg">
                <div className="hero-bg__orb-a" />
                <div className="hero-bg__orb-b" />
                <div className="hero-bg__dots" />
                <div className="hero-bg__ring" />
                <div className="hero-bg__ring-2" />
            </div>

            <div className="hero-inner">
                <motion.div
                    className="hero-eyebrow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="hero-eyebrow__line" />
                    <span className="hero-eyebrow__text">International Growth Platform Builder</span>
                </motion.div>

                <motion.h1
                    className="hero-headline"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    WINK —<br /><em>International</em><br />Growth Platform
                </motion.h1>

                <motion.p
                    className="hero-subline"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    Connecting decision-makers through carefully curated business experiences.
                </motion.p>

                <motion.div
                    className="hero-cta-row"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a href="/contact" className="hero-cta__primary">Start Your Program →</a>
                    <a href="#about" className="hero-cta__secondary">Connect</a>
                </motion.div>


            </div>
        </section>
    </>
);

const AboutUsSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

    return (
        <>
            <style>{`
        .abt-section {
          position: relative;
          padding: clamp(4rem, 7vw, 7rem) clamp(1.5rem, 7vw, 8rem) clamp(6rem, 11vw, 11rem);
          overflow: hidden;
          background-color: var(--color-two);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .abt-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
        }
        .abt-bg__a {
          position: absolute; border-radius: 50%; filter: blur(100px);
          width: 60vw; height: 60vw; top: 0; left: -10%;
          background: radial-gradient(circle, rgba(0,206,193,0.055) 0%, transparent 70%);
        }
        .abt-bg__b {
          position: absolute; border-radius: 50%; filter: blur(100px);
          width: 50vw; height: 50vw; bottom: 0; right: -5%;
          background: radial-gradient(circle, rgba(0,63,92,0.2) 0%, transparent 70%);
        }
        .abt-bg__dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,206,193,0.045) 1px, transparent 1px);
          background-size: 38px 38px;
        }
        .abt-header {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          margin-bottom: clamp(5rem, 9vw, 9rem);
        }
        .abt-header__eye {
          display: block; font-size: 0.67rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.38em;
          color: var(--color-third); margin-bottom: 1.1rem;
        }
        .abt-header__h {
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 900; line-height: 0.92;
          letter-spacing: -0.04em; color: var(--color-third);
          text-transform: uppercase; margin: 0 0 2rem;
        }
        .abt-header__h em { color: var(--color-third); font-style: normal; }
        .abt-header__sub {
          font-size: clamp(0.87rem, 1.1vw, 1.03rem);
          color: var(--color-third); line-height: 1.82;
          max-width: 460px; margin: 0;
        }
        .abt-rows {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          display: flex; flex-direction: column;
          gap: clamp(4rem, 8vw, 9rem);
        }
        .abt-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 7vw, 9rem);
          align-items: center;
        }
        .abt-row[data-side="left"] .abt-row__visual { order: 1; }
        .abt-row[data-side="left"] .abt-row__text   { order: 2; }
        .abt-row[data-side="right"] .abt-row__visual { order: 2; }
        .abt-row[data-side="right"] .abt-row__text   { order: 1; }
        .abt-row__visual {
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .abt-row__visual::before {
          content: '';
          position: absolute;
          width: min(280px, 30vw); height: min(280px, 30vw);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,206,193,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .abt-row__illus-wrap {
          width: min(200px, 22vw); height: min(200px, 22vw);
          color: var(--color-third); opacity: 0.4;
          transition: opacity 0.4s ease, filter 0.4s ease;
          filter: drop-shadow(0 0 24px rgba(0,206,193,0.1));
        }
        .abt-row:hover .abt-row__illus-wrap {
          opacity: 0.65;
          filter: drop-shadow(0 0 40px rgba(0,206,193,0.2));
        }
        .abt-row__text { display: flex; flex-direction: column; gap: 0; }
        .abt-row__tag {
          display: block; font-size: 0.63rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em;
          color: var(--color-third); opacity: 0.5; margin-bottom: 0.85rem;
        }
        .abt-row__title {
          font-size: clamp(1.25rem, 2.2vw, 1.85rem);
          font-weight: 800; color: var(--color-third);
          line-height: 1.15; letter-spacing: -0.03em; margin: 0 0 1.2rem;
        }
        .abt-row__rule {
          width: 34px; height: 2px;
          background: linear-gradient(90deg, var(--color-one, #00cec1), transparent);
          border-radius: 2px; margin-bottom: 1.4rem;
        }
        .abt-row__short {
          font-size: clamp(0.84rem, 1vw, 0.96rem);
          color: var(--color-third); line-height: 1.85; margin: 0;
        }
        .abt-row__expanded {
          font-size: clamp(0.84rem, 1vw, 0.96rem);
          color: var(--color-third); line-height: 1.85;
          margin-top: 1rem; overflow: hidden;
        }
        .abt-row__more {
          margin-top: 1.3rem; background: none; border: none; padding: 0;
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.15em;
          color: var(--color-third); opacity: 0.48;
          cursor: pointer; transition: opacity 0.2s; align-self: flex-start;
        }
        .abt-row__more:hover { opacity: 1; }
        .abt-tagline {
          position: relative; z-index: 2;
          max-width: 1240px; margin: clamp(5rem, 9vw, 9rem) auto 0;
          padding-top: clamp(2.5rem, 5vw, 5rem);
          border-top: 1px solid rgba(0,206,193,0.1);
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 3rem; flex-wrap: wrap;
        }
        .abt-tagline__q {
          font-size: clamp(1.05rem, 2.1vw, 1.75rem);
          font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--color-third);
          line-height: 1.2; margin: 0; max-width: 520px;
        }
        .abt-tagline__pills {
          display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: flex-start;
        }
        .abt-tagline__pill {
          font-size: 0.61rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: rgba(0,206,193,0.42); padding: 0.27rem 0.7rem;
          border: 1px solid rgba(0,206,193,0.13);
          border-radius: 4px; background: rgba(0,206,193,0.03); transition: all 0.25s;
        }
        .abt-tagline__pill:hover {
          color: var(--color-third);
          border-color: rgba(0,206,193,0.3);
          background: rgba(0,206,193,0.07);
        }
        .abt-cta {
          position: relative; z-index: 2;
          max-width: 1240px; margin: clamp(2.5rem, 4vw, 4rem) auto 0;
          display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
        }
        .abt-cta__primary {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.9rem 2.2rem; background: var(--color-one, #00cec1);
          color: rgba(4,18,28,1); font-size: 0.76rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.16em;
          border-radius: 6px; border: none; cursor: pointer;
          transition: all 0.25s; text-decoration: none;
        }
        .abt-cta__primary:hover {
          background: #00ede0; transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(0,206,193,0.28);
        }
        .abt-cta__secondary {
          font-size: 0.76rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: rgba(0,206,193,0.42); text-decoration: none;
          border-bottom: 1px solid rgba(0,206,193,0.16);
          padding-bottom: 2px; transition: all 0.22s;
        }
        .abt-cta__secondary:hover {
          color: var(--color-one, #00cec1);
          border-color: rgba(0,206,193,0.42);
        }
        @media (max-width: 860px) {
          .abt-row { grid-template-columns: 1fr; gap: 2rem; }
          .abt-row[data-side="left"] .abt-row__visual,
          .abt-row[data-side="right"] .abt-row__visual { order: 1; }
          .abt-row[data-side="left"] .abt-row__text,
          .abt-row[data-side="right"] .abt-row__text   { order: 2; }
          .abt-row__illus-wrap { width: 90px; height: 90px; }
          .abt-tagline { flex-direction: column; }
        }
      `}</style>

            <section className="abt-section" ref={ref} id="about">
                <motion.div className="abt-bg" style={{ y: bgY }}>
                    <div className="abt-bg__a" />
                    <div className="abt-bg__b" />
                    <div className="abt-bg__dots" />
                </motion.div>

                <motion.div
                    className="abt-header"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="abt-header__eye">What We Do / About the Company</span>
                    <h2 className="abt-header__h">Our<br /><em>Story</em></h2>

                </motion.div>

                <div className="abt-rows">
                    {blocks.map((block, i) => (
                        <AboutBlock key={block.id} block={block} index={i} />
                    ))}
                </div>

                <motion.div
                    className="abt-tagline"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <p className="abt-tagline__q">
                        At Wink, growth is not accidental.<br />It is architected.
                    </p>
                    <div className="abt-tagline__pills">
                        {['Middle East', 'Africa', 'Europe', 'Americas', 'Asia'].map(r => (
                            <span key={r} className="abt-tagline__pill">{r}</span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="abt-cta"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <a href="/contact" className="abt-cta__primary">Work With Us →</a>
                </motion.div>
            </section>
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