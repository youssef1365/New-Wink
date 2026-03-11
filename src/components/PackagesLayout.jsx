import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'enterprises',
    number: '01',
    label: 'Enterprises',
    subtitle: 'International Business Development Programs',
    description: 'Structured buyer sourcing, B2B meetings and investor engagement designed to accelerate international expansion.',
    cta: 'View Enterprise Packages',
    href: '/Entreprises',
    packages: [
      { title: 'Pack 1 – Market Access Starter' },
      { title: 'Pack 2 – International Growth Sprint' },
      { title: 'Pack 3 – Multi-Market Expansion Program' },
      { title: 'Pack 4 – Annual International Booking Partnership' },
    ],
  },
  {
    id: 'government',
    number: '02',
    label: 'Government & Associations',
    subtitle: 'International Economic Promotion Programs',
    description: 'Structured trade missions, trade show delegation support and investment promotion initiatives.',
    cta: 'View Public Sector Packages',
    href: '/Government',
    packages: [
      { title: 'Package 1 – International Hosted Buyers Program (HBP)' },
      { title: 'Package 2 – Premium Structured B2B Access Program' },
    ],
  },
  {
    id: 'organizers',
    number: '03',
    label: 'Event Organizers',
    subtitle: 'Strategic B2B Programs for Trade Shows',
    description: 'Structured buyer engagement programs designed to increase exhibitor ROI and event retention.',
    cta: 'View Organizer Packages',
    href: '/Organizers',
    packages: [
      { title: 'Package 1 – Export Trade Missions' },
      { title: 'Package 2 – Trade Show Delegation Support' },
      { title: 'Package 3 – Investment Promotion Tours' },
    ],
  },
];

