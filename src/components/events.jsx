import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const carouselRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
    {
      id: 1, type: 'upcoming',
      name: 'FOODEX JAPAN 2026',
      location: 'Japan',
      date: 'March 10 (Tue.) - 13 (Fri.), 2026',
      details: 'Morocco will showcase the richness and diversity of its agri-food sector at FOODEX Japan 2026, one of Asia\'s leading international food and beverage exhibitions. Renowned for its Mediterranean and North African culinary heritage, Morocco offers a wide range of high-quality, export-ready food products, combining tradition, natural resources, and modern production standards.'
    },
    {
      id: 2, type: 'upcoming',
      name: 'Moroccan Business Mission for Agri-food & Fresh Products',
      location: 'Jaal Hotel Marrakech, Marrakech',
      date: 'March 26, 2026',
      details: 'The Morocco Food & Fresh Produce Incoming Business Mission 2026, hosted in Marrakech, is an exclusive B2B initiative organized by Morocco Foodex to strengthen international trade partnerships and promote Moroccan agri-food and fresh produce exports.'
    },
    {
      id: 3, type: 'upcoming',
      name: 'International Food & Drink Event (IFE) 2026',
      location: 'ExCeL London, United Kingdom',
      date: '30 March – 01 April 2026',
      details: 'IFE is the ultimate business event for food & drink product discovery, bringing together over 25,000 verified trade visitors, expert speakers, and global exhibitors from across the food & beverage industry.'
    },
    {
      id: 4, type: 'upcoming',
      name: 'Moroccan Trade Mission of Olive Oil Industry in New York',
      location: 'New York City',
      date: 'March 27th, 2026',
      details: 'Taking place in the heart of New York City, the Moroccan Trade Mission – Olive Oil Industry, organized by Morocco Foodex, builds on previous successful editions in the United States.'
    },
    {
      id: 5, type: 'past',
      name: 'The Moroccan Seafood Trade Mission in Ghana',
      location: 'Ghana',
      date: 'Mardi 9 Décembre 2025',
      details: 'The Moroccan Seafood Trade Mission in Ghana is a high-level B2B event designed to connect Moroccan seafood exporters with Ghanaian importers, distributors, and buyers.',
      results: { meetings: 70, buyers: 41 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana2.jpeg']
    },
    {
      id: 6, type: 'past',
      name: '8th China International Import Expo (CIIE 2025)',
      location: 'China',
      date: '5 au 10 novembre 2025',
      details: 'The Morocco Foodex Pavilion at the China International Import Expo (CIIE 2025) highlights Morocco\'s dynamic agri-food sector and its growing partnership with China.',
      results: { meetings: 60, buyers: 37 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china2.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china3.jpeg']
    },
    {
      id: 7, type: 'past',
      name: 'KOREA BUILD WEEK 2025',
      location: 'Korea',
      date: '30 juillet au 2 août 2025',
      details: 'KOREA BUILD WEEK 2025 brings together global leaders in building materials, interior design, construction equipment, and smart building technologies.',
      results: { meetings: 81, buyers: 48 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea2.jpeg']
    },
    {
      id: 8, type: 'past',
      name: 'Mission commerciale du textile et des matières premières au Maroc',
      location: 'Casablanca, Morocco',
      date: '5 au 7 Novembre 2025',
      details: 'La Mission commerciale du textile et des matières premières – Maroc, organisée par İTHİB en collaboration avec le Ministère turc du Commerce, vise à renforcer les relations économiques et commerciales entre la Turquie et le Maroc.',
      results: { meetings: 942, buyers: 247 },
    },
    {
      id: 9, type: 'past',
      name: 'GULFOOD 2026',
      location: 'Dubai Exhibition Centre',
      date: '26 au 30 Janvier 2026',
      details: 'Taking place at the Dubai Exhibition Centre at Expo City Dubai, Gulfood is the world\'s largest and most influential food and beverage exhibition.',
      results: { meetings: 260, buyers: 162 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/GULFOOD-2026/gulfood1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/GULFOOD-2026/gulfood2.jpeg']
    },
    {
      id: 10, type: 'past',
      name: 'Conxemar 2025',
      location: 'Vigo, Espagne',
      date: '7 au 9 octobre 2025',
      details: 'Salon international de référence pour les produits de la mer surgelés.',
      results: { meetings: 177, buyers: 61 },
    },
    {
      id: 11, type: 'past',
      name: 'Multi-Sector Food Trade Mission',
      location: 'Variable',
      date: 'Automne 2025',
      details: 'Dans le cadre du renforcement des échanges commerciaux entre la Turquie et le Maroc, cet événement B2B réunit une délégation d\'entreprises turques leaders du secteur agroalimentaire.',
      results: { meetings: 128, buyers: 29 },
    },
    {
      id: 12, type: 'past',
      name: 'Big 5 Global Dubai',
      location: 'Dubai World Trade Centre',
      date: '24 au 27 novembre 2025',
      details: 'Taking place from November 24 – 27, 2025 at the Dubai World Trade Centre, Big 5 Global is the largest construction event in the Middle East and Africa.',
      results: { meetings: 142, buyers: 94 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big51.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big52.jpeg']
    },
    {
      id: 13, type: 'past',
      name: 'ADIFE 2025',
      location: 'Abu Dhabi',
      date: 'Novembre 2025',
      details: 'Salon stratégique à Abu Dhabi pour le secteur F&B et l\'hôtellerie.',
      results: { meetings: 255, buyers: 85 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif1.jpeg', '/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif2.jpeg']
    },
    {
      id: 14, type: 'past',
      name: 'Kitchenware & Tableware Trade Mission',
      location: 'To be confirmed',
      date: 'Saison 2025',
      details: 'Une mission de prospection ciblée permettant aux fabricants turcs d\'articles de cuisine et de table de rencontrer des acheteurs stratégiques.',
      results: { meetings: 250, buyers: 44 },
    },
    {
      id: 15, type: 'past',
      name: 'Mission Commerciale en République Démocratique du Congo',
      location: 'Kinshasa et Lubumbashi',
      date: 'Courant 2025/2026',
      details: 'Mission de prospection à Kinshasa et Lubumbashi pour explorer les opportunités dans les infrastructures, l\'énergie et l\'agro-industrie.',
      results: { meetings: 159, buyers: 71 },
    }
  ];

  const filteredEvents = allEvents.filter((e) => e.type === filter);
  const total = filteredEvents.length;
  const VISIBLE = 3;
  const maxIndex = Math.max(0, total - VISIBLE);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const switchToUpcoming = () => {
    setSelectedEvent(null);
    setFilter('upcoming');
    setTimeout(() => {
      document.getElementById('events-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const visibleEvents = filteredEvents.slice(currentIndex, currentIndex + VISIBLE);

  return (
    <>
      <section className="events-section" id="events-anchor">
        <div className="events-header">
          <h2 className="events-title">Our Events</h2>
          <p className="events-subtitle">
            Explore upcoming initiatives and past projects delivered across industries and markets.
          </p>
          <div className="filter-tabs">
            <button className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Upcoming Events</button>
            <button className={`tab-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>Past Events</button>
          </div>
        </div>

        <div className="carousel-wrapper" ref={carouselRef}>
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

      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, x: '-50%', y: '-45%' }}
              animate={{ opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, x: '-50%', y: '-45%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="modal-tag">{selectedEvent.type === 'upcoming' ? 'Upcoming' : 'Past Event'}</div>
              <h2 className="modal-title">{selectedEvent.name}</h2>
              <div className="modal-meta">
                <span className="modal-meta-item">📍 {selectedEvent.location}</span>
                <span className="modal-meta-item">📅 {selectedEvent.date}</span>
              </div>
              <div className="modal-divider" />
              <div className="modal-section">
                <h4 className="modal-section-title">Description:</h4>
                <p className="modal-details">{selectedEvent.about || selectedEvent.details}</p>
              </div>
              {selectedEvent.results && (
                <div className="modal-results-grid">
                  <div className="result-item">
                    <span className="result-value">{selectedEvent.results.meetings}</span>
                    <span className="result-label">Meetings done</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">{selectedEvent.results.buyers}</span>
                    <span className="result-label">Buyers</span>
                  </div>
                </div>
              )}
              {selectedEvent.type === 'past' && selectedEvent.photos?.length > 0 && (
                <div className="modal-photos-section">
                  <p className="modal-photos-label">Event Gallery <span className="photos-hint">tap to enlarge</span></p>
                  <div className="modal-photos-grid">
                    {selectedEvent.photos.map((src, i) => (
                      <button key={i} className="modal-photo-item" onClick={() => setLightboxSrc(src)} aria-label={`View photo ${i + 1}`}>
                        <img src={src} className="modal-photo-img" alt={`${selectedEvent.name} ${i + 1}`} loading="lazy"/>
                        <div className="photo-zoom-icon">⤢</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="modal-footer">
                {selectedEvent.type === 'upcoming' ? (
                  <>
                    <button className="modal-cta" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>Register</button>
                    <button className="modal-dismiss" onClick={() => setSelectedEvent(null)}>Close</button>
                  </>
                ) : (
                  <>
                    <button className="modal-cta" onClick={switchToUpcoming}>View Upcoming Events</button>
                    <button className="modal-dismiss" onClick={() => setSelectedEvent(null)}>Close</button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              src={lightboxSrc}
              className="lightbox-img"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-close" onClick={() => setLightboxSrc(null)}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .events-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          min-height: 80vh;
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
          font-size: clamp(2.5rem, 5vw, 4rem);
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
        }

        .tab-btn {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--color-text-secondary);
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: var(--color-text);
          color: var(--color-bg);
          border-color: var(--color-text);
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
          height: auto;
          min-height: 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
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
          background: rgba(255,255,255,0.1);
          transform: scale(1.05);
        }

        .carousel-nav:disabled {
          opacity: 0.2;
          cursor: default;
        }

        .carousel-track {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          min-height: 260px;
        }

        .event-card {
          background: var(--color-bg);
          border-radius: 8px;
          padding: 1.8rem 1.5rem;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: var(--color-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .event-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.25); border-color: rgba(255,255,255,0.12); }
        .event-card:hover::before { transform: scaleX(1); }
        .event-card:hover .event-name { color: var(--color-primary); }

        .event-type-tag {
          display: inline-block;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.4;
          border: 1px solid rgba(255,255,255,0.12);
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
          padding-top: 0.7rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .event-results-inline span {
          font-size: 0.72rem;
          color: var(--color-text-secondary);
        }

        .event-results-inline strong {
          color: var(--color-text-primary);
          font-weight: 700;
        }

        .view-event-cta {
          margin-top: 1.2rem;
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
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

        .view-event-cta:hover {
          background: var(--color-text);
          color: var(--color-bg);
          border-color: var(--color-text);
        }

        .view-event-cta svg {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .view-event-cta:hover svg { transform: translateX(3px); }

        .carousel-dots {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1.8rem;
        }

        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s ease, transform 0.25s ease, width 0.25s ease;
        }

        .dot.active {
          background: var(--color-text-primary);
          width: 20px;
          border-radius: 100px;
        }

        .events-footer {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
        }

        .view-all-events-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--color-text-primary);
          border: 2px solid rgba(255,255,255,0.2);
          padding: 0.85rem 2.2rem;
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
          background: var(--color-text-primary);
          transform: translateX(-105%);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .view-all-events-btn:hover::before { transform: translateX(0); }
        .view-all-events-btn:hover {
          color: var(--color-bg);
          border-color: var(--color-text-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,0.1);
        }

        .view-all-events-btn span,
        .view-all-events-btn svg {
          position: relative;
          z-index: 1;
        }

        .view-all-events-btn svg {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .view-all-events-btn:hover svg { transform: translateX(4px); }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 1100;
        }

        .modal-panel {
          position: fixed;
          top: 50%; left: 50%;
          z-index: 1200;
          background: var(--color-bg);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          padding: 2.8rem;
          width: min(860px, 92vw);
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }

        .modal-close {
          position: absolute;
          top: 1.4rem; right: 1.4rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-primary);
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .modal-close:hover { opacity: 1; }

        .modal-tag {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.4;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
        }

        .modal-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-text-primary);
          margin: 0 0 1.2rem 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .modal-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.4rem;
        }

        .modal-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .modal-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 100%);
          margin-bottom: 1.4rem;
        }

        .modal-section { margin-bottom: 1.5rem; }

        .modal-section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .modal-details {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .modal-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .result-item { text-align: center; display: flex; flex-direction: column; }

        .result-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .result-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
          color: var(--color-text-secondary);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(210,230,255,0.88) 100%);
          color: #050508;
          border: none;
          padding: 0.7rem 1.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          border-radius: 100px;
          cursor: pointer;
        }

        .modal-dismiss {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.5;
        }

        .modal-photos-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .photos-hint {
          font-size: 0.65rem;
          opacity: 0.4;
          text-transform: none;
          letter-spacing: 0;
        }

        .modal-photos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
          margin-top: 1rem;
        }

        .modal-photo-item {
          aspect-ratio: 4/3;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: none;
          padding: 0;
          cursor: zoom-in;
          position: relative;
          display: block;
        }

        .modal-photo-item:hover .photo-zoom-icon { opacity: 1; }
        .modal-photo-item:hover .modal-photo-img { opacity: 1; transform: scale(1.05); }

        .modal-photo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.85;
          transition: opacity 0.2s ease, transform 0.3s ease;
        }

        .photo-zoom-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: white;
          background: rgba(0,0,0,0.35);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1300;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          cursor: zoom-out;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 6px;
          object-fit: contain;
          cursor: default;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }

        .lightbox-close {
          position: absolute;
          top: 1.2rem; right: 1.2rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 44px; height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: background 0.2s ease;
        }

        .lightbox-close:hover { background: rgba(255,255,255,0.2); }

        @media (max-width: 900px) {
          .carousel-track { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .carousel-track { grid-template-columns: 1fr; }
          .modal-results-grid { grid-template-columns: 1fr; }
          .modal-panel { padding: 2rem 1.25rem 1.5rem; }
          .modal-photos-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
};

export default Events;