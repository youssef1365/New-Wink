import React from 'react';
import { motion } from 'framer-motion';

const howItWorks = [
  {
    step: '01',
    title: 'Participant Profiles',
    desc: 'Companies create structured profiles to define their interests, offers, and meeting preferences.',
  },
  {
    step: '02',
    title: 'Smart Matchmaking',
    desc: 'AI-enabled logic identifies relevant business matches and prioritizes the most valuable meetings.',
  },
  {
    step: '03',
    title: 'Automatic Agenda Creation',
    desc: 'The platform generates optimized meeting schedules and conflict-free calendars for all participants.',
  },
  {
    step: '04',
    title: 'Live Event Management',
    desc: 'Organizers can monitor meetings in real time and make adjustments during the event.',
  },
];

const benefits = {
  organizers: [
    'Simplified Meeting Coordination',
    'Centralized Participant Management',
    'Faster Meeting Schedule Creation',
    'Real-Time Event Control',
  ],
  participants: [
    'Clear Meeting Agendas',
    'Meetings With Relevant Partners',
    'Better Preparation Before Meetings',
    'Structured Networking Experience',
  ],
};

const impactStats = [
  { label: 'Higher Meeting Quality' },
  { label: 'Higher Satisfaction Rates' },
  { label: 'Clear Networking Outcomes' },
  { label: 'Valuable Data for Sponsors & Stakeholders' },
];

