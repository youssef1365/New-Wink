import React from 'react';
import { motion } from 'framer-motion';

const packages = [
    {
        id: 'export',
        number: '01',
        tag: 'Package 1 – Export Trade Missions',
        bestFor: 'Export promotion agencies, ministries, and associations supporting internationalization.',
        positioning: 'Structured international trade missions focused on qualified B2B outcomes.',
        services: [
            'Strategic needs assessment and sector definition',
            'Target market and buyer research',
            'Buyer sourcing and qualification',
            'Outreach and engagement with international buyers',
            'Pre-mission introductions and preparation meetings',
            'In-market B2B meeting organization and scheduling',
            'On-site coordination during the mission',
            'Post-mission reporting, feedback, and recommendations',
        ],
        kpis: [
            'Minimum 8–10 qualified B2B meetings per participant',
            'Targeted decision-maker level engagement',
            'Meeting relevance score collected post-mission',
            'Comprehensive post-mission performance report',
            'Structured follow-up recommendations delivered',
            'Post-show impact report delivered within 2 weeks',
        ],
    },
    {
        id: 'delegation',
        number: '02',
        tag: 'Package 2 – Trade Show Delegation Support',
        bestFor: 'Institutions organizing national pavilions or collective participation in trade fairs.',
        positioning: 'Maximizing ROI and business outcomes from international trade shows.',
        services: [
            'Exhibitor profiling and objectives alignment',
            'Trade show and buyer mapping',
            'International buyer sourcing and qualification',
            'Pre-show outreach and meeting pre-scheduling',
            'Structured B2B meeting calendars during the exhibition',
            'On-site coordination and support',
            'Post-show reporting and follow-up strategy',
        ],
        kpis: [
            'Minimum 8–10 pre-scheduled qualified meetings per exhibitor',
            'Buyer attendance rate tracking',
            'Exhibitor satisfaction survey post-event',
            'Lead conversion potential assessment',
            'Post-show impact report delivered within 2 weeks',
        ],
    },
    {
        id: 'investment',
        number: '03',
        tag: 'Package 3 – Investment Promotion Tours',
        bestFor: 'Investment promotion agencies and public authorities attracting foreign direct investment.',
        positioning: 'Targeted investor outreach and high-level strategic meetings.',
        services: [
            'Investment value proposition clarification',
            'Target sector and investor profiling',
            'Investor research and mapping',
            'Outreach to qualified investors and decision-makers',
            'Pre-tour introductions and briefing',
            'High-level meeting organization with investors and stakeholders',
            'On-site coordination',
            'Post-tour reporting and investment pipeline recommendations',
        ],
        kpis: [
            '15–30 high-level investor meetings per tour',
            'C-level or decision-maker participation rate',
            'Investment interest categorization (Short / Medium / Long term)',
            'Structured investment pipeline report',
            'Stakeholder feedback summary',
        ],
    },
];

