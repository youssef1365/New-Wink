import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal.jsx';

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"     x2="12" y2="3" />
      <line x1="12" y1="21"    x2="12" y2="23" />
      <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12"    x2="3"  y2="12" />
      <line x1="21" y1="12"    x2="23" y2="12" />
      <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
    </svg>
);

const InsightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);


const PROGRAMME_ITEMS = [
  { label: 'Enterprises',              href: '/Entreprises'          },
  { label: 'Government & Associations',href: '/Government'},
  { label: 'Event Organizers',         href: '/Organizers'      },
];

const PortalContactModal = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(<ContactModal />, document.body);
};

const Header = ({ activeSection, scrollVelocity, scrollDirection, theme: themeProp, setTheme: setThemeProp, scrollProgress }) => {
  const [internalTheme, setInternalTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const programsRef = useRef(null);
  const leaveTimer = useRef(null);
  const lastY = React.useRef(0);

  const theme = themeProp !== undefined ? themeProp : internalTheme;
  const setTheme = (val) => {
    setInternalTheme(val);
    if (setThemeProp) setThemeProp(val);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (!mobileMenuOpen) {
        setHidden(currentY > lastY.current && currentY > 300 && (scrollVelocity || 0) > 1.5);
      }
      lastY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollVelocity, mobileMenuOpen]);

  useEffect(() => {
    if (!scrollProgress) return;
    const unsubscribe = scrollProgress.on('change', (v) => setProgressWidth(v * 100));
    return unsubscribe;
  }, [scrollProgress]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleMobileCta = () => {
    window.dispatchEvent(new Event('openContactModal'));
    setMobileMenuOpen(false);
  };

  const handleEngageClick = () => {
    window.dispatchEvent(new Event('openInsightModal'));
  };

  // Hover helpers with a small delay so the dropdown doesn't vanish on micro-gaps
  const handleProgramsEnter = () => {
    clearTimeout(leaveTimer.current);
    setProgramsOpen(true);
  };
  const handleProgramsLeave = () => {
    leaveTimer.current = setTimeout(() => setProgramsOpen(false), 120);
  };

  return (
      <>
        <motion.header
            className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-active' : ''}`}
            animate={{ y: mounted && hidden && !mobileMenuOpen ? '-100%' : '0%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="progress-bar">
            <motion.div className="progress-fill" style={{ width: `${progressWidth}%` }} />
          </div>

          <div className="nav-container">
            <nav className="nav">
              <div className="nav-logo">
                <a href="/" className="logo-wrapper">
                  <div className="dynamic-logo" />
                </a>
              </div>

              <ul className="nav-links desktop-only">
                <li>
                  <a href="/" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                    <span className="nav-link-text">Home</span>
                  </a>
                </li>
                <li>
                  <a href="/#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>
                    <span className="nav-link-text">Expertise</span>
                  </a>
                </li>

                {/* ── Programs with dropdown ── */}
                <li
                  className="programs-parent"
                  ref={programsRef}
                  onMouseEnter={handleProgramsEnter}
                  onMouseLeave={handleProgramsLeave}
                >
                  <a href="/Packages" className={`nav-link ${activeSection === 'packages' ? 'active' : ''}`}>
                    <span className="nav-link-text">Programs</span>
                    <svg
                      className={`chevron ${programsOpen ? 'open' : ''}`}
                      width="10" height="10" viewBox="0 0 10 10"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="2 3.5 5 6.5 8 3.5" />
                    </svg>
                  </a>

                  <AnimatePresence>
                    {programsOpen && (
                      <motion.ul
                        className="programs-dropdown"
                        style={{ width: programsRef.current ? programsRef.current.offsetWidth + 'px' : 'max-content' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >
                        {PROGRAMME_ITEMS.map((item) => (
                          <li key={item.href}>
                            <a href={item.href} className="dropdown-item">
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li>
                  <a href="/Event" className={`nav-link ${activeSection === 'events' ? 'active' : ''}`}>
                    <span className="nav-link-text">Events</span>
                  </a>
                </li>

                <li>
                  <a href="/Platform" className={`nav-link ${activeSection === 'platform' ? 'active' : ''}`}>
                    <span className="nav-link-text">B2B Platform</span>
                  </a>
                </li>
                <li>
                  <a href="/AboutUs" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                    <span className="nav-link-text">WINK</span>
                  </a>
                </li>
              </ul>

              <div className="nav-cta">
                <button className="theme-toggle-minimal" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
                <button
                    className="cta-button-high-end desktop-only"
                    onClick={() => window.dispatchEvent(new Event('openContactModal'))}
                >
                  <span className="cta-text">Start a Project</span>
                </button>

                <button
                    className={`hamburger-menu ${mobileMenuOpen ? 'is-active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                  <span className="line" />
                  <span className="line" />
                </button>
              </div>
            </nav>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mobile-overlay"
                >
                  <ul className="mobile-links">
                    <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
                    <li><a href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>

                    {/* Mobile Programs accordion-style */}
                    <li className="mobile-programs-group">
                      <a href="/Programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
                      <ul className="mobile-sub-links">
                        {PROGRAMME_ITEMS.map((item) => (
                          <li key={item.href}>
                            <a href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li><a href="/Event" onClick={() => setMobileMenuOpen(false)}>Events</a></li>
                    <li><a href="/AboutUs" onClick={() => setMobileMenuOpen(false)}>Wink</a></li>

                    <li className="mobile-engage-wrapper">
                      <button
                          className="engage-btn mobile-engage"
                          onClick={() => { handleEngageClick(); setMobileMenuOpen(false); }}
                      >
                        <InsightIcon />
                        <span className="engage-label">Engage</span>
                        <span className="engage-tag">Insight</span>
                      </button>
                    </li>

                    <li className="mobile-cta-wrapper">
                      <button className="cta-button-high-end mobile-cta" onClick={handleMobileCta}>
                        Start a Project
                      </button>
                    </li>
                  </ul>
                </motion.div>
            )}
          </AnimatePresence>

          <style>{`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            width: 100%;
            padding: 1.1rem 0;
            background: transparent;
            transition: padding 0.5s ease, backdrop-filter 0.5s ease;
          }

          .header.scrolled {
            padding: 0.35rem 0;
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .header.mobile-active {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border-bottom: none !important;
            background: transparent !important;
          }

          .progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
          }

          .progress-fill {
            height: 100%;
            background: var(--color-one);
          }

          .nav-container {
            width: 100%;
            padding: 0 4vw;
            position: relative;
            z-index: 1002;
          }

          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .nav-logo { flex-shrink: 0; min-width: 220px; }

          .dynamic-logo {
            height: 64px;
            width: 220px;
            background-image: var(--logo-url);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: left center;
          }

          .theme-toggle-minimal {
            background: transparent;
            border: none;
            height: 44px;
            width: 44px;
            padding: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: var(--color-third);
          }

          .nav-links {
            display: flex;
            gap: clamp(1.4rem, 2.5vw, 3.2rem);
            list-style: none;
            align-items: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin: 0;
            padding: 0;
          }

          .nav-link {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            font-weight: 700;
            color: var(--color-third);
            text-decoration: none;
            cursor: pointer;
            position: relative;
            opacity: 0.75;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            border: none;
            background: none;
            transition: opacity var(--transition);
          }

          .nav-link:hover,
          .nav-link.active {
            opacity: 1;
            color: var(--color-one);
          }

          /* ── chevron ── */
          .chevron {
            opacity: 0.6;
            transition: transform 0.2s ease, opacity 0.2s ease;
            flex-shrink: 0;
          }
          .chevron.open {
            transform: rotate(180deg);
            opacity: 1;
          }

          /* ── Programs parent ── */
          .programs-parent {
            position: relative;
          }

           .programs-dropdown::before{
             content:"";
             position:absolute;
             top:0;
             left:0;
             right:0;
             height:1px;
             background:rgba(255,255,255,0.08);
           }
          .programs-dropdown {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            min-width: 260px;
            margin: 0;
            list-style: none;
            padding: 0.3rem 0;

            background: rgba(8, 28, 32, 0.35);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);

            border: 1px solid rgba(255,255,255,0.06);
            border-top: none;

            border-radius: 0 0 8px 8px;

            z-index: 1010;
            overflow: hidden;
          }

          .programs-dropdown li {
            margin: 0;
            padding: 0;
          }

          .dropdown-item {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-weight: 700;
            color: var(--color-third);
            text-decoration: none;
            display: block;
            width: 100%;
            padding: 0.65rem 1.4rem;
            opacity: 0.75;
            background: none;
            border: none;
            cursor: pointer;
            transition: opacity var(--transition), color var(--transition),
                        background var(--transition);
            white-space: nowrap;
            box-sizing: border-box;
            text-align: center;
          }

          .dropdown-item:hover {
            opacity: 1;
            color: var(--color-one);
            background: rgba(255, 255, 255, 0.05);
          }

          .nav-cta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .engage-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
          }

          .engage-tag {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.55rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--color-one, #5ecfbe);
            opacity: 0.7;
            border: 1px solid currentColor;
            padding: 0.1rem 0.3rem;
            border-radius: 2px;
            line-height: 1.4;
            vertical-align: middle;
            position: relative;
            top: -1px;
          }

          .engage-btn:hover .engage-tag { opacity: 1; }

          .cta-button-high-end {
            background: var(--color-third);
            color: var(--color-two);
            border: none;
            padding: 0.85rem 2rem;
            border-radius: 100px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all var(--transition);
          }

          .cta-button-high-end:hover { background-color: var(--color-fourth); }
          .cta-button-high-end:active { transform: scale(0.98); }

          .hamburger-menu {
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6px;
            background: none;
            border: none;
            cursor: pointer;
            height: 44px;
            width: 44px;
            padding: 0;
            flex-shrink: 0;
            position: relative;
            z-index: 1003;
          }

          .hamburger-menu .line {
            display: block;
            width: 24px;
            height: 2px;
            background: var(--color-third);
            border-radius: 2px;
            transition: transform 0.3s ease;
            transform-origin: center;
          }

          .hamburger-menu.is-active .line:nth-child(1) {
            transform: translateY(4px) rotate(45deg);
          }
          .hamburger-menu.is-active .line:nth-child(2) {
            transform: translateY(-4px) rotate(-45deg);
          }

          @media (max-width: 1024px) {
            .desktop-only { display: none !important; }
            .hamburger-menu { display: flex; }
            .nav-logo { min-width: auto; }
            .dynamic-logo { width: 140px; height: 40px; }

            .mobile-overlay {
              position: fixed;
              inset: 0;
              background: var(--color-two);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              z-index: 1001;
              overflow: hidden;
            }

            .mobile-links {
              list-style: none;
              text-align: center;
              padding: 0;
              margin: 0;
            }

            .mobile-links li { margin: 1.5rem 0; }

            .mobile-links a {
              color: var(--color-third);
              font-size: 1.5rem;
              text-transform: uppercase;
              font-weight: 800;
              text-decoration: none;
              letter-spacing: 0.1em;
            }

            /* mobile sub-links under Packages */
            .mobile-programs-group { margin-bottom: 0 !important; }

            .mobile-sub-links {
              list-style: none;
              padding: 0;
              margin: 0.6rem 0 0;
            }

            .mobile-sub-links li { margin: 0.6rem 0 !important; }

            .mobile-sub-links a {
              font-size: 1rem !important;
              opacity: 0.65;
              letter-spacing: 0.18em !important;
            }

            .mobile-engage-wrapper { margin-top: 0.5rem !important; }

            .mobile-engage {
              font-size: 1.5rem;
              opacity: 0.9;
              color: var(--color-third);
            }

            .mobile-engage .engage-tag {
              font-size: 0.7rem;
              padding: 0.15rem 0.5rem;
            }

            .mobile-cta-wrapper { margin-top: 1.5rem !important; }

            .mobile-cta {
              font-size: 1.1rem;
              padding: 1.2rem 2.5rem;
              color: var(--color-two);
              background: var(--color-third);
            }
          }
        `}</style>
        </motion.header>
      </>
  );
};

export default Header;