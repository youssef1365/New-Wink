import { motion } from 'framer-motion';

const expertises = [
  {
    number: '01',
    title: 'Cross-Border Trade Acceleration',
    description:
      'We design and operate structured international trade programs that enable institutions and companies to access new markets with precision and strategic intent.',
    capabilitiesLabel: 'Core capabilities include:',
    capabilities: [
      'Multi-country trade missions and roadshows',
      'Sector-focused export acceleration programs',
      'Buyer sourcing, qualification, and alignment',
      'Trade corridor structuring across high-growth regions',
      'Structured opportunity tracking and follow-up',
    ],
  },
  {
    number: '02',
    title: 'Strategic Capital Connections',
    description:
      'We facilitate curated capital connection programs that bring together growth-ready companies and qualified investors within structured, outcome-driven environments.',
    capabilitiesLabel: 'Core capabilities include:',
    capabilities: [
      'Investor roundtables and private capital sessions',
      'Project-investor alignment and positioning support',
      'Cross-border investment engagement programs',
      'Capital-focused business forums',
    ],
  },
  {
    number: '03',
    title: 'Program Architecture & Execution',
    description:
      'We go beyond event management to architect high-impact international business environments designed to produce measurable commercial results.',
    capabilitiesLabel: 'Core capabilities include:',
    capabilities: [
      'Structured engagement design aligned with defined objectives',
      'Precision agenda building and meeting orchestration',
      'Delegation coordination and executive-level facilitation',
      'Outcome-oriented reporting frameworks',
    ],
  },
  {
    number: '04',
    title: 'Technology-Enabled Precision',
    description:
      'Our programs are enhanced by smart infrastructure that increases efficiency, precision, and scalability.',
    capabilitiesLabel: 'Core capabilities include:',
    capabilities: [
      'Data-driven participant profiling',
      'Matching intelligence and optimization',
      'Agenda automation and workflow coordination',
      'Structured post-program opportunity monitoring',
    ],
  },
  {
    number: '05',
    title: 'High-Growth Market Specialization',
    description:
      'Wink operates across dynamic and emerging markets, bringing structured growth methodologies to diverse sectors and regional contexts.',
    capabilitiesLabel: 'Active footprint includes:',
    capabilities: [
      'Middle East',
      'Africa',
      'Europe',
      'Americas',
      'Asia',
      'Strategic emerging corridors',
    ],
  },
];

const ExpertiseCard = ({ item }) => {
  return (
    <div className="exp-card">
      <div className="exp-number">{item.number}</div>
      <div className="exp-body">
        <h2 className="exp-title">{item.title}</h2>
        <p className="exp-desc">{item.description}</p>
        <p className="exp-cap-label">{item.capabilitiesLabel}</p>
        <ul className="exp-list">
          {item.capabilities.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function ExpertisePage() {
  return (
    <div className="exp-page">

      <div className="exp-watermark" aria-hidden="true">WINK</div>

      <motion.div
        className="exp-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="exp-hero-title">EXPERTISES</h1>

      </motion.div>

      <div className="exp-grid">
        {expertises.map((item, i) => (
          <ExpertiseCard key={i} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Lora:ital,wght@0,400;1,400&display=swap');

        .exp-page {
          min-height: 100vh;
          background: var(--color-two);
          color: var(--color-third);
          font-family: 'Montserrat', sans-serif;
          position: relative;
          padding-bottom: 6rem;
          padding-top: 90px;
        }

        .exp-watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(12rem, 30vw, 28rem);
          font-weight: 900;
          color: var(--color-third);
          opacity: 0.03;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
        }

        .exp-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.4rem 6vw;
          border-bottom: 1px solid rgba(128,128,128,0.12);
          position: relative;
          z-index: 1;
        }

        .exp-topbar-left,
        .exp-topbar-right {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.4;
        }

        .exp-hero {
          position: relative;
          z-index: 1;
          padding: 4rem 6vw 2rem;
          border-bottom: 1px solid rgba(128,128,128,0.12);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .exp-hero-title {
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 900;
          color: var(--color-third);
          line-height: 0.9;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .exp-hero-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(0.9rem, 1.3vw, 1.1rem);
          color: var(--color-third);
          opacity: 0.5;
          max-width: 340px;
          line-height: 1.7;
          margin: 0;
          padding-bottom: 0.5rem;
        }

        .exp-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 0 6vw;
        }

        .exp-card {
          padding: 3.5rem 2.5rem 3.5rem 0;
          border-bottom: 1px solid rgba(128,128,128,0.1);
          display: flex;
          gap: 1.8rem;
          align-items: flex-start;
        }

        .exp-card:nth-child(odd) {
          padding-right: 4vw;
          border-right: 1px solid rgba(128,128,128,0.1);
        }

        .exp-card:nth-child(even) {
          padding-left: 4vw;
          padding-right: 0;
        }

        .exp-card:nth-last-child(1):nth-child(odd) {
          grid-column: 1 / -1;
          border-right: none;
          padding-right: 0;
          max-width: 600px;
        }

        .exp-number {
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          color: var(--color-one);
          flex-shrink: 0;
          padding-top: 0.25rem;
          min-width: 2rem;
        }

        .exp-body { flex: 1; }

        .exp-title {
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 700;
          color: var(--color-one);
          margin: 0 0 0.75rem;
          line-height: 1.3;
          letter-spacing: 0.01em;
        }

        .exp-desc {
          font-size: clamp(0.82rem, 1.05vw, 0.95rem);
          color: var(--color-third);
          opacity: 0.7;
          line-height: 1.7;
          margin: 0 0 1rem;
          font-weight: 400;
        }

        .exp-cap-label {
          font-size: clamp(0.78rem, 1vw, 0.88rem);
          font-weight: 700;
          color: var(--color-third);
          margin: 0 0 0.5rem;
        }

        .exp-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .exp-list li {
          font-size: clamp(0.78rem, 1vw, 0.88rem);
          color: var(--color-third);
          opacity: 0.75;
          line-height: 1.55;
          font-weight: 600;
          padding-left: 1rem;
          position: relative;
        }

        .exp-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--color-one);
          font-weight: 400;
        }

        .exp-cta-band {
          position: relative;
          z-index: 1;
          margin: 5rem 6vw 0;
          background: var(--color-two);
          border: 1px solid rgba(128,128,128,0.15);
          border-radius: 16px;
          padding: 3.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .exp-cta-text {
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          font-weight: 800;
          color: var(--color-third);
          margin: 0;
          letter-spacing: -0.01em;
          max-width: 500px;
        }

        .exp-cta-btn {
          background: var(--color-one);
          color: var(--color-two);
          border: none;
          padding: 1rem 2.4rem;
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .exp-cta-btn:hover { opacity: 0.85; }
        .exp-cta-btn:active { transform: scale(0.97); }

        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr; }
          .exp-card,
          .exp-card:nth-child(odd),
          .exp-card:nth-child(even) {
            padding: 2.5rem 0;
            border-right: none;
          }
          .exp-card:nth-last-child(1):nth-child(odd) { max-width: 100%; }
          .exp-hero { flex-direction: column; align-items: flex-start; }
          .exp-cta-band { flex-direction: column; align-items: flex-start; padding: 2.5rem; }
          .exp-watermark { display: none; }
        }
      `}</style>
    </div>
  );
}