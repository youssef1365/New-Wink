import { motion } from 'framer-motion';

const CallToAction = ({
  image       = '/your-image.jpg',
  headline    = 'Design Your International Program',
  subheadline = "Let's explore how Wink can support your next growth initiative.",
  ctaLabel    = 'Start a Conversation',
  logoLetter  = 'W',
  accentColor = '#00CEC1',
  bgDark      = '#0b2a35',
  btnVariant  = 'outline',
  href        = null,
  onCtaClick  = null,
}) => {

  const handleCta = () => {
    if (onCtaClick) return onCtaClick();
    if (href) return (window.location.href = href);
    window.dispatchEvent(new Event('openContactModal'));
  };

  return (
    <>
      <section className="ctab-section">

        <div className="ctab-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />

        <div className="ctab-overlay" aria-hidden="true" />

        <div className="ctab-w-wrap" aria-hidden="true">
          <span className="ctab-w-scaler">
            <span
              className="ctab-w-letter"
              style={{ backgroundImage: `url(${image})` }}
            >
              {logoLetter}
            </span>
          </span>
        </div>

        <div className="ctab-content">
          <motion.h2
            className="ctab-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          <motion.p
            className="ctab-sub"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            {subheadline}
          </motion.p>

          <motion.button
            className={`ctab-btn${btnVariant === 'filled' ? ' ctab-btn--filled' : ''}`}
            onClick={handleCta}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{ctaLabel}</span>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

      </section>

      <style>{`
        .ctab-section {
          position: relative;
          width: 85%;
          height: clamp(120px, 17vw, 260px);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: ${bgDark};
          box-sizing: border-box;
          margin: 4rem auto 4rem;
        }

        .ctab-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(4px);
          transform: scale(1.12);
          z-index: 0;
        }

        .ctab-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: ${bgDark}cc;
        }

        .ctab-w-wrap {
          position: absolute;
          top: 0;
          bottom: 0;
          right: -23%;
          width: 75%;
          z-index: 2;
          pointer-events: none;
          container-type: size;
          overflow: visible;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .ctab-w-scaler {
          display: block;
          transform: scaleX(1.9);
          transform-origin: right center;
          line-height: 1;
        }

        .ctab-w-letter {
          overflow: visible;
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 800;
          font-size: 150cqh;
          line-height: 1;
          letter-spacing: 0em;
          color: transparent;
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          white-space: nowrap;
          margin-top: -0.23em;
          user-select: none;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

        .ctab-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 clamp(1.8rem, 5vw, 3.5rem);
          max-width: 65%;
        }

        .ctab-headline {
          font-size: clamp(1.3rem, 2.5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: 0.04em;
          color: #fff;
          margin: 0 0 0.65rem;
        }

        .ctab-sub {
          font-size: clamp(0.78rem, 1.1vw, 0.9rem);
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          margin: 0 0 1.65rem;
          max-width: 380px;
        }

        .ctab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: transparent;
          color: #fff;
          border: 2px solid ${accentColor};
          padding: 0.78rem 1.8rem;
          font-size: 0.67rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          border-radius: 100px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .ctab-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${accentColor};
          transform: translateX(-105%);
          transition: transform 0.42s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .ctab-btn--filled {
          background: ${accentColor};
          border-color: ${accentColor};
        }

        .ctab-btn--filled::before {
          background: rgba(255,255,255,0.2);
        }

        .ctab-btn:hover::before { transform: translateX(0); }
        .ctab-btn:hover { box-shadow: 0 6px 30px rgba(0,206,193,0.4); }
        .ctab-btn span, .ctab-btn svg { position: relative; z-index: 1; }
        .ctab-btn svg { transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1); }
        .ctab-btn:hover svg { transform: translateX(3px); }

        @media (max-width: 768px) {
          .ctab-w-wrap { width: 60%; right: -8%; }
          .ctab-content { max-width: 58%; }
        }

        @media (max-width: 480px) {
          .ctab-w-wrap { display: none; }
          .ctab-content { max-width: 100%; padding: 0 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default CallToAction;