const whyPoints = [
  {
    icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
        </svg>
    ),
    title: 'Curated Networks',
    desc: 'Strategic buyer sourcing and qualified decision-maker engagement',
  },
  {
    icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 12h10M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    ),
    title: 'Technology-Enabled Matchmaking',
    desc: 'Smart meeting management systems ensuring precision',
  },
  {
    icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M5 22V10l9-6 9 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <rect x="11" y="15" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
    ),
    title: 'Structured Execution',
    desc: 'End-to-end program architecture and coordination',
  },
  {
    icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M5 18l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="23" cy="7" r="2" fill="currentColor"/>
        </svg>
    ),
    title: 'Measurable Outcomes',
    desc: 'Programs designed around ROI and performance metrics',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProgramsPage() {
  return (
      <>
        <div className="prg-page">

          <section className="prg-hero">
            <motion.p className="prg-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              Programs
            </motion.p>
            <motion.h1 className="prg-hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              International Growth Programs
            </motion.h1>
            <motion.p className="prg-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Structured B2B, trade and investment programs connecting companies, institutions, and global event platforms.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <button className="prg-hero-cta" onClick={() => document.getElementById('prg-packages').scrollIntoView({ behavior: 'smooth' })}>
                Explore Our Programs
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </section>

          <section className="prg-intro-section">
            <div className="prg-intro-inner">
              <motion.div className="prg-intro-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <p className="prg-section-label">What we do</p>
                <p className="prg-intro-body">
                  Wink Consulting designs and operates structured international programs that generate measurable economic outcomes through curated B2B meetings, strategic buyer sourcing, and intelligent matchmaking systems.
                </p>
              </motion.div>
              <motion.div className="prg-audience" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>
                <p className="prg-audience-label">Our programs are designed for</p>
                <ul className="prg-audience-list">
                  {['Companies expanding internationally', 'Governments and institutions promoting trade and investment', 'Event organizers seeking measurable exhibitor ROI'].map((item, i) => (
                      <li key={i}><span className="prg-aud-dot" />{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <section className="prg-packages" id="prg-packages">
            <div className="prg-packages-header">
              <motion.p className="prg-section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                Tailored Programs for Every Stakeholder
              </motion.p>
              <motion.p className="prg-packages-sub" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}>
                Choose a package designed for your organization's objectives.
              </motion.p>
            </div>

            <div className="prg-cat-grid">
              {categories.map((cat, ci) => (
                  <motion.div
                      key={cat.id}
                      className="prg-cat-card"
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="prg-cat-card-top">
                      <span className="prg-cat-num">{cat.number}</span>
                      <h3 className="prg-cat-label">{cat.label}</h3>
                      <p className="prg-cat-subtitle">{cat.subtitle}</p>
                      <p className="prg-cat-desc">{cat.description}</p>
                    </div>

                    <div className="prg-cat-divider" />

                    <ul className="prg-pkg-list">
                      {cat.packages.map((pkg, pi) => (
                          <li key={pi}>
                            <a href={cat.href} className="prg-pkg-item">
                              <span className="prg-pkg-title">{pkg.title}</span>
                              <span className="prg-pkg-arrow">
                          <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                            </a>
                          </li>
                      ))}
                    </ul>

                    <a href={cat.href} className="prg-cat-cta">
                      {cat.cta}
                      <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </motion.div>
              ))}
            </div>
          </section>

          <section className="prg-why">
            <motion.p className="prg-section-label prg-why-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              Why Wink Programs Work
            </motion.p>
            <div className="prg-why-grid">
              {whyPoints.map((w, i) => (
                  <motion.div key={i} className="prg-why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <span className="prg-why-icon">{w.icon}</span>
                    <h4 className="prg-why-title">{w.title}</h4>
                    <p className="prg-why-desc">{w.desc}</p>
                  </motion.div>
              ))}
            </div>
          </section>

          <section className="prg-final-cta">
            <motion.div className="prg-final-inner" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="prg-final-headline">Design Your International Program</p>
              <p className="prg-final-sub">Let's explore how Wink can support your next growth initiative.</p>
              <button className="prg-final-btn" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
                Start a Conversation
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </section>
        </div>

        <style>{`
        .prg-page {
          background-color: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          padding-top: 80px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .prg-hero {
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 7rem) 4vw clamp(2rem, 4vw, 3rem);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .prg-eyebrow {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-one);
          margin-bottom: 1.2rem;
        }
        .prg-hero-headline {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--color-third);
          margin-bottom: 1.2rem;
        }
        .prg-hero-sub {
          font-size: clamp(0.88rem, 1.5vw, 1.02rem);
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.75;
          max-width: 580px;
          margin-bottom: 2.2rem;
        }
        .prg-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid var(--color-one);
          color: var(--color-one);
          background: none;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .prg-hero-cta:hover {
          background: var(--color-one);
          color: var(--color-two);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 206, 193, 0.25);
        }

        .prg-intro-section {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          border-bottom: 1px solid rgba(209, 219, 220, 0.08);
        }
        :root[data-theme="light"] .prg-intro-section { border-color: rgba(0, 63, 92, 0.1); }
        .prg-intro-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(3rem, 5vw, 4rem) 4vw;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .prg-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.35;
          margin-bottom: 1rem;
        }
        .prg-intro-body {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          line-height: 1.8;
          color: var(--color-third);
          opacity: 0.7;
        }
        .prg-audience-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-third);
          opacity: 0.5;
          margin-bottom: 1.2rem;
        }
        .prg-audience-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .prg-audience-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-third);
          opacity: 0.8;
        }
        .prg-aud-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-one);
          flex-shrink: 0;
        }

        .prg-packages {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .prg-packages-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .prg-packages-header .prg-section-label {
          font-size: 0.75rem;
          opacity: 0.5;
          margin-bottom: 0;
          letter-spacing: 0.15em;
        }
        .prg-packages-sub {
          font-size: 0.85rem;
          color: var(--color-third);
          opacity: 0.4;
          line-height: 1.6;
        }

        .prg-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: stretch;
        }
        .prg-cat-card {
          background: rgba(209, 219, 220, 0.04);
          border: 1px solid rgba(209, 219, 220, 0.1);
          border-radius: 12px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        :root[data-theme="light"] .prg-cat-card {
          background: rgba(0, 63, 92, 0.03);
          border-color: rgba(0, 63, 92, 0.1);
        }
        .prg-cat-card:hover {
          border-color: rgba(0, 206, 193, 0.25);
          box-shadow: 0 12px 40px rgba(0, 206, 193, 0.07);
        }
        :root[data-theme="light"] .prg-cat-card:hover {
          box-shadow: 0 12px 40px rgba(0, 63, 92, 0.08);
        }
        .prg-cat-card-top {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .prg-cat-num {
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          color: var(--color-one);
          opacity: 0.7;
        }
        .prg-cat-label {
          font-size: clamp(1.1rem, 1.6vw, 1.3rem);
          font-weight: 800;
          color: var(--color-third);
          line-height: 1.2;
          letter-spacing: -0.015em;
        }
        .prg-cat-subtitle {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-one);
          opacity: 0.85;
          line-height: 1.4;
        }
        .prg-cat-desc {
          font-size: 0.78rem;
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.7;
        }
        .prg-cat-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--color-third) 0%, transparent 100%);
          opacity: 0.1;
        }

        .prg-pkg-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }
        .prg-pkg-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          border-radius: 7px;
          padding: 0.7rem 0.85rem;
          text-decoration: none;
          transition: background 0.2s ease, padding-left 0.2s ease;
        }
        .prg-pkg-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-third);
          opacity: 0.8;
          line-height: 1.45;
          transition: color 0.2s ease, opacity 0.2s ease;
        }
        .prg-pkg-item:hover {
          background: rgba(0, 206, 193, 0.07);
          padding-left: 1.1rem;
        }
        :root[data-theme="light"] .prg-pkg-item:hover {
          background: rgba(0, 63, 92, 0.05);
        }
        .prg-pkg-item:hover .prg-pkg-title {
          color: var(--color-one);
          opacity: 1;
        }
        .prg-pkg-arrow {
          color: var(--color-one);
          opacity: 0;
          flex-shrink: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
        }
        .prg-pkg-item:hover .prg-pkg-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        .prg-cat-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--color-third);
          opacity: 0.35;
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.7rem 1.2rem;
          border-radius: 100px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          align-self: flex-start;
        }
        .prg-cat-cta:hover {
          opacity: 1;
          border-color: var(--color-one);
          color: var(--color-one);
          background: rgba(0, 206, 193, 0.06);
          transform: translateX(3px);
        }

        .prg-why {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          padding: clamp(3rem, 6vw, 5rem) 4vw;
          max-width: 1200px;
          margin: 0 auto;
        }
        :root[data-theme="light"] .prg-why { border-top-color: rgba(0, 63, 92, 0.1); }
        .prg-why-label { text-align: center; margin-bottom: 2.5rem; }
        .prg-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .prg-why-card {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.75rem 1.5rem;
          background: rgba(209, 219, 220, 0.04);
          border: 1px solid rgba(209, 219, 220, 0.08);
          border-radius: 10px;
          transition: border-color 0.3s ease, transform 0.35s ease;
        }
        :root[data-theme="light"] .prg-why-card {
          background: rgba(0, 63, 92, 0.03);
          border-color: rgba(0, 63, 92, 0.08);
        }
        .prg-why-card:hover { border-color: rgba(0, 206, 193, 0.3); transform: translateY(-3px); }
        .prg-why-icon { color: var(--color-one); opacity: 0.8; display: flex; }
        .prg-why-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .prg-why-desc {
          font-size: 0.76rem;
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.65;
        }

        .prg-final-cta {
          border-top: 1px solid rgba(209, 219, 220, 0.08);
          padding: clamp(3.5rem, 7vw, 6rem) 4vw;
        }
        :root[data-theme="light"] .prg-final-cta { border-top-color: rgba(0, 63, 92, 0.1); }
        .prg-final-inner {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }
        .prg-final-headline {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .prg-final-sub {
          font-size: 0.88rem;
          color: var(--color-third);
          opacity: 0.5;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .prg-final-btn {
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
        .prg-final-btn:hover {
          background: var(--color-fourth);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 206, 193, 0.3);
        }

        @media (max-width: 1000px) { .prg-why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) {
          .prg-cat-grid { grid-template-columns: 1fr; }
          .prg-intro-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .prg-why-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      </>
  );
}