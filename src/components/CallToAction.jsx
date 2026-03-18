import { motion } from 'framer-motion';

const CallToAction = ({
  image = '/your-image.jpg', // ← swappable per page
  headline = "Design Your International Program",
  subheadline = "Let's explore how Wink can support your next growth initiative.",
  ctaLabel = "Start a Conversation",
  onCtaClick = null,
}) => {

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new Event('openContactModal'));
    }
  };

  return (
    <>
      <section className="cta-banner-section">
        <div className="cta-banner-bg" style={{ backgroundImage: `url(${image})` }} />
        <div className="cta-banner-overlay" />

        <div className="cta-banner-content">
          <motion.h2
            className="cta-banner-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {headline}
          </motion.h2>

          <motion.p
            className="cta-banner-sub"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {subheadline}
          </motion.p>

          <motion.button
            className="cta-banner-btn"
            onClick={handleCta}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{ctaLabel}</span>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </section>

      <style>{`
        .cta-banner-section {
          position: relative;
          width: 100%;
          height: clamp(220px, 35vw, 380px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .cta-banner-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.04);
          transition: transform 8s ease;
          z-index: 0;
        }

        .cta-banner-section:hover .cta-banner-bg {
          transform: scale(1.08);
        }

        .cta-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.78) 0%,
            rgba(0,0,0,0.55) 50%,
            rgba(0,0,0,0.2) 100%
          );
          z-index: 1;
        }

        .cta-banner-content {
          position: relative;
          z-index: 2;
          padding: 0 clamp(2rem, 8vw, 7rem);
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 680px;
        }

        .cta-banner-headline {
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: white;
          margin: 0 0 0.75rem 0;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        .cta-banner-sub {
          font-size: clamp(0.8rem, 1.1vw, 0.95rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          margin: 0 0 1.8rem 0;
          max-width: 460px;
        }

        .cta-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: white;
          color: #020d14;
          border: none;
          padding: 0.85rem 2rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          border-radius: 100px;
          cursor: pointer;
          width: fit-content;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.35s ease, color 0.35s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .cta-banner-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          transform: translateX(-105%);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .cta-banner-btn:hover::before { transform: translateX(0); }
        .cta-banner-btn:hover { color: white; box-shadow: 0 8px 28px rgba(0,0,0,0.3); }

        .cta-banner-btn span,
        .cta-banner-btn svg { position: relative; z-index: 1; }

        .cta-banner-btn svg { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .cta-banner-btn:hover svg { transform: translateX(4px); }

        @media (max-width: 768px) {
          .cta-banner-section { height: auto; padding: 4rem 0; }
          .cta-banner-content { padding: 0 1.75rem; }
        }
      `}</style>
    </>
  );
};

export default CallToAction;