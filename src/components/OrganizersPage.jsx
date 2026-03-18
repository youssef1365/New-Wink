import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const packages = [
    {
        id: 'hbp',
        number: '01',
        label: 'International Hosted Buyers Program (HBP)',
        tag: 'Package 1',
        positioning: 'A curated international buyer recruitment and engagement program designed to attract qualified decision-makers from priority international markets.',
        targetBuyers: [
            'International distributors',
            'Importers',
            'Corporate procurement leaders',
            'Strategic partners',
            'Investors (if aligned with event profile)',
        ],
        governance: [
            'The Hosted Buyers Program is commissioned and funded by the event organizer.',
            'Wink Consulting operates as an integrated extension of the organizer\'s team, delivering the program under the official event brand.',
            'All communication is executed under the event\'s branding.',
            'The program is presented as an official initiative of the exhibition.',
            'Wink operates as the embedded B2B performance unit within the event structure.',
            'The organizer remains responsible for all hosted buyer logistics, including travel, accommodation, and hospitality arrangements.',
        ],
        winkResponsibilities: [
            'International buyer sourcing and qualification',
            'Strategic targeting and screening',
            'Structured meeting scheduling using a dedicated meeting management system',
            'Calendar optimization and attendance enforcement',
            'On-site coordination and monitoring',
            'Post-event KPI reporting and impact measurement',
        ],
        organizerNote: 'The event organizer retains full responsibility for hosted buyer logistics, including travel, accommodation, visa processing, and on-site hospitality arrangements.',
        kpis: [
            'Number of confirmed international hosted buyers',
            'Number of structured meetings facilitated',
            '85%+ meeting attendance rate',
            '70%+ meetings rated \'high relevance\'',
            'Exhibitor ROI performance summary',
        ],
    },
    {
        id: 'b2b',
        number: '02',
        label: 'Premium Structured B2B Access Program',
        tag: 'Package 2',
        positioning: 'Zero-Investment Curated Strategic Buyer Engagement Program, A white-label, revenue-share B2B performance layer operated under the organizer\'s brand, designed primarily for local and regional buyers, with optional international extension.',
        investmentModel: [
            'Zero financial investment from organizer',
            'Exhibitors pay participation fee',
            'Revenue-share model (15–20%)',
            'Limited curated participation (20–30 exhibitors recommended)',
        ],
        governance: [
            'Zero-Investment Curated Strategic Buyer Engagement Program',
            'The Zero-Investment Curated Strategic Buyer Engagement Program is deployed as an official initiative of the event and operates fully under the organizer\'s brand.',
            'Wink Consulting acts as an embedded B2B performance unit integrated within the organizer\'s operational structure.',
            'The program is communicated as an official event initiative.',
            'All exhibitor communication is executed under the event brand.',
            'The organizer retains full ownership of the exhibitor relationship.',
            'Wink operates as a white-label execution partner within the event ecosystem.',
        ],
        organizerResponsibilities: [
            'Official endorsement and promotion of the program',
            'Communication to exhibitors via official channels',
            'Inclusion within exhibitor onboarding materials',
            'Approval of participant selection framework',
            'Brand alignment and positioning',
        ],
        winkResponsibilities: [
            'Exhibitor profiling and objective alignment',
            'Local/regional buyer sourcing and qualification',
            'Structured meeting scheduling using a dedicated meeting management system',
            'Calendar optimization and attendance tracking',
            'On-site coordination and real-time monitoring',
            'Post-event KPI reporting and ROI measurement',
            'Revenue-share transparency and reporting',
        ],
        revenueFramework: [
            'The organizer bears no financial risk.',
            'Participating exhibitors pay a structured participation fee.',
            'Exhibitor participation fees are collected by the organizer under the official event framework.',
            'A pre-agreed execution allocation is remitted to Wink Consulting for delivery of the program.',
            'Participation is limited and curated to ensure quality and measurable outcomes.',
        ],
        kpis: [
            '8–10 curated meetings per exhibitor',
            '85%+ attendance rate',
            '70%+ relevance score',
            'Exhibitor satisfaction index',
            'Renewal intention tracking',
            'Revenue generated for organizer via revenue share',
        ],
    },
];

const positioningPoints = [
    'NOT volume-based matchmaking',
    'NOT passive event apps',
    'NOT generic scheduling tools',
];

