import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'enterprises',
    number: '01',
    label: 'Enterprises',
    subtitle: 'International Business Development Programs',
    description: 'Structured buyer sourcing, B2B meetings and investor engagement designed to accelerate international expansion.',
    cta: 'View Enterprise Programs',
    href: '/Entreprises',
    packages: [
      { title: 'Package 1 – Market Access Starter' },
      { title: 'Package 2 – International Growth Sprint' },
      { title: 'Package 3 – Multi-Market Expansion Program' },
      { title: 'Package 4 – Annual International Booking Partnership' },
    ],
  },
  {
    id: 'government',
    number: '02',
    label: 'Government & Associations',
    subtitle: 'International Economic Promotion Programs',
    description: 'Structured trade missions, trade show delegation support and investment promotion initiatives.',
    cta: 'View Institution Programs',
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
    cta: 'View Organizer Programs',
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

const stats = [
  { value: '30K+', label: 'Curated B2B Meetings Organized',             style: 'lines' },
  { value: '900+', label: 'Companies Connected Through WINK Programs',  style: 'image', bgImage: 'statsprogrammes.jpeg' },
  { value: '350+', label: 'International Programs Delivered',           style: 'clean' },
  { value: '+35',  label: 'Countries Covered',                          style: 'geo' },
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
          <motion.p className="prg-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>Programs</motion.p>
          <motion.h1 className="prg-hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>International Growth Programs</motion.h1>
          <motion.p className="prg-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Structured B2B, trade and investment programs connecting companies, institutions, and global event platforms.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <button className="prg-hero-cta" onClick={() => document.getElementById('prg-packages').scrollIntoView({ behavior: 'smooth' })}>
              Explore Our Programs
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </motion.div>
        </section>

        <section className="prg-intro-section">
          <div className="prg-intro-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <h2 className="prg-intro-title">Executive Overview</h2>
              <p className="prg-intro-body">Wink Consulting supports companies in accelerating international growth through structured buyer sourcing, qualified B2B meetings, and end-to-end coordination.</p>
              <p className="prg-intro-body2">Our programs follow a progressive structure from market testing to full international booking partnerships.</p>
            </motion.div>
            <motion.ul className="prg-audience-list" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>
              {['Companies expanding internationally', 'Governments and institutions promoting trade and investment', 'Event organizers seeking measurable exhibitor ROI'].map((item, i) => (
                <li key={i}><span className="prg-aud-dot" />{item}</li>
              ))}
            </motion.ul>
          </div>
        </section>

        <section className="prg-packages" id="prg-packages">
          <div className="prg-packages-header">
            <motion.p className="prg-section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>Tailored Programs for Every Stakeholder</motion.p>
            <motion.p className="prg-packages-sub" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}>Choose a package designed for your organization's objectives.</motion.p>
          </div>
          <div className="prg-cat-grid">
            {categories.map((cat, ci) => (
              <motion.div key={cat.id} className="prg-cat-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <div className="prg-cat-card-top">
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
                          <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href={cat.href} className="prg-cat-cta">
                  {cat.cta}
                  <svg width="13" height="13" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="prg-why">
          <motion.p className="prg-section-label prg-why-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>Why Wink Programs Work</motion.p>
          <div className="prg-why-grid">
            {whyPoints.map((w, i) => (
              <motion.div key={i} className={`prg-why-card ${i % 2 !== 0 ? 'prg-why-card--down' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <span className="prg-why-icon">{w.icon}</span>
                <h4 className="prg-why-title">{w.title}</h4>
                <p className="prg-why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="prg-glance">
          <div className="prg-glance-inner">
            <motion.div className="prg-glance-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="prg-glance-eyebrow">WINK AT A GLANCE</p>
              <h2 className="prg-glance-title">What <span className="prg-glance-accent">Defines</span> WINK</h2>
            </motion.div>
            <div className="prg-glance-grid">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className={`prg-glance-card prg-glance-card--${stat.style}`}
                  style={stat.style === 'image' ? { '--card-bg-image': `url(${stat.bgImage})` } : {}}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stat.style === 'lines' && (
                    <div className="prg-glance-lines-bg">
                      {[...Array(8)].map((_, li) => (
                        <span key={li} className="prg-glance-line" style={{ '--li': li }} />
                      ))}
                    </div>
                  )}
                  {stat.style === 'geo' && (
                    <div className="prg-glance-geo-bg">
                      <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="prg-glance-geo-svg">
                        <circle cx="160" cy="220" r="90" stroke="rgba(0,206,193,0.18)" strokeWidth="1.5"/>
                        <circle cx="160" cy="220" r="60" stroke="rgba(0,206,193,0.12)" strokeWidth="1"/>
                        <rect x="110" y="170" width="80" height="80" rx="4" stroke="rgba(0,206,193,0.2)" strokeWidth="1.2" transform="rotate(22 150 210)"/>
                        <circle cx="60" cy="240" r="5" fill="rgba(0,206,193,0.35)"/>
                        <circle cx="40" cy="260" r="2.5" fill="rgba(0,206,193,0.2)"/>
                        <path d="M20 180 L50 130 L80 180 Z" stroke="rgba(0,206,193,0.15)" strokeWidth="1.2" fill="none"/>
                      </svg>
                    </div>
                  )}
                  <div className="prg-glance-top">
                    <span className="prg-glance-value">{stat.value}</span>
                    <span className="prg-glance-label">{stat.label}</span>
                  </div>
                  <div className="prg-glance-bottom">
                    <span className="prg-glance-arrow">
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                        <path d="M3 15L15 3M15 3H7M15 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
          max-width: 1000px; margin: 0 auto;
          padding: clamp(4.5rem, 9vw, 7.5rem) 4vw clamp(5rem, 9vw, 8rem);
          text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .prg-eyebrow { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-one); margin-bottom: 1.4rem; }
        .prg-hero-headline { font-size: clamp(3rem, 7vw, 5.2rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; color: var(--color-third); margin-bottom: 1.6rem; }
        .prg-hero-sub { font-size: clamp(1.05rem, 1.8vw, 1.25rem); color: var(--color-third); opacity: 0.55; line-height: 1.75; max-width: 640px; margin-bottom: 2.8rem; }
        .prg-hero-cta { display: inline-flex; align-items: center; gap: 0.6rem; border: 1px solid var(--color-one); color: var(--color-one); background: none; padding: 1rem 2.4rem; border-radius: 100px; font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; }
        .prg-hero-cta:hover { background: var(--color-one); color: var(--color-two); transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,206,193,0.25); }

        .prg-intro-section { border-top: 1px solid rgba(209,219,220,0.08); border-bottom: 1px solid rgba(209,219,220,0.08); }
        :root[data-theme="light"] .prg-intro-section { border-color: rgba(0,63,92,0.1); }
        .prg-intro-inner { max-width: 800px; margin: 0 auto; padding: clamp(4rem, 7vw, 2.5rem) 4vw; display: flex; flex-direction: column; gap: 2.5rem; text-align: center; align-items: center; }
        .prg-intro-title { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; letter-spacing: -0.03em; line-height: 2.1; color: var(--color-third); margin: 0; }
        .prg-section-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: var(--color-third); opacity: 0.35; margin-bottom: 1rem; }
        .prg-intro-body { font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.85; color: var(--color-third); opacity: 0.65; max-width: 640px; }
        .prg-intro-body2 { font-size: clamp(1rem, 1.6vw, 0.7rem); line-height: 1.85; color: var(--color-third); opacity: 0.65; max-width: 640px; }
        .prg-audience-list { padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; width: 100%; max-width: 550px; }
        .prg-audience-list li { display: flex; align-items: center; gap: 0.85rem; font-size: 1rem; font-weight: 600; color: var(--color-third); opacity: 0.8; }
        .prg-aud-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-one); flex-shrink: 0; }

        .prg-packages { max-width: 1200px; margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) 4vw; display: flex; flex-direction: column; gap: 2.5rem; }
        .prg-packages-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .prg-packages-header .prg-section-label { font-size: 0.75rem; opacity: 0.5; margin-bottom: 0; letter-spacing: 0.15em; }
        .prg-packages-sub { font-size: 0.85rem; color: var(--color-third); opacity: 0.4; line-height: 1.6; }
        .prg-cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: stretch; }
        .prg-cat-card { background: rgba(209,219,220,0.04); border: 1px solid rgba(209,219,220,0.1); border-radius: 12px; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        :root[data-theme="light"] .prg-cat-card { background: rgba(0,63,92,0.03); border-color: rgba(0,63,92,0.1); }
        .prg-cat-card:hover { border-color: rgba(0,206,193,0.25); box-shadow: 0 12px 40px rgba(0,206,193,0.07); }
        :root[data-theme="light"] .prg-cat-card:hover { box-shadow: 0 12px 40px rgba(0,63,92,0.08); }
        .prg-cat-card-top { display: flex; flex-direction: column; gap: 0.5rem; }
        .prg-cat-label { font-size: clamp(1.5rem, 2.5vw, 1.5rem); font-weight: 800; color: var(--color-third); line-height: 1.2; letter-spacing: -0.015em; }
        .prg-cat-subtitle { font-size: 1.2rem; font-weight: 700; color: var(--color-one); opacity: 0.85; line-height: 1.4; }
        .prg-cat-desc { font-size: 0.9rem; color: var(--color-third); opacity: 0.55; line-height: 1.7; }
        .prg-cat-divider { height: 1px; background: linear-gradient(90deg, var(--color-third) 0%, transparent 100%); opacity: 0.1; }
        .prg-pkg-list { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
        .prg-pkg-item { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; border-radius: 7px; padding: 0.7rem 0.85rem; text-decoration: none; transition: background 0.2s ease, padding-left 0.2s ease; }
        .prg-pkg-title { font-size: 0.8rem; font-weight: 600; color: var(--color-third); opacity: 0.8; line-height: 1.45; transition: color 0.2s ease, opacity 0.2s ease; }
        .prg-pkg-item:hover { background: rgba(0,206,193,0.07); padding-left: 1.1rem; }
        :root[data-theme="light"] .prg-pkg-item:hover { background: rgba(0,63,92,0.05); }
        .prg-pkg-item:hover .prg-pkg-title { color: var(--color-one); opacity: 1; }
        .prg-pkg-arrow { color: var(--color-one); opacity: 0; flex-shrink: 0; transition: opacity 0.2s ease, transform 0.2s ease; display: flex; align-items: center; }
        .prg-pkg-item:hover .prg-pkg-arrow { opacity: 1; transform: translateX(3px); }
        .prg-cat-cta { margin-top: auto; display: inline-flex; align-items: center; gap: 0.5rem; background: none; border: 1px solid var(--color-third); opacity: 0.35; color: var(--color-third); font-family: 'Montserrat', sans-serif; font-size: 0.67rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 0.7rem 1.2rem; border-radius: 100px; cursor: pointer; text-decoration: none; transition: all 0.3s ease; align-self: flex-start; }
        .prg-cat-cta:hover { opacity: 1; border-color: var(--color-one); color: var(--color-one); background: rgba(0,206,193,0.06); transform: translateX(3px); }

        .prg-why { border-top: 1px solid rgba(209,219,220,0.08); padding: clamp(3rem, 6vw, 5rem) 4vw; max-width: 1350px; margin: 0 auto; }
        :root[data-theme="light"] .prg-why { border-top-color: rgba(0,63,92,0.1); }
        .prg-why-label { text-align: center; margin-bottom: 2.5rem; font-size: 3rem; letter-spacing: 0.08em }
        .prg-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; align-items: start; padding-bottom: 2rem; }
        .prg-why-card { display: flex; flex-direction: column; gap: 0.85rem; padding: 1.75rem 1.5rem; background: rgba(209,219,220,0.04); border: 1px solid rgba(209,219,220,0.08); border-radius: 10px; transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease; }
        .prg-why-card--down { margin-top: 2.5rem; }
        :root[data-theme="light"] .prg-why-card { background: rgba(0,63,92,0.03); border-color: rgba(0,63,92,0.08); }
        .prg-why-card:hover { background: rgba(0,206,193,0.09); border-color: rgba(0,206,193,0.35); box-shadow: 0 20px 50px rgba(0,206,193,0.12); transform: translateY(-4px); }
        :root[data-theme="light"] .prg-why-card:hover { background: #19aead; border-color: rgba(0,63,92,0.2); box-shadow: 0 12px 40px rgba(0,63,92,0.1); }
        .prg-why-icon { color: var(--color-one); opacity: 0.8; display: flex; }
        .prg-why-title { font-size: 1.2rem; font-weight: 800; color: var(--color-third); letter-spacing: -0.01em; line-height: 1.3; }
        .prg-why-desc { font-size: 1rem; color: var(--color-third); opacity: 0.55; line-height: 1.65; }

        .prg-glance { padding: clamp(3.5rem, 7vw, 6rem) 4vw; border-top: 1px solid rgba(209,219,220,0.08); }
        :root[data-theme="light"] .prg-glance { border-top-color: rgba(0,63,92,0.1); }
        .prg-glance-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; }
        .prg-glance-header { display: flex; flex-direction: column; gap: 0.3rem; }
        .prg-glance-eyebrow { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-third); opacity: 0.4; margin: 0; }
        .prg-glance-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--color-third); margin: 0; }
        .prg-glance-accent { color: var(--color-one); }

        .prg-glance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .prg-glance-card { background: #07283d; border-radius: 18px; padding: 2.2rem 1.75rem 1.6rem; min-height: 280px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; cursor: default; }
        .prg-glance-card:hover { transform: translateY(-6px); box-shadow: 0 28px 70px rgba(0,0,0,0.4); }

        .prg-glance-lines-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .prg-glance-line { position: absolute; left: calc(-40% + var(--li) * 18%); top: -20%; width: 3px; height: 160%; background: rgba(0,206,193,0.12); transform: rotate(-28deg); transform-origin: top center; border-radius: 2px; transition: background 0.35s ease; }
        .prg-glance-line:nth-child(odd) { width: 6px; background: rgba(0,206,193,0.07); }
        .prg-glance-card--lines:hover .prg-glance-line { background: rgba(0,206,193,0.22); }
        .prg-glance-card--lines:hover .prg-glance-line:nth-child(odd) { background: rgba(0,206,193,0.12); }

        .prg-glance-card--image { background: #07283d; background-image: var(--card-bg-image); background-size: cover; background-position: 10% center; }
        .prg-glance-card--image::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(7,40,61,0.85) 0%, rgba(7,40,61,0.55) 55%, rgba(7,40,61,0.1) 100%); border-radius: 18px; z-index: 0; }
        .prg-glance-card--image .prg-glance-top,
        .prg-glance-card--image .prg-glance-bottom { position: relative; z-index: 1; }

        .prg-glance-geo-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .prg-glance-geo-svg { position: absolute; bottom: -10px; right: -10px; width: 75%; height: auto; }

        .prg-glance-top { display: flex; flex-direction: column; gap: 0.7rem; position: relative; z-index: 1; }
        .prg-glance-value { display: block; font-size: clamp(2.2rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -0.04em; color: #ffffff; line-height: 1; }
        .prg-glance-label { display: block; font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.6); line-height: 1.55; max-width: 170px; }
        .prg-glance-bottom { position: relative; z-index: 1; display: flex; align-items: center; }
        .prg-glance-arrow { width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.65); transition: all 0.25s ease; flex-shrink: 0; }
        .prg-glance-card:hover .prg-glance-arrow { border-color: var(--color-one); color: var(--color-one); background: rgba(0,206,193,0.12); }

        @media (max-width: 1000px) {
          .prg-why-grid { grid-template-columns: repeat(2, 1fr); }
          .prg-glance-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) { .prg-cat-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .prg-why-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .prg-glance-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}