const phases = [
    { number: '01', label: 'Strategic Alignment & Sector Definition' },
    { number: '02', label: 'Market Research & Target Profiling' },
    { number: '03', label: 'Outreach, Qualification & Scheduling' },
    { number: '04', label: 'On-Site Coordination & Execution' },
    { number: '05', label: 'Post-Program Reporting & Impact Measurement' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function GovernmentPage() {
    return (
        <>
            <div className="gov-page">

                <section className="gov-hero">
                    <motion.p className="gov-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                        Government & Institutional
                    </motion.p>
                    <motion.h1 className="gov-hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                        Government & Institutional Programs 2026
                    </motion.h1>
                    <motion.p className="gov-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        Structured International Economic Promotion Services
                    </motion.p>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <button className="gov-hero-cta" onClick={() => document.getElementById('gov-packages').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Our Programs
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                </section>

                <section className="gov-packages" id="gov-packages">
                    <div className="gov-packages-header">
                        <motion.p className="gov-section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            Programs
                        </motion.p>
                        <motion.h2 className="gov-packages-title" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
                            3 Program Blocks
                        </motion.h2>
                        <motion.p className="gov-packages-sub" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
                            Choose the program aligned with your institution's international promotion objectives.
                        </motion.p>
                    </div>

                    <div className="gov-pkg-grid">
                        {packages.map((pkg, pi) => (
                            <motion.div
                                key={pkg.id}
                                className="gov-pkg-card"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: pi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="gov-pkg-card-top">
                                    <span className="gov-pkg-num">{pkg.number}</span>
                                    <p className="gov-pkg-tag">{pkg.tag}</p>
                                    <div className="gov-pkg-best-for">
                                        <span className="gov-pkg-best-label">Best for: </span>
                                        <span className="gov-pkg-best-text">{pkg.bestFor}</span>
                                    </div>
                                    <p className="gov-pkg-positioning">
                                        <span className="gov-pkg-pos-label">Positioning: </span>
                                        {pkg.positioning}
                                    </p>
                                </div>

                                <div className="gov-pkg-divider" />

                                <div className="gov-pkg-section">
                                    <p className="gov-pkg-section-title">Scope of Services</p>
                                    <ul className="gov-pkg-list">
                                        {pkg.services.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>

                                <div className="gov-pkg-divider" />

                                <div className="gov-pkg-section">
                                    <p className="gov-pkg-section-title gov-pkg-section-title--kpi">Key Performance Indicators (KPIs)</p>
                                    <ul className="gov-pkg-list gov-pkg-list--kpi">
                                        {pkg.kpis.map((k, i) => <li key={i}>{k}</li>)}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="gov-methodology">
                    <div className="gov-methodology-inner">
                        <motion.div className="gov-meth-header" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <p className="gov-section-label">Methodology & Execution Framework</p>
                            <p className="gov-meth-sub">Each program follows a structured execution framework</p>
                        </motion.div>

                        <div className="gov-phases">
                            {phases.map((ph, i) => (
                                <motion.div
                                    key={i}
                                    className="gov-phase"
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.08 }}
                                >
                                    <span className="gov-phase-num">Phase {ph.number}</span>
                                    <div className="gov-phase-connector" />
                                    <span className="gov-phase-label">{ph.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div className="gov-next-steps" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <p className="gov-next-title">Next Steps</p>
                            <p className="gov-next-body">
                                Upon confirmation of interest, Wink Consulting will provide a tailored technical and financial proposal aligned with the specific objectives, sector focus, and target country requirements.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="gov-final-cta">
                    <motion.div className="gov-final-inner" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <p className="gov-final-headline">Design Your Economic Promotion Program</p>
                        <p className="gov-final-sub">Let's explore how Wink can support your next international initiative.</p>
                        <button className="gov-final-btn" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
                            Contact Our Team
                            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                </section>
            </div>

            <style>{`
        .gov-page {
          background-color: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          padding-top: 80px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .gov-hero {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: clamp(4.5rem, 9vw, 7.5rem) 4vw clamp(5rem, 9vw, 8rem);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .gov-eyebrow {
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: var(--color-one);
                    margin-bottom: 1.4rem;
                }
                .gov-hero-headline {
                    font-size: clamp(3rem, 7vw, 5.2rem);
                    font-weight: 800;
                    line-height: 1.08;
                    letter-spacing: -0.03em;
                    color: var(--color-third);
                    margin-bottom: 1.6rem;
                }
                .gov-hero-sub {
                   font-size: clamp(1.05rem, 1.8vw, 1.25rem);
                   color: var(--color-third);
                   opacity: 0.55;
                   line-height: 1.75;
                   max-width: 640px;
                   margin-bottom: 2.8rem;
                }
                .gov-hero-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    border: 1px solid var(--color-one);
                    color: var(--color-one);
                    background: none;
                    padding: 1rem 2.4rem;
                    border-radius: 100px;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .gov-hero-cta:hover {
                   background: var(--color-one);
                   color: var(--color-two);
                   transform: translateY(-2px);
                   box-shadow: 0 10px 28px rgba(0, 206, 193, 0.25);
                }

        .gov-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.35;
          margin-bottom: 1rem;
        }

        .gov-packages {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .gov-packages-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .gov-packages-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .gov-packages-sub {
          font-size: 0.85rem;
          color: var(--color-third);
          opacity: 0.4;
          line-height: 1.6;
        }

        .gov-pkg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: stretch;
        }
        .gov-pkg-card {
          background: rgba(209, 219, 220, 0.04);
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 12px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        :root[data-theme="light"] .gov-pkg-card {
          background: rgba(0, 63, 92, 0.03);
          border-color: rgba(0, 63, 92, 0.1);
        }
        .gov-pkg-card:hover {
          border-color: rgba(0, 206, 193, 0.25);
          box-shadow: 0 12px 40px rgba(0, 206, 193, 0.07);
        }
        :root[data-theme="light"] .gov-pkg-card:hover {
          box-shadow: 0 12px 40px rgba(0, 63, 92, 0.08);
        }

        .gov-pkg-card-top {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .gov-pkg-num {
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          color: var(--color-one);
          opacity: 0.7;
        }
        .gov-pkg-tag {
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 800;
          color: var(--color-one);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .gov-pkg-best-for {
          font-size: 0.78rem;
          line-height: 1.65;
          color: var(--color-third);
        }
        .gov-pkg-best-label {
          font-weight: 800;
          opacity: 0.9;
        }
        .gov-pkg-best-text {
          opacity: 0.6;
        }
        .gov-pkg-positioning {
          font-size: 0.78rem;
          line-height: 1.65;
          color: var(--color-third);
          opacity: 0.7;
          font-style: italic;
        }
        .gov-pkg-pos-label {
          font-style: normal;
          font-weight: 800;
          opacity: 1;
        }

        .gov-pkg-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--color-third) 0%, transparent 100%);
          opacity: 0.1;
        }

        .gov-pkg-section {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          flex: 1;
        }
        .gov-pkg-section-title {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.45;
        }
        .gov-pkg-section-title--kpi {
          color: var(--color-one);
          opacity: 0.85;
        }
        .gov-pkg-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .gov-pkg-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.78rem;
          color: var(--color-third);
          opacity: 0.65;
          line-height: 1.55;
        }
        .gov-pkg-list li::before {
          content: '·';
          color: var(--color-one);
          font-weight: 900;
          font-size: 1rem;
          line-height: 1.3;
          flex-shrink: 0;
        }
        .gov-pkg-list--kpi li {
          opacity: 0.8;
          font-weight: 600;
        }

        .gov-methodology {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
        }
        :root[data-theme="light"] .gov-methodology { border-color: rgba(0, 63, 92, 0.1); }
        .gov-methodology-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .gov-meth-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .gov-meth-sub {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          font-weight: 700;
          color: var(--color-third);
          opacity: 0.7;
          line-height: 1.5;
        }

        .gov-phases {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .gov-phase {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          transition: background 0.25s ease;
        }
        .gov-phase:hover {
          background: rgba(0, 206, 193, 0.05);
        }
        :root[data-theme="light"] .gov-phase:hover {
          background: rgba(0, 63, 92, 0.04);
        }
        .gov-phase-num {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-one);
          opacity: 0.8;
          min-width: 68px;
          flex-shrink: 0;
        }
        .gov-phase-connector {
          width: 24px;
          height: 1px;
          background: var(--color-one);
          opacity: 0.3;
          flex-shrink: 0;
        }
        .gov-phase-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-third);
          opacity: 0.75;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .gov-next-steps {
          border-left: 2px solid var(--color-one);
          padding: 1.2rem 1.75rem;
          background: rgba(0, 206, 193, 0.04);
          border-radius: 0 10px 10px 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .gov-next-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-one);
          opacity: 0.85;
        }
        .gov-next-body {
          font-size: 0.88rem;
          color: var(--color-third);
          opacity: 0.65;
          line-height: 1.75;
        }

        .gov-final-cta {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          padding: clamp(3.5rem, 7vw, 6rem) 4vw;
        }
        :root[data-theme="light"] .gov-final-cta { border-top-color: rgba(0, 63, 92, 0.1); }
        .gov-final-inner {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }
        .gov-final-headline {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .gov-final-sub {
          font-size: 0.88rem;
          color: var(--color-third);
          opacity: 0.5;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .gov-final-btn {
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
        }
        .gov-final-btn:hover {
          background: var(--color-fourth);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 206, 193, 0.3);
        }

        @media (max-width: 1000px) {
          .gov-pkg-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .gov-phase { flex-wrap: wrap; gap: 0.5rem; }
          .gov-phase-connector { display: none; }
        }
      `}</style>
        </>
    );
}