const techFeatures = [
    'Smart Profiling',
    'Matching Criteria',
    'Calendar Optimization',
    'Attendance Tracking',
    'Real-Time Monitoring',
    'KPI Dashboards',
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function PackageModal({ pkg, onClose }) {
    return (
        <AnimatePresence>
            {pkg && (
                <>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="modal-panel"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'fixed', top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    >
                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-header-left">
                                <span className="modal-pkg-num">{pkg.number}</span>
                                <div>
                                    <p className="modal-pkg-tag">{pkg.tag}</p>
                                    <h3 className="modal-pkg-title">{pkg.label}</h3>
                                </div>
                            </div>
                            <button className="modal-close" onClick={onClose} aria-label="Close">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="modal-body">
                            <div className="modal-grid">
                                {/* Left col */}
                                <div className="modal-col">
                                    {pkg.investmentModel && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Investment Model</p>
                                            <ul className="modal-list">
                                                {pkg.investmentModel.map((b, i) => <li key={i}>{b}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="modal-section">
                                        <p className="modal-section-title">Governance & Operational Model</p>
                                        <ul className="modal-list">
                                            {pkg.governance.map((b, i) => <li key={i}>{b}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className="modal-col">
                                    {pkg.organizerResponsibilities && (
                                        <div className="modal-section">
                                            <p className="modal-section-title modal-section-title--accent">Organizer Responsibilities</p>
                                            <ul className="modal-list">
                                                {pkg.organizerResponsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    {pkg.revenueFramework && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Revenue & Control Framework</p>
                                            <ul className="modal-list">
                                                {pkg.revenueFramework.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="modal-section">
                                        <p className="modal-section-title modal-section-title--kpi">Key Performance Indicators</p>
                                        <ul className="modal-list modal-list--kpi">
                                            {pkg.kpis.map((k, i) => <li key={i}>{k}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function OrganizersPage() {
    const [modalPkg, setModalPkg] = useState(null);
    const pkg1 = packages[0];
    const pkg2 = packages[1];

    return (
        <>
            <div className="org-page">

                <section className="org-hero">
                    <motion.p className="org-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                        Event Organizers
                    </motion.p>
                    <motion.h1 className="org-hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                        Strategic B2B Programs for Event Organizers
                    </motion.h1>
                    <motion.p className="org-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        From Meetings to Measurable Exhibitor ROI.
                    </motion.p>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <button className="org-hero-cta" onClick={() => document.getElementById('org-packages').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Our Programs
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                </section>

                <section className="org-positioning-section">
                    <div className="org-positioning-inner">
                        <motion.div className="org-pos-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
                            <p className="org-section-label">Strategic Positioning</p>
                            <p className="org-pos-body">
                                Most trade shows offer networking opportunities. However, networking alone does not generate measurable business outcomes. Exhibitors renew because they generate results.
                            </p>
                            <p className="org-pos-body org-pos-highlight">
                                Wink Consulting designs structured buyer engagement systems that transform events into performance-driven business platforms.
                            </p>
                        </motion.div>
                        <motion.div className="org-pos-right" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>
                            <p className="org-section-label">Our Positioning</p>
                            <ul className="org-not-list">
                                {positioningPoints.map((pt, i) => (
                                    <li key={i}>
                                        <span className="org-not-x">✕</span>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="org-instead-block">
                                <p>Instead we deliver curated performance layers that improve exhibitor ROI and event retention.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="org-tech-section">
                    <div className="org-tech-inner">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <p className="org-section-label">Technology-Enabled Meeting Management</p>
                            <p className="org-tech-sub">Smart meeting management systems ensuring precision and measurable outcomes.</p>
                        </motion.div>
                        <div className="org-tech-grid">
                            {techFeatures.map((feat, i) => (
                                <motion.div key={i} className="org-tech-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                                    <span className="org-tech-dot" />
                                    <span className="org-tech-label">{feat}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="org-packages" id="org-packages">
                    <div className="org-packages-header">
                        <motion.p className="org-section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            Programs
                        </motion.p>
                        <motion.h2 className="org-packages-title" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
                            2 Program Blocks
                        </motion.h2>
                        <motion.p className="org-packages-sub" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
                            Choose the program that fits your event structure and growth objectives.
                        </motion.p>
                    </div>

                    {/* ── PACKAGE 1 — full layout (unchanged) ── */}
                    <motion.div
                        className="org-pkg-block"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="org-pkg-header">
                            <span className="org-pkg-num">{pkg1.number}</span>
                            <div>
                                <p className="org-pkg-tag">{pkg1.tag}</p>
                                <h3 className="org-pkg-title">{pkg1.label}</h3>
                            </div>
                        </div>
                        <div className="org-pkg-body">
                            <div className="org-pkg-col">
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title">Positioning</p>
                                    <p className="org-pkg-text">{pkg1.positioning}</p>
                                </div>
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title">Target Buyers</p>
                                    <ul className="org-pkg-list">
                                        {pkg1.targetBuyers.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                </div>
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title">Governance & Operational Model</p>
                                    <ul className="org-pkg-list">
                                        {pkg1.governance.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                </div>
                                {pkg1.organizerNote && (
                                    <div className="org-pkg-note">
                                        <p>{pkg1.organizerNote}</p>
                                    </div>
                                )}
                            </div>
                            <div className="org-pkg-col">
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title org-pkg-section-title--accent">Wink Consulting is responsible for</p>
                                    <ul className="org-pkg-list">
                                        {pkg1.winkResponsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title org-pkg-section-title--kpi">Key Performance Indicators (KPIs)</p>
                                    <ul className="org-pkg-list org-pkg-list--kpi">
                                        {pkg1.kpis.map((k, i) => <li key={i}>{k}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── PACKAGE 2 — condensed card, click to open modal ── */}
                    <motion.div
                        className="org-pkg-block org-pkg-block--condensed"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setModalPkg(pkg2)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setModalPkg(pkg2)}
                        aria-label="View full details for Package 2"
                    >
                        <div className="org-pkg-header">
                            <span className="org-pkg-num">{pkg2.number}</span>
                            <div style={{ flex: 1 }}>
                                <p className="org-pkg-tag">{pkg2.tag}</p>
                                <h3 className="org-pkg-title">{pkg2.label}</h3>
                            </div>
                            <span className="pkg2-explore-pill">
                                Explore
                                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                                    <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </div>

                        <div className="org-pkg-body org-pkg-body--condensed">
                            <div className="org-pkg-col">
                                <div className="org-pkg-section">
                                    <p className="org-pkg-section-title">Positioning</p>
                                    <p className="org-pkg-text">{pkg2.positioning}</p>
                                </div>
                            </div>

                            <div className="org-pkg-col">
                                <div className="org-pkg-section">
                                    <ul className="org-pkg-list">
                                        {pkg2.winkResponsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pkg2-hint-bar">
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M9 8v5M9 6h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                            Click to explore the full program details — governance, revenue framework &amp; KPIs
                        </div>
                    </motion.div>
                </section>

                <section className="org-final-cta">
                    <motion.div className="org-final-inner" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <p className="org-final-headline">Design Your International Program</p>
                        <p className="org-final-sub">Let's explore how Wink can support your next growth initiative.</p>
                        <button className="org-final-btn" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
                            Start a Conversation
                            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                </section>
            </div>

            <PackageModal pkg={modalPkg} onClose={() => setModalPkg(null)} />

            <style>{`
        .org-page {
          background-color: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          padding-top: 100px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .org-hero {
            max-width: 1000px;
            margin: 0 auto;
            padding: clamp(4.5rem, 9vw, 5rem) 4vw clamp(5rem, 9vw, 8rem);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .org-eyebrow {
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: var(--color-one);
            margin-bottom: 1.4rem;
        }
        .org-hero-headline {
            font-size: clamp(3rem, 7vw, 4.8rem);
            font-weight: 800;
            line-height: 1.08;
            letter-spacing: -0.03em;
            color: var(--color-third);
            margin-bottom: 1.6rem;
        }
        .org-hero-sub {
           font-size: clamp(1.05rem, 1.8vw, 1.25rem);
           color: var(--color-third);
           opacity: 0.55;
           line-height: 1.75;
           max-width: 640px;
           margin-bottom: 2.8rem;
        }
        .org-hero-cta {
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
        .org-hero-cta:hover {
           background: var(--color-one);
           color: var(--color-two);
           transform: translateY(-2px);
           box-shadow: 0 10px 28px rgba(0, 206, 193, 0.25);
        }

        .org-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.35;
          margin-bottom: 1rem;
        }

        .org-positioning-section {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
        }
        :root[data-theme="light"] .org-positioning-section { border-color: rgba(0, 63, 92, 0.1); }
        .org-positioning-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(3rem, 5vw, 4rem) 4vw;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .org-pos-body {
          font-size: clamp(0.85rem, 1.3vw, 0.98rem);
          line-height: 1.8;
          color: var(--color-third);
          opacity: 0.65;
          margin-bottom: 1rem;
        }
        .org-pos-highlight { opacity: 0.85; font-weight: 600; }
        .org-not-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 1.5rem;
        }
        .org-not-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-third);
          opacity: 0.75;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .org-not-x {
          color: var(--color-one);
          font-size: 0.7rem;
          font-weight: 900;
          opacity: 0.8;
          flex-shrink: 0;
        }
        .org-instead-block {
          border-left: 2px solid var(--color-one);
          padding: 0.85rem 1.2rem;
          background: rgba(0, 206, 193, 0.05);
          border-radius: 0 8px 8px 0;
        }
        .org-instead-block p {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-one);
          line-height: 1.55;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .org-tech-section { border-bottom: 1px solid rgba(209, 219, 220, 0.08); }
        :root[data-theme="light"] .org-tech-section { border-color: rgba(0, 63, 92, 0.1); }
        .org-tech-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(3rem, 5vw, 4rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .org-tech-sub {
          font-size: 0.85rem;
          color: var(--color-third);
          opacity: 0.5;
          margin-top: -0.5rem;
          line-height: 1.6;
        }
        .org-tech-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.75rem;
        }
        .org-tech-card {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 8px;
          background: rgba(209, 219, 220, 0.03);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        :root[data-theme="light"] .org-tech-card { border-color: rgba(0, 63, 92, 0.1); background: rgba(0, 63, 92, 0.02); }
        .org-tech-card:hover { border-color: rgba(0, 206, 193, 0.3); background: rgba(0, 206, 193, 0.05); }
        .org-tech-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-one); flex-shrink: 0; }
        .org-tech-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-third);
          opacity: 0.75;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .org-packages {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .org-packages-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .org-packages-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .org-packages-sub {
          font-size: 0.85rem;
          color: var(--color-third);
          opacity: 0.4;
          line-height: 1.6;
        }

        .org-pkg-block {
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(209, 219, 220, 0.03);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        :root[data-theme="light"] .org-pkg-block { background: rgba(0, 63, 92, 0.02); border-color: rgba(0, 63, 92, 0.1); }
        .org-pkg-block:hover { border-color: rgba(0, 206, 193, 0.2); box-shadow: 0 16px 48px rgba(0, 206, 193, 0.06); }

        .org-pkg-block--condensed {
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
        }
        .org-pkg-block--condensed:hover {
          border-color: rgba(0, 206, 193, 0.35);
          box-shadow: 0 20px 56px rgba(0, 206, 193, 0.1);
          transform: translateY(-2px);
        }
        .org-pkg-block--condensed:focus-visible {
          outline: 2px solid var(--color-one);
          outline-offset: 3px;
        }

        .org-pkg-header {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.75rem 2rem;
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
          background: rgba(0, 206, 193, 0.03);
        }
        :root[data-theme="light"] .org-pkg-header { background: rgba(0, 63, 92, 0.03); border-bottom-color: rgba(0, 63, 92, 0.08); }
        .org-pkg-num {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          color: var(--color-one);
          opacity: 0.7;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }
        .org-pkg-tag {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-one);
          opacity: 0.8;
          margin-bottom: 0.3rem;
        }
        .org-pkg-title {
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.015em;
          line-height: 1.25;
        }

        /* Explore pill on pkg2 header */
        .pkg2-explore-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 100px;
          border: 1px solid rgba(0, 206, 193, 0.35);
          color: var(--color-one);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          margin-top: 0.25rem;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .org-pkg-block--condensed:hover .pkg2-explore-pill {
          background: rgba(0, 206, 193, 0.1);
          border-color: var(--color-one);
        }

        .org-pkg-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .org-pkg-body--condensed { /* same grid, no special override needed */ }

        .org-pkg-col {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .org-pkg-col:first-child { border-right: 1px solid rgba(209, 219, 220, 0.08); }
        :root[data-theme="light"] .org-pkg-col:first-child { border-right-color: rgba(0, 63, 92, 0.08); }

        .org-pkg-section { display: flex; flex-direction: column; gap: 0.65rem; }
        .org-pkg-section-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.5;
        }
        .org-pkg-section-title--accent { color: var(--color-one); opacity: 0.85; }
        .org-pkg-section-title--kpi { color: var(--color-one); opacity: 0.7; }
        .org-pkg-text { font-size: 0.82rem; color: var(--color-third); opacity: 0.65; line-height: 1.75; }
        .org-pkg-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .org-pkg-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.8rem;
          color: var(--color-third);
          opacity: 0.7;
          line-height: 1.55;
        }
        .org-pkg-list li::before {
          content: '·';
          color: var(--color-one);
          font-weight: 900;
          font-size: 1rem;
          line-height: 1.3;
          flex-shrink: 0;
        }
        .org-pkg-list--kpi li { opacity: 0.85; font-weight: 600; }
        .org-pkg-note {
          background: rgba(0, 206, 193, 0.05);
          border: 1px solid rgba(0, 206, 193, 0.12);
          border-radius: 8px;
          padding: 1rem 1.2rem;
        }
        .org-pkg-note p { font-size: 0.78rem; color: var(--color-third); opacity: 0.6; line-height: 1.65; font-style: italic; }

        /* Hint bar at bottom of pkg2 */
        .pkg2-hint-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2rem;
          border-top: 1px solid rgba(0, 206, 193, 0.08);
          background: rgba(0, 206, 193, 0.03);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--color-one);
          opacity: 0.6;
          text-transform: uppercase;
          transition: opacity 0.2s ease;
        }
        .org-pkg-block--condensed:hover .pkg2-hint-bar { opacity: 1; }

        .org-final-cta { border-top: 1px solid rgba(209, 219, 220, 0.08); padding: clamp(3.5rem, 7vw, 6rem) 4vw; }
        :root[data-theme="light"] .org-final-cta { border-top-color: rgba(0, 63, 92, 0.1); }
        .org-final-inner { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
        .org-final-headline { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: var(--color-third); letter-spacing: -0.02em; line-height: 1.2; }
        .org-final-sub { font-size: 0.88rem; color: var(--color-third); opacity: 0.5; line-height: 1.7; margin-bottom: 0.75rem; }
        .org-final-btn {
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
        .org-final-btn:hover { background: var(--color-fourth); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0, 206, 193, 0.3); }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 2000;
        }
        .modal-panel {
          width: min(92vw, 980px);
          max-height: 88vh;
          background: var(--color-two);
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 2001;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
        }
        :root[data-theme="light"] .modal-panel { border-color: rgba(0, 63, 92, 0.12); box-shadow: 0 32px 80px rgba(0, 0, 0, 0.15); }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
          background: rgba(0, 206, 193, 0.03);
          flex-shrink: 0;
        }
        :root[data-theme="light"] .modal-header { background: rgba(0, 63, 92, 0.03); border-bottom-color: rgba(0, 63, 92, 0.08); }

        .modal-header-left { display: flex; align-items: flex-start; gap: 1.25rem; }
        .modal-pkg-num { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.28em; color: var(--color-one); opacity: 0.7; margin-top: 0.35rem; flex-shrink: 0; }
        .modal-pkg-tag { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-one); opacity: 0.8; margin-bottom: 0.3rem; }
        .modal-pkg-title { font-size: clamp(1rem, 1.8vw, 1.3rem); font-weight: 800; color: var(--color-third); letter-spacing: -0.015em; line-height: 1.25; }

        .modal-close {
          background: rgba(209, 219, 220, 0.06);
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-third);
          cursor: pointer;
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.2s ease, background 0.2s ease;
        }
        .modal-close:hover { opacity: 1; background: rgba(209, 219, 220, 0.12); }

        .modal-body {
          overflow-y: auto;
          padding: 2rem;
          flex: 1;
        }
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .modal-col { display: flex; flex-direction: column; gap: 1.75rem; }
        .modal-section { display: flex; flex-direction: column; gap: 0.65rem; }
        .modal-section-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.5;
        }
        .modal-section-title--accent { color: var(--color-one); opacity: 0.85; }
        .modal-section-title--kpi { color: var(--color-one); opacity: 0.7; }
        .modal-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .modal-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.8rem;
          color: var(--color-third);
          opacity: 0.7;
          line-height: 1.55;
        }
        .modal-list li::before {
          content: '·';
          color: var(--color-one);
          font-weight: 900;
          font-size: 1rem;
          line-height: 1.3;
          flex-shrink: 0;
        }
        .modal-list--kpi li { opacity: 0.85; font-weight: 600; }

        @media (max-width: 1100px) { .org-tech-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) {
          .org-positioning-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .org-pkg-body { grid-template-columns: 1fr; }
          .org-pkg-col:first-child { border-right: none; border-bottom: 1px solid rgba(209, 219, 220, 0.08); }
          .modal-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) { .org-tech-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 450px) { .org-tech-grid { grid-template-columns: 1fr; } }
      `}</style>
        </>
    );
}