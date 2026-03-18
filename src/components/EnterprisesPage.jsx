import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const packages = [
    {
        id: 'pack1',
        number: '01',
        title: 'Market Access Starter',
        bestFor: 'SMEs testing a new international market.',
        positioning: 'Fast and structured market validation.',
        duration: '6 Weeks',
        scope: [
            '1 target country',
            'Buyer sourcing & qualification',
            '5–10 qualified B2B meetings',
            'Email introductions & scheduling',
            'Meeting coordination',
            'Post-meeting summary report',
        ],
    },
    {
        id: 'pack2',
        number: '02',
        title: 'International Growth Sprint',
        bestFor: 'Companies seeking structured opportunity generation in 1–2 markets.',
        positioning: 'Short-term acceleration program.',
        duration: '3 Months',
        scope: [
            '1–2 target countries',
            'Advanced buyer profiling',
            '20–30 qualified B2B meetings',
            'Continuous outreach & booking over 3 months',
            'Monthly reporting',
            'Structured follow-up coordination',
        ],
    },
    {
        id: 'pack3',
        number: '03',
        title: 'Multi-Market Expansion Program',
        bestFor: 'Structured companies expanding into multiple countries.',
        positioning: 'Coordinated multi-country business acceleration.',
        duration: '6 Months',
        scope: [
            '2–3 target countries',
            'Advanced prospect sourcing & qualification',
            '40–60 qualified B2B meetings',
            'Continuous booking over 6 months',
            'Trade show scheduling support (if applicable)',
            'Pipeline reporting & CRM-ready tracking',
        ],
    },
    {
        id: 'pack4',
        number: '04',
        title: 'Investor Roadshow Program',
        label: 'For Project Owners',
        bestFor: 'Companies seeking in-market investor meetings.',
        positioning: 'Curated investor engagement in a target financial hub (e.g., NYC, Dubai, London).',
        duration: '3 Months',
        scope: [
            'Strategic investor targeting',
            'Advanced investor profiling & qualification',
            '8–10 in-market investor meetings',
            'Agenda design & scheduling',
            'On-site coordination support',
            'Structured follow-up management',
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function EnterprisesPage() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => setOpenId(prev => prev === id ? null : id);

    return (
        <>
            <div className="ent-page">

                <section className="ent-hero">
                    <motion.p className="ent-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                        Enterprises
                    </motion.p>
                    <motion.h1 className="ent-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                        Enterprise International<br />Growth Programs
                    </motion.h1>
                    <motion.p className="ent-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        Structured buyer sourcing, B2B meetings and investor engagement to accelerate global expansion.
                    </motion.p>
                </section>

                <section className="ent-overview">
                    <motion.div
                        className="ent-overview-inner"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="ent-overview-title">Executive Introduction</p>
                        <p className="ent-overview-statement">
Wink Consulting designs and operates structured international programs that generate measurable economic outcomes through curated B2B meetings, strategic buyer sourcing, and intelligent matchmaking systems.
                        </p>
                        <p className="ent-overview-body">
                            Our 2026 Programs are designed with a progressive structure — from market testing to fully dedicated international booking partnerships — allowing companies to scale their international expansion in a controlled and measurable manner.
                        </p>
                    </motion.div>
                </section>

                <section className="ent-programs">
                    <motion.div
                        className="ent-programs-header"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="ent-section-label">Programs</p>
                        <div className="ent-pkg-nav">
                            {packages.map(p => (
                                <button key={p.id} className="ent-pkg-nav-item" onClick={() => toggle(p.id)}>
                                    <span className="ent-pkg-nav-num">{p.number}</span>
                                    <span className="ent-pkg-nav-title">{p.title}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="ent-pkg-blocks">
                        {packages.map((pkg, i) => (
                            <motion.div
                                key={pkg.id}
                                className={`ent-pkg-block ${openId === pkg.id ? 'is-open' : ''}`}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <button className="ent-pkg-trigger" onClick={() => toggle(pkg.id)}>
                                    <div className="ent-pkg-trigger-left">
                                        <span className="ent-pkg-num">{pkg.number}</span>
                                        <div className="ent-pkg-titles">
                                            <h3 className="ent-pkg-title">
                                                {pkg.title}
                                                {pkg.label && <span className="ent-pkg-label-badge">{pkg.label}</span>}
                                            </h3>
                                            <p className="ent-pkg-bestfor">
                                                <span className="ent-pkg-tag">Best for</span> {pkg.bestFor}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ent-pkg-trigger-right">
                                        <span className="ent-pkg-duration-pill">{pkg.duration}</span>
                                        <span className={`ent-pkg-chevron ${openId === pkg.id ? 'is-open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openId === pkg.id && (
                                        <motion.div
                                            className="ent-pkg-body"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="ent-pkg-body-inner">
                                                <div className="ent-pkg-positioning">
                                                    <span className="ent-pkg-tag">Positioning</span>
                                                    <p>{pkg.positioning}</p>
                                                </div>
                                                <div className="ent-pkg-scope">
                                                    <p className="ent-scope-label">Scope of Work</p>
                                                    <ul className="ent-scope-list">
                                                        {pkg.scope.map((item, j) => (
                                                            <li key={j}>
                                                                <span className="ent-scope-bullet" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="ent-pkg-footer">
                                                    <div className="ent-pkg-duration-row">
                                                        <span className="ent-duration-label">Duration</span>
                                                        <span className="ent-duration-value">{pkg.duration}</span>
                                                    </div>
                                                    <button className="ent-pkg-cta" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
                                                        Request Program Details
                                                        <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                                                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="ent-next-steps">
                    <motion.div
                        className="ent-next-inner"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="ent-next-text">
                            <p className="ent-section-label">Next Steps</p>
                            <p className="ent-next-body">
                                Following a strategic alignment call, Wink will provide a tailored execution roadmap based on your selected program and priority markets.
                            </p>
                        </div>
                        <button className="ent-final-btn" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
                            Book a Strategic Call
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                </section>

            </div>

            <style>{`
        .ent-page {
          background-color: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          padding-top: 80px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .ent-hero {
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(4.5rem, 9vw, 7.5rem) 4vw clamp(5rem, 9vw, 8rem);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ent-eyebrow {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-one);
          margin-bottom: 1.2rem;
        }
        .ent-headline {
          font-size: clamp(3rem, 7vw, 5.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin-bottom: 1.6rem;
        }
        .ent-hero-sub {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.75;
          max-width: 640px;
          margin-bottom: 2.8rem;
        }

        .ent-overview {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
        }
        :root[data-theme="light"] .ent-overview { border-color: rgba(0, 63, 92, 0.1); }
        .ent-overview-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: clamp(3rem, 5vw, 4.5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .ent-overview-statement {
          font-size: clamp(1rem, 1.8vw, 1.22rem);
          font-weight: 700;
          color: var(--color-third);
          line-height: 1.6;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          opacity: 0.9;
        }
        .ent-overview-body {
          font-size: clamp(0.85rem, 1.3vw, 0.95rem);
          color: var(--color-third);
          opacity: 0.6;
          line-height: 1.8;
        }

        .ent-programs {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .ent-programs-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .ent-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.35;
        }
        .ent-pkg-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ent-pkg-nav-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(209, 219, 220, 0.05);
          border: 1px solid rgba(209, 219, 220, 0.12);
          border-radius: 100px;
          padding: 0.45rem 1rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-third);
          opacity: 0.55;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        :root[data-theme="light"] .ent-pkg-nav-item {
          background: rgba(0, 63, 92, 0.04);
          border-color: rgba(0, 63, 92, 0.12);
        }
        .ent-pkg-nav-item:hover {
          opacity: 1;
          border-color: var(--color-one);
          color: var(--color-one);
          background: rgba(0, 206, 193, 0.06);
        }
        .ent-pkg-nav-num {
          font-size: 0.58rem;
          opacity: 0.5;
        }

        .ent-pkg-blocks {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ent-pkg-block {
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background: rgba(209, 219, 220, 0.03);
        }
        :root[data-theme="light"] .ent-pkg-block {
          background: rgba(0, 63, 92, 0.02);
          border-color: rgba(0, 63, 92, 0.1);
        }
        .ent-pkg-block.is-open {
          border-color: var(--color-one);
          box-shadow: 0 8px 32px rgba(0, 206, 193, 0.08);
        }
        :root[data-theme="light"] .ent-pkg-block.is-open {
          box-shadow: 0 8px 32px rgba(0, 63, 92, 0.1);
        }

        .ent-pkg-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.2s ease;
        }
        .ent-pkg-trigger:hover {
          background: rgba(0, 206, 193, 0.04);
        }
        :root[data-theme="light"] .ent-pkg-trigger:hover {
          background: rgba(0, 63, 92, 0.03);
        }
        .ent-pkg-trigger-left {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          flex: 1;
          min-width: 0;
        }
        .ent-pkg-num {
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--color-one);
          opacity: 0.7;
          flex-shrink: 0;
          margin-top: 0.3rem;
        }
        .ent-pkg-titles {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
        }
        .ent-pkg-title {
          font-size: clamp(1rem, 1.6vw, 1.18rem);
          font-weight: 800;
          color: var(--color-third);
          line-height: 1.2;
          letter-spacing: -0.015em;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .ent-pkg-label-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-one);
          background: rgba(0, 206, 193, 0.1);
          border: 1px solid rgba(0, 206, 193, 0.2);
          border-radius: 100px;
          padding: 0.2rem 0.6rem;
        }
        .ent-pkg-bestfor {
          font-size: 0.76rem;
          color: var(--color-third);
          opacity: 0.5;
          line-height: 1.5;
        }
        .ent-pkg-tag {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-one);
          margin-right: 0.3rem;
        }
        .ent-pkg-trigger-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }
        .ent-pkg-duration-pill {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-one);
          background: rgba(0, 206, 193, 0.08);
          border: 1px solid rgba(0, 206, 193, 0.15);
          border-radius: 100px;
          padding: 0.3rem 0.85rem;
          white-space: nowrap;
        }
        .ent-pkg-chevron {
          color: var(--color-third);
          opacity: 0.35;
          display: flex;
          transition: transform 0.35s ease, opacity 0.2s ease;
        }
        .ent-pkg-chevron.is-open {
          transform: rotate(180deg);
          opacity: 0.7;
          color: var(--color-one);
        }

        .ent-pkg-body {
          overflow: hidden;
        }
        .ent-pkg-body-inner {
          padding: 0 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          padding-top: 1.75rem;
        }
        :root[data-theme="light"] .ent-pkg-body-inner { border-top-color: rgba(0, 63, 92, 0.08); }
        .ent-pkg-positioning {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(0, 206, 193, 0.06);
          border-left: 2px solid var(--color-one);
          padding: 0.85rem 1.25rem;
          border-radius: 0 8px 8px 0;
          max-width: 680px;
        }
        .ent-pkg-positioning p {
          font-size: 0.82rem;
          color: var(--color-third);
          opacity: 0.75;
          line-height: 1.65;
          font-style: italic;
        }

        .ent-pkg-scope {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .ent-scope-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.35;
        }
        .ent-scope-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 2rem;
        }
        .ent-scope-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.8rem;
          color: var(--color-third);
          opacity: 0.75;
          line-height: 1.5;
        }
        .ent-scope-bullet {
          flex-shrink: 0;
          margin-top: 0.48em;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-one);
          opacity: 0.8;
        }

        .ent-pkg-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(209, 219, 220, 0.07);
        }
        :root[data-theme="light"] .ent-pkg-footer { border-top-color: rgba(0, 63, 92, 0.07); }
        .ent-pkg-duration-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ent-duration-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.3;
        }
        .ent-duration-value {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--color-one);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .ent-pkg-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--color-one);
          color: var(--color-one);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.7rem 1.4rem;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ent-pkg-cta:hover {
          background: var(--color-one);
          color: var(--color-two);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 206, 193, 0.25);
        }

        .ent-next-steps {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          padding: clamp(3.5rem, 7vw, 6rem) 4vw;
        }
        :root[data-theme="light"] .ent-next-steps { border-top-color: rgba(0, 63, 92, 0.1); }
        .ent-next-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .ent-next-text {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 600px;
        }
        .ent-next-body {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          font-weight: 600;
          color: var(--color-third);
          opacity: 0.75;
          line-height: 1.7;
        }
        .ent-final-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: var(--color-one);
          color: var(--color-two);
          border: none;
          padding: 1.05rem 2.5rem;
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .ent-final-btn:hover {
          background: var(--color-fourth);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 206, 193, 0.3);
        }

        @media (max-width: 760px) {
          .ent-scope-list { grid-template-columns: 1fr; }
          .ent-next-inner { flex-direction: column; align-items: flex-start; }
          .ent-pkg-trigger { padding: 1.25rem 1.25rem; }
          .ent-pkg-body-inner { padding: 0 1.25rem 1.5rem; padding-top: 1.5rem; }
          .ent-pkg-duration-pill { display: none; }
          .ent-pkg-nav { display: none; }
        }
      `}</style>
        </>
    );
}