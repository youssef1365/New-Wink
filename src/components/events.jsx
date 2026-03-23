import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
  const [portalMounted, setPortalMounted] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => { setPortalMounted(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { setCurrentIndex(0); }, [filter]);

  useEffect(() => {
    if (selectedEvent) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = scrollY;
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || '0');
      document.body.style.overflow = '';
      delete document.body.dataset.scrollY;
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxSrc) setLightboxSrc(null);
        else setSelectedEvent(null);
      }
      if (!selectedEvent && !lightboxSrc) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxSrc, selectedEvent, currentIndex, filter]);

  const allEvents = [
    { id: 1, type: 'upcoming', name: 'FOODEX JAPAN 2026', location: 'Japan', date: 'March 10 (Tue.) - 13 (Fri.), 2026', details: 'Morocco will showcase the richness and diversity of its agri-food sector at FOODEX Japan 2026, one of Asia\'s leading international food and beverage exhibitions.' },
    { id: 2, type: 'upcoming', name: 'Moroccan Business Mission for Agri-food & Fresh Products', location: 'Jaal Hotel Marrakech, Marrakech', date: 'March 26, 2026', details: 'The Morocco Food & Fresh Produce Incoming Business Mission 2026, hosted in Marrakech, is an exclusive B2B initiative organized by Morocco Foodex.' },
    { id: 3, type: 'upcoming', name: 'International Food & Drink Event (IFE) 2026', location: 'ExCeL London, United Kingdom', date: '30 March – 01 April 2026', details: 'IFE is the ultimate business event for food & drink product discovery, bringing together over 25,000 verified trade visitors, expert speakers, and global exhibitors.' },
    { id: 4, type: 'upcoming', name: 'Moroccan Trade Mission of Olive Oil Industry in New York', location: 'New York City', date: 'March 27th, 2026', details: 'Taking place in the heart of New York City, the Moroccan Trade Mission – Olive Oil Industry, organized by Morocco Foodex.' },
    { id: 5, type: 'past', name: 'The Moroccan Seafood Trade Mission in Ghana', location: 'Ghana', date: 'Mardi 9 Décembre 2025', details: 'The Moroccan Seafood Trade Mission in Ghana is a high-level B2B event designed to connect Moroccan seafood exporters with Ghanaian importers, distributors, and buyers.', results: { meetings: 70, buyers: 41 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana2.jpeg'] },
    { id: 6, type: 'past', name: '8th China International Import Expo (CIIE 2025)', location: 'China', date: '5 au 10 novembre 2025', details: 'The Morocco Foodex Pavilion at the China International Import Expo (CIIE 2025) highlights Morocco\'s dynamic agri-food sector.', results: { meetings: 60, buyers: 37 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china2.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china3.jpeg'] },
    { id: 7, type: 'past', name: 'KOREA BUILD WEEK 2025', location: 'Korea', date: '30 juillet au 2 août 2025', details: 'KOREA BUILD WEEK 2025 brings together global leaders in building materials, interior design, construction equipment, and smart building technologies.', results: { meetings: 81, buyers: 48 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea2.jpeg'] },
    { id: 8, type: 'past', name: 'Mission commerciale du textile et des matières premières au Maroc', location: 'Casablanca, Morocco', date: '5 au 7 Novembre 2025', details: 'La Mission commerciale du textile et des matières premières – Maroc, organisée par İTHİB en collaboration avec le Ministère turc du Commerce.', results: { meetings: 942, buyers: 247 } },
    { id: 9, type: 'past', name: 'GULFOOD 2026', location: 'Dubai Exhibition Centre', date: '26 au 30 Janvier 2026', details: 'Taking place at the Dubai Exhibition Centre at Expo City Dubai, Gulfood is the world\'s largest and most influential food and beverage exhibition.', results: { meetings: 260, buyers: 162 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/GULFOOD-2026/gulfood1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/GULFOOD-2026/gulfood2.jpeg'] },
    { id: 10, type: 'past', name: 'Conxemar 2025', location: 'Vigo, Espagne', date: '7 au 9 octobre 2025', details: 'Salon international de référence pour les produits de la mer surgelés.', results: { meetings: 177, buyers: 61 } },
    { id: 11, type: 'past', name: 'Multi-Sector Food Trade Mission', location: 'Variable', date: 'Automne 2025', details: 'Dans le cadre du renforcement des échanges commerciaux entre la Turquie et le Maroc, cet événement B2B réunit une délégation d\'entreprises turques.', results: { meetings: 128, buyers: 29 } },
    { id: 12, type: 'past', name: 'Big 5 Global Dubai', location: 'Dubai World Trade Centre', date: '24 au 27 novembre 2025', details: 'Taking place from November 24 – 27, 2025 at the Dubai World Trade Centre, Big 5 Global is the largest construction event in the Middle East and Africa.', results: { meetings: 142, buyers: 94 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big51.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big52.jpeg'] },
    { id: 13, type: 'past', name: 'ADIFE 2025', location: 'Abu Dhabi', date: 'Novembre 2025', details: 'Salon stratégique à Abu Dhabi pour le secteur F&B et l\'hôtellerie.', results: { meetings: 255, buyers: 85 }, photos: ['/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif2.jpeg'] },
    { id: 14, type: 'past', name: 'Kitchenware & Tableware Trade Mission', location: 'To be confirmed', date: 'Saison 2025', details: 'Une mission de prospection ciblée permettant aux fabricants turcs d\'articles de cuisine et de table de rencontrer des acheteurs stratégiques.', results: { meetings: 250, buyers: 44 } },
    { id: 15, type: 'past', name: 'Mission Commerciale en République Démocratique du Congo', location: 'Kinshasa et Lubumbashi', date: 'Courant 2025/2026', details: 'Mission de prospection à Kinshasa et Lubumbashi pour explorer les opportunités dans les infrastructures, l\'énergie et l\'agro-industrie.', results: { meetings: 159, buyers: 71 } },
  ];

  const upcomingImages = { 1: '/tokyo.jpeg', 2: '/marakkesh.jpeg', 3: '/london.jpeg', 4: '/newyork.jpeg' };

  const filteredEvents = allEvents.filter((e) => e.type === filter);
  const total = filteredEvents.length;
  const VISIBLE = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, total - VISIBLE);

  const handleNext = () => { setDirection(1); setCurrentIndex((i) => Math.min(i + 1, maxIndex)); };
  const handlePrev = () => { setDirection(-1); setCurrentIndex((i) => Math.max(i - 1, 0)); };

  const switchToUpcoming = () => {
    setSelectedEvent(null);
    setFilter('upcoming');
    setTimeout(() => {
      document.getElementById('events-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const visibleEvents = filteredEvents.slice(currentIndex, currentIndex + VISIBLE);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) handleNext(); else handlePrev(); }
    touchStartX.current = null;
  };

  const modalContent = portalMounted ? createPortal(
    <AnimatePresence>
      {selectedEvent && (
        <motion.div
          className="ev-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            className="ev-modal-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="ev-modal-stripe" />
            <button className="ev-modal-close" onClick={() => setSelectedEvent(null)}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="ev-modal-tag">
              <span className={`ev-modal-tag-dot ${selectedEvent.type}`} />
              {selectedEvent.type === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
            </div>
            <h2 className="ev-modal-title">{selectedEvent.name}</h2>
            <div className="ev-modal-meta">
              <span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {selectedEvent.location}
              </span>
              <span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {selectedEvent.date}
              </span>
            </div>
            <div className="ev-modal-divider" />
            <p className="ev-modal-desc">{selectedEvent.details}</p>
            {selectedEvent.results && (
              <div className="ev-modal-stats">
                <div className="ev-modal-stat">
                  <span>{selectedEvent.results.meetings.toLocaleString()}</span>
                  <small>B2B Meetings</small>
                </div>
                <div className="ev-modal-stat-div" />
                <div className="ev-modal-stat">
                  <span>{selectedEvent.results.buyers.toLocaleString()}</span>
                  <small>Buyers</small>
                </div>
              </div>
            )}
            {selectedEvent.type === 'past' && selectedEvent.photos?.length > 0 && (
              <div className="ev-modal-gallery">
                <p className="ev-modal-gallery-label">Gallery <span>· tap to enlarge</span></p>
                <div className="ev-modal-photos">
                  {selectedEvent.photos.map((src, i) => (
                    <button key={i} className="ev-modal-photo" onClick={() => setLightboxSrc(src)}>
                      <img src={src} alt={`${selectedEvent.name} ${i + 1}`} loading="lazy" />
                      <div className="ev-photo-zoom">⤢</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="ev-modal-footer">
              {selectedEvent.type === 'upcoming'
                ? <button className="ev-modal-cta" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>Register Interest</button>
                : <button className="ev-modal-cta" onClick={switchToUpcoming}>View Upcoming Events</button>
              }
              <button className="ev-modal-dismiss" onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  const lightboxContent = portalMounted ? createPortal(
    <AnimatePresence>
      {lightboxSrc && (
        <motion.div
          className="ev-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setLightboxSrc(null)}
        >
          <motion.img
            src={lightboxSrc}
            className="ev-lightbox-img"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          />
          <button className="ev-lightbox-close" onClick={() => setLightboxSrc(null)}>✕</button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <>
      <section className="events-section" id="events-anchor">
        <div className="events-header">
          <h2 className="events-title">Events</h2>
          <p className="events-subtitle">Explore upcoming initiatives and past projects delivered across industries and markets.</p>
          <div className="filter-tabs">
            <button className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Upcoming Events</button>
            <button className={`tab-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>Past Events</button>
          </div>
        </div>

        <div className="carousel-wrapper" ref={carouselRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button className="carousel-nav prev" onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-track">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleEvents.map((event) => (
                <motion.div
                  key={`${filter}-${event.id}`}
                  layout
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="event-card"
                >
                  {event.type === 'upcoming' && upcomingImages[event.id] && (
                    <div className="event-card-img" style={{ backgroundImage: `url(${upcomingImages[event.id]})` }}>
                      <div className="event-card-img-gradient" />
                      <span className="event-card-city">{event.location.split(',')[0].toUpperCase()}</span>
                    </div>
                  )}
                  <div className="event-info">
                    <span className="event-type-tag">{event.type === 'upcoming' ? 'Upcoming' : 'Past'}</span>
                    <h3 className="event-name">{event.name}</h3>
                    <div className="event-meta">
                      <span>📍 {event.location}</span>
                      <span>📅 {event.date}</span>
                    </div>
                    {event.results && (
                      <div className="event-results-inline">
                        <span><strong>{event.results.meetings}</strong> meetings</span>
                        <span><strong>{event.results.buyers}</strong> buyers</span>
                      </div>
                    )}
                  </div>
                  <button className="view-event-cta" onClick={() => setSelectedEvent(event)}>
                    View Event
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button className="carousel-nav next" onClick={handleNext} disabled={currentIndex >= maxIndex} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="events-footer">
          <a href="/Event" className="view-all-events-btn">
            <span>View All Events</span>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {modalContent}
      {lightboxContent}

      <style>{`
        .events-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .events-header {
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto var(--space-xl);
          text-align: center;
        }

        .events-title {
          font-size: clamp(2rem, 5vw, 4rem);
          color: var(--color-text-primary);
          font-weight: 800;
          margin-bottom: var(--space-sm);
        }

        .events-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
          max-width: 560px;
          margin: 0 auto var(--space-lg);
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: rgba(0,206,193,0.04);
          border: 1px solid rgba(0,206,193,0.15);
          color: var(--color-text-secondary);
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: clamp(0.8rem, 2.5vw, 1rem);
        }

        .tab-btn.active {
          background: var(--color-one, #00CEC1);
          color: var(--color-two);
          border-color: var(--color-one, #00CEC1);
        }

        .carousel-wrapper {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .carousel-nav {
          flex-shrink: 0;
          width: 44px;
          min-height: 44px;
          background: rgba(0,206,193,0.06);
          border: 1px solid rgba(0,206,193,0.15);
          border-radius: 12px;
          color: var(--color-text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
          align-self: center;
        }

        .carousel-nav:hover:not(:disabled) {
          background: rgba(0,206,193,0.15);
          border-color: var(--color-one, #00CEC1);
          transform: scale(1.05);
        }

        .carousel-nav:disabled { opacity: 0.2; cursor: default; }

        .carousel-track {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          min-height: 260px;
        }

        .event-card {
          background: var(--color-two);
          border-radius: 12px;
          border: 1px solid rgba(0,206,193,0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: var(--color-one, #00CEC1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
          z-index: 1;
        }

        .event-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,206,193,0.15); border-color: var(--color-one, #00CEC1); }
        .event-card:hover::before { transform: scaleX(1); }
        .event-card:hover .event-name { color: var(--color-one, #00CEC1); }

        .event-card-img {
          width: 100%;
          height: 180px;
          flex-shrink: 0;
          background-size: cover;
          background-position: center 20%;
          position: relative;
        }

        .event-card-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%);
        }

        .event-card-city {
          position: absolute;
          bottom: 12px; left: 14px;
          color: white;
          font-size: 1.3rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.6);
          line-height: 1;
        }

        .event-info { padding: 1.2rem 1.5rem 0; flex: 1; }

        .event-type-tag {
          display: inline-block;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-one, #00CEC1);
          border: 1px solid rgba(0,206,193,0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          margin-bottom: 0.9rem;
        }

        .event-name {
          color: var(--color-text-primary);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.35;
          transition: color 0.3s ease;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          margin-bottom: 0.8rem;
        }

        .event-results-inline {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(0,206,193,0.05);
          border: 1px solid rgba(0,206,193,0.1);
          border-radius: 8px;
        }

        .event-results-inline span { font-size: 0.72rem; color: var(--color-text-secondary); }
        .event-results-inline strong { color: var(--color-one, #00CEC1); font-weight: 800; }

        .view-event-cta {
          margin: 1.2rem 1.5rem 1.5rem;
          background: none;
          border: 1px solid rgba(0,206,193,0.2);
          color: var(--color-text-primary);
          padding: 0.55rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.72rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-start;
          transition: all 0.25s ease;
          letter-spacing: 0.04em;
        }

        .view-event-cta:hover { background: rgba(0,206,193,0.08); border-color: var(--color-one, #00CEC1); color: var(--color-one, #00CEC1); }
        .view-event-cta svg { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .view-event-cta:hover svg { transform: translateX(3px); }

        .carousel-dots {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1.8rem;
          flex-wrap: wrap;
        }

        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0,206,193,0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s ease, width 0.25s ease;
        }

        .dot.active {
          background: var(--color-one, #00CEC1);
          width: 20px;
          border-radius: 100px;
        }

        .events-footer { margin-top: 3rem; display: flex; justify-content: center; }

        .view-all-events-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--color-text-primary);
          border: 2px solid rgba(0,206,193,0.3);
          padding: 0.75rem 2.2rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          border-radius: 100px;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }

        .view-all-events-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-one, #00CEC1);
          transform: translateX(-105%);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .view-all-events-btn:hover::before { transform: translateX(0); }
        .view-all-events-btn:hover { color: var(--color-two); border-color: var(--color-one, #00CEC1); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,206,193,0.25); }
        .view-all-events-btn span, .view-all-events-btn svg { position: relative; z-index: 1; }
        .view-all-events-btn svg { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .view-all-events-btn:hover svg { transform: translateX(4px); }

        .ev-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .ev-modal-panel {
          position: relative;
          background: var(--color-two);
          filter: brightness(1.1);
          border: 1px solid rgba(0,206,193,0.12);
          border-radius: 12px;
          padding: 2.8rem;
          width: min(680px, 94vw);
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          scrollbar-width: none;
        }

        .ev-modal-panel::-webkit-scrollbar { display: none; }

        .ev-modal-stripe {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-one, #00CEC1), var(--color-fourth, #007baa));
          border-radius: 12px 12px 0 0;
        }

        .ev-modal-close {
          position: absolute;
          top: 1.4rem; right: 1.4rem;
          background: rgba(0,206,193,0.06);
          border: 1px solid rgba(0,206,193,0.15);
          border-radius: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--color-third);
          opacity: 0.7;
          transition: opacity 0.2s, border-color 0.2s;
        }

        .ev-modal-close:hover { opacity: 1; border-color: var(--color-one, #00CEC1); }

        .ev-modal-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-third);
          opacity: 0.5;
          border: 1px solid rgba(0,206,193,0.15);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
        }

        .ev-modal-tag-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .ev-modal-tag-dot.upcoming { background: var(--color-one, #00CEC1); }
        .ev-modal-tag-dot.past { background: var(--color-fourth, #007baa); }

        .ev-modal-title {
          font-size: clamp(1.3rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--color-third);
          margin: 0 0 1.2rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
          padding-right: 2.5rem;
        }

        .ev-modal-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.4rem; }

        .ev-modal-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-third);
          opacity: 0.6;
        }

        .ev-modal-meta svg { color: var(--color-one, #00CEC1); opacity: 1; flex-shrink: 0; }

        .ev-modal-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,206,193,0.2) 0%, transparent 100%);
          margin-bottom: 1.4rem;
        }

        .ev-modal-desc {
          font-size: 0.9rem;
          color: var(--color-third);
          opacity: 0.65;
          line-height: 1.8;
          margin: 0 0 1.5rem;
        }

        .ev-modal-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem 1.5rem;
          background: rgba(0,206,193,0.05);
          border: 1px solid rgba(0,206,193,0.12);
          border-radius: 10px;
        }

        .ev-modal-stat { display: flex; flex-direction: column; text-align: center; flex: 1; }
        .ev-modal-stat span { font-size: 1.8rem; font-weight: 800; color: var(--color-one, #00CEC1); line-height: 1; }
        .ev-modal-stat small { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-third); opacity: 0.5; margin-top: 0.25rem; }
        .ev-modal-stat-div { width: 1px; height: 40px; background: rgba(0,206,193,0.15); flex-shrink: 0; }

        .ev-modal-gallery { margin-bottom: 1.5rem; }

        .ev-modal-gallery-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-third);
          margin-bottom: 0.75rem;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ev-modal-gallery-label span { opacity: 0.4; text-transform: none; letter-spacing: 0; }

        .ev-modal-photos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }

        .ev-modal-photo {
          aspect-ratio: 4/3;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0,206,193,0.1);
          padding: 0;
          cursor: zoom-in;
          position: relative;
          display: block;
          background: rgba(0,206,193,0.04);
        }

        .ev-modal-photo img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: opacity 0.2s, transform 0.3s; }
        .ev-modal-photo:hover img { opacity: 1; transform: scale(1.05); }

        .ev-photo-zoom {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; color: white;
          background: rgba(0,0,0,0.3);
          opacity: 0; transition: opacity 0.2s;
        }

        .ev-modal-photo:hover .ev-photo-zoom { opacity: 1; }

        .ev-modal-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,206,193,0.1);
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .ev-modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-one, #00CEC1);
          color: var(--color-two);
          border: none;
          padding: 0.8rem 1.8rem;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.25s;
        }

        .ev-modal-cta:hover { background: var(--color-fourth, #007baa); transform: translateY(-1px); }

        .ev-modal-dismiss {
          background: none;
          border: none;
          color: var(--color-third);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .ev-modal-dismiss:hover { opacity: 0.8; }

        .ev-lightbox {
          position: fixed; inset: 0; z-index: 1300;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem; cursor: zoom-out;
        }

        .ev-lightbox-img {
          max-width: 100%; max-height: 90vh;
          border-radius: 8px; object-fit: contain;
          cursor: default; box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }

        .ev-lightbox-close {
          position: absolute; top: 1.2rem; right: 1.2rem;
          background: rgba(0,206,193,0.15);
          border: 1px solid rgba(0,206,193,0.3);
          border-radius: 50%; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; font-size: 1rem;
          transition: background 0.2s;
        }

        .ev-lightbox-close:hover { background: rgba(0,206,193,0.3); }

        @media (max-width: 900px) {
          .carousel-track { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .events-section { padding: 4rem 0.75rem 3rem; }
          .events-title { font-size: 2rem; }
          .events-subtitle { font-size: 0.88rem; }
          .filter-tabs { gap: 0.5rem; }
          .tab-btn { padding: 0.65rem 1.1rem; font-size: 0.78rem; }
          .carousel-wrapper { gap: 0.4rem; }
          .carousel-nav { width: 32px; min-width: 32px; height: 32px; border-radius: 8px; align-self: center; }
          .carousel-track { grid-template-columns: 1fr; gap: 0; min-height: unset; }
          .event-card { border-radius: 12px; width: 100%; }
          .event-card-img { height: 200px; border-radius: 12px 12px 0 0; }
          .event-info { padding: 1.1rem 1.2rem 0; }
          .event-name { font-size: 1.1rem; font-weight: 800; }
          .event-meta { font-size: 0.78rem; }
          .view-event-cta { margin: 1rem 1.2rem 1.2rem; width: calc(100% - 2.4rem); justify-content: center; padding: 0.85rem 1rem; font-size: 0.8rem; border-radius: 10px; }
          .carousel-dots { margin-top: 1.2rem; }
          .dot { width: 5px; height: 5px; }
          .dot.active { width: 18px; }
          .events-footer { margin-top: 2rem; }
          .view-all-events-btn { width: 100%; justify-content: center; padding: 0.9rem 1.5rem; font-size: 0.72rem; }

          .ev-modal-overlay {
            align-items: center;
            padding: 1.25rem;
          }

          .ev-modal-panel {
            width: 100%;
            max-width: 94vw;
            max-height: 88vh;
            border-radius: 12px;
            padding: 2rem 1.25rem 1.5rem;
          }

          .ev-modal-title { font-size: 1.2rem; }
          .ev-modal-photos { grid-template-columns: repeat(2, 1fr); }
          .ev-modal-footer { flex-direction: column; align-items: stretch; }
          .ev-modal-cta { justify-content: center; width: 100%; }
          .ev-modal-dismiss { text-align: center; }
        }
      `}</style>
    </>
  );
};

export default Events;