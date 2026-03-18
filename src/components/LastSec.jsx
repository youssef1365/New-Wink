import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FinalCTA = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const smoothBgY = useSpring(bgY, { stiffness: 50, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 25 });

  const openContactModal = () => {
    window.dispatchEvent(new Event('openContactModal'));
  };

  return (
    <section ref={containerRef} className="finalcta-container">
      <div className="finalcta-sticky-track">

        <motion.div
          className="finalcta-bg"
          style={{
            scale: bgScale,
            y: smoothBgY,
          }}
        />

        <div className="finalcta-mask-layer" />

        <motion.div
          className="finalcta-content"
          style={{
            opacity: sectionOpacity,
            y: smoothContentY,
          }}
        >
          <motion.p
            className="finalcta-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Final Section
          </motion.p>

          <motion.h2
            className="finalcta-headline"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Growth Doesn't Happen by Chance.
            <br />
            <span className="finalcta-accent">It's Designed.</span>
          </motion.h2>

          <motion.p
            className="finalcta-subheadline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            Partner with Wink to build structured international opportunity ecosystems.
          </motion.p>

          <motion.button
            className="finalcta-btn"
            onClick={openContactModal}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Talk to Our Expert</span>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>

      </div>

      <style>{`
        .finalcta-container {
          position: relative;
          height: 400vh;
          background-color: #020d14;
          width: 100%;
        }

        .finalcta-sticky-track {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          background-color: #020d14;
        }

        .finalcta-bg {
          position: absolute;
          inset: -15% 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          will-change: transform;
        }

        .finalcta-mask-layer {
          position: absolute;
          inset: -1px;
          z-index: 1;
          background:
            linear-gradient(to bottom, #020d14 0%, transparent 18%, transparent 82%, #020d14 100%);
        }

        :root[data-theme="light"] .finalcta-container,
        :root[data-theme="light"] .finalcta-sticky-track {
          background-color: #D1DBDC;
        }

        :root[data-theme="light"] .finalcta-mask-layer {
          background:
            linear-gradient(to bottom, #D1DBDC 0%, transparent 18%, transparent 82%, #D1DBDC 100%);
        }

        .finalcta-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 6vw;
          width: 100%;
          max-width: 700px;
        }

        .finalcta-eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 1.2rem 0;
        }

        .finalcta-headline {
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          color: white;
          text-shadow: 0 4px 32px rgba(0,0,0,0.5);
          margin: 0 0 1.4rem 0;
        }

        .finalcta-accent {
          color: var(--color-one, #00CEC1);
        }

        .finalcta-subheadline {
          font-size: clamp(0.82rem, 1.1vw, 0.95rem);
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 2.4rem 0;
          max-width: 480px;
        }

        .finalcta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: white;
          color: #020d14;
          border: none;
          padding: 1rem 2.4rem;
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
          box-shadow: 0 4px 24px rgba(255,255,255,0.12);
        }

        .finalcta-bg {
          position: absolute;
          inset: -15% 0;
          background-image: url('/b2b-img.png');
          background-size: cover;
          background-position: center;
          z-index: 0;
          will-change: transform;
        }

        .finalcta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          transform: translateX(-105%);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .finalcta-btn:hover::before {
          transform: translateX(0);
        }

        .finalcta-btn:hover {
          color: white;
          box-shadow: 0 8px 36px rgba(255,255,255,0.18);
        }

        .finalcta-btn span,
        .finalcta-btn svg {
          position: relative;
          z-index: 1;
        }

        .finalcta-btn svg {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .finalcta-btn:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .finalcta-container { height: 180vh; }
          .finalcta-mask-layer {
            background:
              linear-gradient(to bottom, #020d14 0%, transparent 20%, transparent 80%, #020d14 100%);
          }
          :root[data-theme="light"] .finalcta-mask-layer {
            background:
              linear-gradient(to bottom, #D1DBDC 0%, transparent 20%, transparent 80%, #D1DBDC 100%);
          }
        }
      `}</style>
    </section>
  );
};

export default FinalCTA;