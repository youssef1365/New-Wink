import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Vision = ({ lines = [], subtext, image }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const subtextY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  const smoothBgY = useSpring(bgY, { stiffness: 50, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 25 });
  const smoothHeadlineY = useSpring(headlineY, { stiffness: 55, damping: 22 });
  const smoothSubtextY = useSpring(subtextY, { stiffness: 45, damping: 18 });

  const normLines = lines.map((l) => ({
    words: Array.isArray(l.words) ? l.words : String(l.words).trim().split(/\s+/),
    accent: l.accent || false,
  }));

  const allWords = normLines.flatMap((line, li) =>
    line.words.map((_, wi) => ({ li, wi }))
  );
  const total = allWords.length || 1;

  const AnimWord = ({ word, flatIdx, accent }) => {
    const start = (flatIdx / total) * 0.4;
    const end = start + 0.2;

    const op = useTransform(scrollYProgress, [start, end, 0.8, 0.9], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, end], [25, 0]);

    const sOp = useSpring(op, { stiffness: 70, damping: 25 });
    const sY = useSpring(y, { stiffness: 70, damping: 25 });

    return (
      <motion.span
        className={`vis-word${accent ? ' vis-accent' : ''}`}
        style={{ opacity: sOp, y: sY }}
      >
        {word}
      </motion.span>
    );
  };

  return (
    <section ref={containerRef} className="vis-container">
      <div className="vis-sticky-track">
        <motion.div
          className="vis-bg"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
            scale: bgScale,
            y: smoothBgY,
          }}
        />

        <div className="vis-mask-layer" />

        <motion.div
          className="vis-content"
          style={{
            opacity: sectionOpacity,
            y: smoothContentY,
          }}
        >
          <motion.h2
            className="vis-headline"
            style={{ y: smoothHeadlineY }}
          >
            {normLines.map((line, li) => {
              const flatBase = allWords.findIndex((w) => w.li === li);
              return (
                <div key={li} className="vis-line">
                  {line.words.map((word, wi) => (
                    <AnimWord
                      key={wi}
                      word={word}
                      flatIdx={flatBase + wi}
                      accent={line.accent}
                    />
                  ))}
                </div>
              );
            })}
          </motion.h2>

          {subtext && (
            <motion.p
              className="vis-subtext"
              style={{ y: smoothSubtextY }}
            >
              {subtext}
            </motion.p>
          )}
        </motion.div>
      </div>

      <style>{`
        .vis-container {
          position: relative;
          height: 250vh;
          background-color: #002e43;
          width: 100%;
        }

        .vis-sticky-track {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          background-color: #002e43;
        }

        .vis-bg {
          position: absolute;
          inset: -15% 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          will-change: transform;
        }

        .vis-mask-layer {
          position: absolute;
          inset: -1px;
          z-index: 1;
          background:
            linear-gradient(to bottom, #002e43 0%, transparent 18%, transparent 82%, #002e43 100%);
        }

        :root[data-theme="light"] .vis-container,
        :root[data-theme="light"] .vis-sticky-track {
          background-color: #D1DBDC;
        }

        :root[data-theme="light"] .vis-mask-layer {
          background:
            linear-gradient(to bottom, #D1DBDC 0%, transparent 18%, transparent 82%, #D1DBDC 100%);
        }

        .vis-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 6vw;
          width: 100%;
        }

        .vis-headline {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1em;
          font-size: clamp(2.2rem, 5.5vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          text-transform: uppercase;
          color: white;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 32px rgba(0,0,0,0.5);
        }

        .vis-line {
          display: flex;
          justify-content: center;
          gap: 0.35em;
        }

        .vis-word {
          display: inline-block;
          will-change: transform, opacity;
        }

        .vis-word.vis-accent {
          color: var(--color-one, #00CEC1);
        }

        .vis-subtext {
          margin-top: 3rem;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: rgba(255, 255, 255, 0.7);
          max-width: 650px;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .vis-container { height: 180vh; }
          .vis-line { flex-wrap: wrap; gap: 0.2em; }
          .vis-mask-layer {
            background:
              linear-gradient(to bottom, #002e43 0%, transparent 20%, transparent 80%, #002e43 100%);
          }
          :root[data-theme="light"] .vis-mask-layer {
            background:
              linear-gradient(to bottom, #D1DBDC 0%, transparent 20%, transparent 80%, #D1DBDC 100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Vision;