const platformSupports = [
  'Participant registration',
  'Profile management',
  'B2B matchmaking',
  'Meeting agenda generation',
  'Live event coordination',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PlatformPage() {
  return (
    <>
      <div className="plt-page">

        <section className="plt-hero">
          <div className="plt-hero-text">
            <motion.p className="plt-eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              Technology
            </motion.p>
            <motion.h1 className="plt-hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              WINK Meeting<br />Management Platform
            </motion.h1>
            <motion.p className="plt-hero-sub" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Technology powering the way B2B meetings are sourced, scheduled, and managed during international events and trade missions.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <a href="/contact" className="plt-hero-cta">
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
          <motion.div
            className="plt-hero-img-wrap"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="Platform1_2.jpeg" alt="WINK scheduling interface on tablet" className="plt-hero-img" />
          </motion.div>
        </section>

        <section className="plt-what">
          <div className="plt-what-inner">
            <motion.div
              className="plt-what-visual"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="plt-laptop-wrap">
                <img src="Platform1_1.jpeg" alt="WINK events management on laptop" className="plt-laptop-img" />
              </div>
            </motion.div>
            <motion.div
              className="plt-what-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="plt-section-label">What the Platform Does</p>
              <h2 className="plt-what-title">End-to-End B2B Meeting Intelligence</h2>
              <p className="plt-what-body">
                The WINK platform is designed to organize, schedule, and optimize B2B meetings during international events and trade missions. It manages the entire lifecycle of business meetings — from participant registration to live event coordination and post-event analytics.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="plt-how">
          <div className="plt-how-inner">
            <motion.div
              className="plt-how-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="plt-section-label">How It Works</p>
              <h2 className="plt-how-title">Four Steps to Smarter Meetings</h2>
            </motion.div>
            <div className="plt-how-grid">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={i}
                  className={`plt-how-card ${i % 2 !== 0 ? 'plt-how-card--down' : ''}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="plt-how-step">{item.step}</span>
                  <h3 className="plt-how-title-card">{item.title}</h3>
                  <p className="plt-how-desc">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="plt-benefits">
          <div className="plt-benefits-inner">
            <motion.div
              className="plt-benefits-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="plt-section-label">Benefits</p>
              <h2 className="plt-benefits-title">Designed for Every Stakeholder</h2>
            </motion.div>
            <div className="plt-benefits-layout">
              <div className="plt-benefits-grid">
                <motion.div
                  className="plt-benefits-col"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <p className="plt-benefits-col-label">For Event Organizers</p>
                  <div className="plt-divider" />
                  <ul className="plt-benefits-list">
                    {benefits.organizers.map((item, i) => (
                      <li key={i} className="plt-benefits-item">
                        <span className="plt-benefits-icon">
                          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="plt-benefits-col"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                >
                  <p className="plt-benefits-col-label">For Participants</p>
                  <div className="plt-divider" />
                  <ul className="plt-benefits-list">
                    {benefits.participants.map((item, i) => (
                      <li key={i} className="plt-benefits-item">
                        <span className="plt-benefits-icon">
                          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <motion.div
                className="plt-benefits-phone-wrap"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src="Platform5.jpeg" alt="WINK meeting detail on mobile" className="plt-benefits-phone" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="plt-impact">
          <div className="plt-impact-inner">
            <div className="plt-impact-top">
              <motion.div
                className="plt-impact-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <p className="plt-section-label">Impact</p>
                <h2 className="plt-impact-title">Measuring the Impact of Your Event</h2>
                <p className="plt-impact-body">
                  The platform provides real-time analytics and post-event insights to measure the effectiveness of B2B meetings and networking outcomes.
                </p>
                <div className="plt-impact-stats">
                  {impactStats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="plt-impact-stat"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.09 }}
                    >
                      <span className="plt-impact-check">✓</span>
                      <span className="plt-impact-stat-label">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="plt-impact-dashboard-wrap"
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src="Platform4.jpeg" alt="WINK analytics dashboard" className="plt-impact-dashboard" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="plt-supports">
          <div className="plt-supports-inner">
            <motion.div
              className="plt-supports-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="plt-section-label">Platform Capabilities</p>
              <h2 className="plt-supports-title">How the Platform Supports Your Event</h2>
              <p className="plt-supports-body">
                For each program or trade mission, the platform provides a complete operational backbone:
              </p>
              <ul className="plt-supports-list">
                {platformSupports.map((item, i) => (
                  <motion.li
                    key={i}
                    className="plt-supports-item"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <span className="plt-supports-dot" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="plt-supports-visual"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="plt-flow-card">
                <div className="plt-flow-title">Meeting Lifecycle</div>
                {['Register', 'Match', 'Schedule', 'Meet', 'Analyze'].map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="plt-flow-step">
                      <div className="plt-flow-num">{String(i + 1).padStart(2, '0')}</div>
                      <div className="plt-flow-label">{step}</div>
                    </div>
                    {i < 4 && <div className="plt-flow-connector" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="plt-cta">
          <motion.div
            className="plt-cta-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="plt-cta-bg-lines">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="plt-cta-line" style={{ '--li': i }} />
              ))}
            </div>
            <div className="plt-cta-content">
              <p className="plt-cta-eyebrow">Get Started</p>
              <h2 className="plt-cta-headline">Power Your Next Event<br />with the WINK Platform</h2>
              <p className="plt-cta-sub">Contact us to integrate the platform into your next B2B program or trade mission.</p>
              <a href="/contact" className="plt-cta-btn">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </section>

      </div>

      <style>{`
        .plt-page {
          background-color: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          padding-top: 80px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .plt-section-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-one);
          margin: 0 0 0.75rem;
          opacity: 0.9;
        }
        .plt-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--color-one) 0%, transparent 100%);
          opacity: 0.25;
          margin-bottom: 1.5rem;
        }

        .plt-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(4.5rem, 9vw, 7.5rem) 4vw clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .plt-hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .plt-eyebrow {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-one);
          margin-bottom: 1.4rem;
        }
        .plt-hero-headline {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin-bottom: 1.4rem;
        }
        .plt-hero-sub {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 2.2rem;
        }
        .plt-hero-cta {
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
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .plt-hero-cta:hover {
          background: var(--color-one);
          color: var(--color-two);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,206,193,0.25);
        }
        .plt-hero-img-wrap {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
        }
        .plt-hero-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
        }

        .plt-what {
          border-top: 1px solid rgba(209,219,220,0.08);
          border-bottom: 1px solid rgba(209,219,220,0.08);
          padding: clamp(4rem, 7vw, 6rem) 4vw;
        }
        :root[data-theme="light"] .plt-what { border-color: rgba(0,63,92,0.1); }
        .plt-what-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .plt-laptop-wrap {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        .plt-laptop-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .plt-what-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: var(--color-third);
          margin: 0 0 1.25rem;
        }
        .plt-what-body {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: var(--color-third);
          opacity: 0.6;
          line-height: 1.8;
        }

        .plt-how {
          padding: clamp(3.5rem, 6vw, 5.5rem) 4vw;
        }
        .plt-how-inner { max-width: 1200px; margin: 0 auto; }
        .plt-how-header { margin-bottom: 2.5rem; }
        .plt-how-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin: 0;
        }
        .plt-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          align-items: start;
        }
        .plt-how-card {
          background: rgba(209,219,220,0.04);
          border: 1px solid rgba(209,219,220,0.1);
          border-radius: 12px;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        :root[data-theme="light"] .plt-how-card { background: rgba(0,63,92,0.03); border-color: rgba(0,63,92,0.1); }
        .plt-how-card--down { margin-top: 2.5rem; }
        .plt-how-card:hover {
          border-color: rgba(0,206,193,0.3);
          box-shadow: 0 16px 48px rgba(0,206,193,0.1);
          transform: translateY(-4px);
        }
        .plt-how-step {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-one);
          opacity: 0.25;
          letter-spacing: -0.05em;
          line-height: 1;
        }
        .plt-how-title-card {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--color-third);
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .plt-how-desc {
          font-size: 0.77rem;
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.65;
        }

        .plt-benefits {
          border-top: 1px solid rgba(209,219,220,0.08);
          padding: clamp(3.5rem, 6vw, 5.5rem) 4vw;
        }
        :root[data-theme="light"] .plt-benefits { border-color: rgba(0,63,92,0.1); }
        .plt-benefits-inner { max-width: 1200px; margin: 0 auto; }
        .plt-benefits-header { margin-bottom: 2.5rem; }
        .plt-benefits-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin: 0;
        }
        .plt-benefits-layout {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: 3rem;
          align-items: center;
        }
        .plt-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .plt-benefits-col {
          background: rgba(209,219,220,0.04);
          border: 1px solid rgba(209,219,220,0.1);
          border-radius: 12px;
          padding: 2rem 1.75rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        :root[data-theme="light"] .plt-benefits-col { background: rgba(0,63,92,0.03); border-color: rgba(0,63,92,0.1); }
        .plt-benefits-col:hover {
          border-color: rgba(0,206,193,0.2);
          box-shadow: 0 12px 40px rgba(0,206,193,0.07);
        }
        .plt-benefits-col-label {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-one);
          margin: 0 0 1rem;
        }
        .plt-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .plt-benefits-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-third);
          opacity: 0.8;
        }
        .plt-benefits-icon {
          color: var(--color-one);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .plt-benefits-phone-wrap {
          filter: drop-shadow(0 24px 50px rgba(0,0,0,0.45));
        }
        .plt-benefits-phone {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 28px;
        }

        .plt-impact {
          border-top: 1px solid rgba(209,219,220,0.08);
          padding: clamp(3.5rem, 6vw, 5.5rem) 4vw;
        }
        :root[data-theme="light"] .plt-impact { border-color: rgba(0,63,92,0.1); }
        .plt-impact-inner { max-width: 1200px; margin: 0 auto; }
        .plt-impact-top {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }
        .plt-impact-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin: 0 0 1rem;
        }
        .plt-impact-body {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .plt-impact-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }
        .plt-impact-stat {
          background: #07283d;
          border-radius: 12px;
          padding: 1.25rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .plt-impact-stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }
        .plt-impact-check {
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-one);
        }
        .plt-impact-stat-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: rgba(255,255,255,0.75);
          line-height: 1.45;
        }
        .plt-impact-dashboard-wrap {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(0,0,0,0.45);
          border: 1px solid rgba(209,219,220,0.08);
        }
        .plt-impact-dashboard {
          width: 100%;
          height: auto;
          display: block;
        }

        .plt-supports {
          border-top: 1px solid rgba(209,219,220,0.08);
          padding: clamp(3.5rem, 6vw, 5.5rem) 4vw;
        }
        :root[data-theme="light"] .plt-supports { border-color: rgba(0,63,92,0.1); }
        .plt-supports-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .plt-supports-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-third);
          margin: 0 0 1rem;
        }
        .plt-supports-body {
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          color: var(--color-third);
          opacity: 0.55;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .plt-supports-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .plt-supports-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-third);
          opacity: 0.8;
        }
        .plt-supports-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-one);
          flex-shrink: 0;
        }
        .plt-flow-card {
          background: #07283d;
          border-radius: 16px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
        }
        .plt-flow-title {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-one);
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }
        .plt-flow-step {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .plt-flow-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0,206,193,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--color-one);
          flex-shrink: 0;
        }
        .plt-flow-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(255,255,255,0.75);
        }
        .plt-flow-connector {
          width: 1px;
          height: 20px;
          background: rgba(0,206,193,0.2);
          margin: 0.25rem 0 0.25rem 17px;
        }

        .plt-cta {
          padding: clamp(4rem, 7vw, 6rem) 4vw;
          border-top: 1px solid rgba(209,219,220,0.08);
        }
        :root[data-theme="light"] .plt-cta { border-color: rgba(0,63,92,0.1); }
        .plt-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          background: #07283d;
          border-radius: 20px;
          padding: clamp(3rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .plt-cta-bg-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .plt-cta-line {
          position: absolute;
          left: calc(-20% + var(--li) * 14%);
          top: -20%;
          width: 3px;
          height: 160%;
          background: rgba(0,206,193,0.08);
          transform: rotate(-20deg);
          transform-origin: top center;
          border-radius: 2px;
        }
        .plt-cta-line:nth-child(even) { width: 5px; background: rgba(0,206,193,0.05); }
        .plt-cta-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1.2rem; }
        .plt-cta-eyebrow {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-one);
          opacity: 0.85;
          margin: 0;
        }
        .plt-cta-headline {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #ffffff;
          margin: 0;
        }
        .plt-cta-sub {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 520px;
          margin: 0;
        }
        .plt-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--color-one);
          color: var(--color-two);
          border: none;
          padding: 1rem 2.4rem;
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          margin-top: 0.5rem;
          transition: all 0.3s ease;
        }
        .plt-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,206,193,0.35);
          opacity: 0.92;
        }

        @media (max-width: 1000px) {
          .plt-how-grid { grid-template-columns: repeat(2, 1fr); }
          .plt-impact-top { grid-template-columns: 1fr; }
          .plt-impact-stats { grid-template-columns: repeat(4, 1fr); }
          .plt-benefits-layout { grid-template-columns: 1fr; }
          .plt-benefits-phone-wrap { width: 140px; margin: 0 auto; }
        }
        @media (max-width: 900px) {
          .plt-hero { grid-template-columns: 1fr; text-align: center; }
          .plt-hero-text { align-items: center; }
          .plt-hero-sub { max-width: 100%; }
          .plt-what-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .plt-supports-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .plt-benefits-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .plt-how-grid { grid-template-columns: 1fr; }
          .plt-impact-stats { grid-template-columns: 1fr 1fr; }
          .plt-how-card--down { margin-top: 0; }
        }
      `}</style>
    </>
  );
}