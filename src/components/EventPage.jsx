import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';

const isUpcoming = (dateValue) => {
  if (!dateValue) return false;
  const raw = typeof dateValue === 'string' ? dateValue.split('T')[0] : dateValue;
  const eventDate = new Date(raw);
  if (isNaN(eventDate.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
};

const parseSector = (val) => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch { return [val]; }
  }
  return [];
};

const ALL_SECTORS = [
  'All',
  'Food / Agri-Food',
  'Construction / BTP',
  'Textile',
  'Kitchenware & HORECA',
  'Multisector',
  'Investment',
  'Electrical / Electronics',
  'Engineering',
  'Medical / Healthcare',
  'Mining',
  'Cosmetics',
  'Services',
];

const AREAS = ['All', 'Europe', 'Middle East', 'Africa', 'Asia', 'Americas'];
const EVENT_TYPES = ['All', 'Wink', 'Institutional'];

const DATE_SORTS = {
  upcoming: [
    { label: 'Soonest First', value: 'asc' },
    { label: 'Furthest First', value: 'desc' },
  ],
  past: [
    { label: 'Newest First', value: 'desc' },
    { label: 'Oldest First', value: 'asc' },
  ],
};



function Ticker() {
  const items = ['FOODEX JAPAN', 'GULFOOD', 'IFE LONDON', 'CIIE CHINA', 'BIG 5 DUBAI', 'CONXEMAR', 'KOREA BUILD WEEK', 'ADIFE ABU DHABI'];
  const doubled = [...items, ...items];
  return (
    <div className="ep-ticker-wrap">
      <motion.div className="ep-ticker-inner" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="ep-ticker-item">{item} <span className="ep-ticker-dot">✦</span></span>
        ))}
      </motion.div>
    </div>
  );
}

function Portal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

function EventModal({ event, onClose, onViewUpcoming, setLightboxSrc }) {
  if (!event) return null;
  const sectors = Array.isArray(event.sector) ? event.sector.join(', ') : (event.sector || '');
  return (
    <Portal>
      <div className="ep-overlay" onClick={onClose}>
        <motion.div
          className="ep-modal"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="ep-modal-stripe" />
          <button className="ep-modal-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div className="ep-modal-tag">
            <span className={`ep-modal-tag-dot ${event.type}`} />
            {event.type === 'upcoming' ? 'Upcoming Event' : 'Past Event'}{sectors ? ` · ${sectors}` : ''}{event.area ? ` · ${event.area}` : ''}
          </div>
          <h2 className="ep-modal-title">{event.name}</h2>
          <div className="ep-modal-meta">
            {event.location && (
              <span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {event.location}
              </span>
            )}
            {event.date && (
              <span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {event.date}{event.end_date ? ` — ${event.end_date}` : ''}
              </span>
            )}
          </div>
          <div className="ep-modal-divider" />
          <p className="ep-modal-desc">{event.details}</p>
          {event.results && (
            <div className="ep-modal-stats">
              <div className="ep-modal-stat"><span>{event.results.meetings?.toLocaleString()}</span><small>B2B Meetings</small></div>
              <div className="ep-modal-stat"><span>{event.results.buyers?.toLocaleString()}</span><small>Buyers</small></div>
            </div>
          )}
          {event.photos?.length > 0 && (
            <div className="ep-modal-gallery">
              <p className="ep-modal-gallery-label">Gallery <span>· tap to enlarge</span></p>
              <div className="ep-modal-photos">
                {event.photos.map((src, i) => (
                  <button key={i} className="ep-modal-photo" onClick={() => setLightboxSrc(src)}>
                    <img src={src} alt={`${event.name} ${i + 1}`} loading="lazy" />
                    <div className="ep-photo-zoom">⤢</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="ep-modal-footer">
            {/* NEW UPDATED CODE */}
            {event.type === 'upcoming' ? (
              <button
                className="ep-modal-cta"
                onClick={() => {
                  if (event.redirectUrl) {
                    // If an absolute external URL is saved in the DB, it opens securely in a new tab.
                    // If it's a relative path, it opens in the same window.
                    if (event.redirectUrl.startsWith('http')) {
                      window.open(event.redirectUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      window.location.href = event.redirectUrl;
                    }
                  } else {
                    // Fallback fallback if no custom link exists in your DB
                    window.location.href = `/Register?event=${event.id}`;
                  }
                }}
              >
                Register Interest
              </button>
            ) : (
              <button className="ep-modal-cta" onClick={onViewUpcoming}>
                View Upcoming Events
              </button>
            )}
            <button className="ep-modal-dismiss" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <Portal>
      <div className="ep-lightbox" onClick={onClose}>
        <motion.img src={src} className="ep-lightbox-img" initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.28 }} onClick={e => e.stopPropagation()} />
        <button className="ep-lightbox-close" onClick={onClose}>✕</button>
      </div>
    </Portal>
  );
}

function UpcomingCard({ event, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const city = (event.location || '').split(',')[0].toUpperCase();
  const sectorLabel = Array.isArray(event.sector) ? event.sector.join(' · ') : (event.sector || '');
  return (
    <motion.article
      className="ep-uc"
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
      }}
      initial="hidden" animate="show" exit="exit" layout
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="ep-uc-img" style={{ backgroundImage: event.hero_picture_url ? `url(${event.hero_picture_url})` : 'none' }}>
        <div className="ep-uc-gradient" />
        <div className="ep-uc-teal" style={{ opacity: hovered ? 1 : 0 }} />
        {event.org_name && <span className="ep-uc-org-tag">{event.org_name}</span>}
        <div className="ep-uc-city-wrap">
          {event.area && <span className="ep-uc-area-badge">{event.area}</span>}
          {city && <span className="ep-uc-city">{city}</span>}
        </div>
      </div>
      <div className="ep-uc-body">
        {sectorLabel && <div className="ep-uc-sector">{sectorLabel}</div>}
        <h3 className="ep-uc-name" style={{ color: hovered ? 'var(--color-fifth)' : undefined }}>{event.name}</h3>
        <div className="ep-uc-meta">
          {event.location && (
            <span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {event.location}
            </span>
          )}
          {event.date && (
            <span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {event.date}
            </span>
          )}
        </div>
        <button className="ep-uc-cta" onClick={e => { e.stopPropagation(); onClick(); }}>View Event <span>→</span></button>
      </div>
    </motion.article>
  );
}

export default function EventsPage() {
  const [allEvents, setAllEvents]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filter, setFilter]               = useState('upcoming');
  const [area, setArea]                   = useState('All');
  const [sector, setSector]               = useState('All');
  const [eventType, setEventType]         = useState('All');
  const [dateSort, setDateSort]           = useState('asc');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxSrc, setLightboxSrc]     = useState(null);
  const [hoveredId, setHoveredId]         = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');

      if (typeParam) {
        const normalizedType = typeParam.charAt(0).toUpperCase() + typeParam.slice(1).toLowerCase();
        if (EVENT_TYPES.includes(normalizedType)) {
          setEventType(normalizedType);
          document.getElementById('events-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, []);

    useEffect(() => {
      // 1. Parse the URL to look for the 'open' parameter
      const params = new URLSearchParams(window.location.search);
      const eventIdToOpen = params.get('open');

      // 2. Only proceed if we have an ID and the events have finished loading
      if (eventIdToOpen && allEvents.length > 0) {
        // 3. Find the matching event in your local state
        const targetEvent = allEvents.find(ev => String(ev.id) === eventIdToOpen);

        if (targetEvent) {
          // 4. Trigger your existing modal logic
          setSelectedEvent(targetEvent);

          // 5. Clean up the URL so the modal doesn't re-open on refresh
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    }, [allEvents]);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('[Events] Supabase fetch error:', error.message);
          setLoading(false);
          return;
        }
        if (data) {
          const mapped = data.map(e => {
            let parsedStats = null;
            if (e.stats && typeof e.stats === 'string') {
              try {
                const parsed = JSON.parse(e.stats);
                if (Object.keys(parsed).length > 0) parsedStats = parsed;
              } catch (err) {
                console.error("Error parsing stats JSON", err);
              }
            } else if (e.stats && typeof e.stats === 'object') {
              parsedStats = e.stats;
            }

            return {
              ...e,
              type:     isUpcoming(e.date) ? 'upcoming' : 'past',
              name:     e.title || '',
              details:  e.description || '',
              results:  parsedStats, //
              photos:   Array.isArray(e.gallery_urls) ? e.gallery_urls : [],
              location: (e.venue_location || e.venue_name || '').trim(),
              area:     (e.region || '').trim(),
              orgType:  (e.org_type || '').trim(),
              sector:   parseSector(e.sector),
            };
          });
          setAllEvents(mapped);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedEvent || lightboxSrc) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent, lightboxSrc]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') { lightboxSrc ? setLightboxSrc(null) : setSelectedEvent(null); } };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightboxSrc]);

  const switchTab = (tab) => {
    setFilter(tab);
    setArea('All');
    setSector('All');
    setEventType('All');
    setDateSort(tab === 'upcoming' ? 'asc' : 'desc');
  };

  const visible = allEvents
    .filter(e =>
      e.type === filter &&
      (area === 'All' || e.area === area) &&
      (sector === 'All' || e.sector.includes(sector)) &&
      (eventType === 'All' || e.orgType.toLowerCase() === eventType.toLowerCase())
    )
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      if (filter === 'upcoming') {
        return dateSort === 'asc' ? da - db : db - da;
      }
      return dateSort === 'desc' ? db - da : da - db;
    });

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  };

  const currentSorts = DATE_SORTS[filter];
  const activeSortLabel = currentSorts.find(d => d.value === dateSort)?.label || '';

  return (
    <>
      <style>{CSS}</style>

      <section className="ep-hero" ref={heroRef}>
        <motion.div className="ep-hero-bg" style={{ y: heroY }} />
        <div className="ep-hero-noise" />
        <motion.div className="ep-hero-content" style={{ opacity: heroOpacity }}>
          <motion.p className="ep-hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Wink B2B Agency — Global Presence
          </motion.p>
          <motion.h1 className="ep-hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="ep-hero-accent">Events</span>
          </motion.h1>
          <motion.p className="ep-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}>
            Explore upcoming initiatives and past projects<br />delivered across industries and markets.
          </motion.p>
          <motion.div className="ep-hero-stats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            <div className="ep-hero-stat">
              <span className="ep-hero-stat-val">+30k</span>
              <span className="ep-hero-stat-lbl">B2B Meetings</span>
            </div>
            <div className="ep-hero-stat-div" />
            <div className="ep-hero-stat">
              <span className="ep-hero-stat-val">+6k</span>
              <span className="ep-hero-stat-lbl">Buyers Reached</span>
            </div>
            <div className="ep-hero-stat-div" />
            <div className="ep-hero-stat">
              <span className="ep-hero-stat-val">+100</span>
              <span className="ep-hero-stat-lbl">Events Completed</span>
            </div>
            <div className="ep-hero-stat-div" />
            <div className="ep-hero-stat">
              <span className="ep-hero-stat-val">+30</span>
              <span className="ep-hero-stat-lbl">Countries</span>
            </div>
          </motion.div>
        </motion.div>
        <div className="ep-hero-scroll-hint">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.div>
        </div>
      </section>

      <main className="ep-main">
        <Ticker />

        <div className="ep-filter-shell" id="events-anchor">
          <div className="ep-filter-top">
            <div className="ep-filter-tabs">
              <button className={`ep-filter-tab ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => switchTab('upcoming')}>
                <span className="ep-filter-tab-dot upcoming" />
                Upcoming
              </button>
              <button className={`ep-filter-tab ${filter === 'past' ? 'active' : ''}`} onClick={() => switchTab('past')}>
                <span className="ep-filter-tab-dot past" />
                Past
              </button>
            </div>
            <div className="ep-filter-sort">
              <span className="ep-filter-sort-label">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
                Sort
              </span>
              {currentSorts.map(d => (
                <button key={d.value} className={`ep-sort-pill ${dateSort === d.value ? 'active' : ''}`} onClick={() => setDateSort(d.value)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ep-filter-section">
            <div className="ep-filter-section-label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Type
            </div>
            <div className="ep-filter-pills">
              {EVENT_TYPES.map(t => (
                <button key={t} className={`ep-filter-pill ${eventType === t ? 'active' : ''}`} onClick={() => setEventType(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="ep-filter-section">
            <div className="ep-filter-section-label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Region
            </div>
            <div className="ep-filter-pills">
              {AREAS.map(a => (
                <button key={a} className={`ep-filter-pill ${area === a ? 'active' : ''}`} onClick={() => setArea(a)}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="ep-filter-section">
            <div className="ep-filter-section-label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              Sector
            </div>
            <div className="ep-filter-pills">
              {ALL_SECTORS.map(s => (
                <button key={s} className={`ep-filter-pill ${sector === s ? 'active' : ''}`} onClick={() => setSector(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="ep-filter-status">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${filter}-${area}-${sector}-${eventType}-${dateSort}`}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? 'Loading…' : `${visible.length} event${visible.length !== 1 ? 's' : ''}`}
                {area !== 'All' && <span className="ep-filter-status-chip">{area}</span>}
                {sector !== 'All' && <span className="ep-filter-status-chip">{sector}</span>}
                {eventType !== 'All' && <span className="ep-filter-status-chip">{eventType}</span>}
                <span className="ep-filter-status-sort">· {activeSortLabel}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <motion.div layout className="ep-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((event, i) =>
              event.type === 'upcoming' ? (
                <UpcomingCard key={`upcoming-${event.id}`} event={event} index={i} onClick={() => setSelectedEvent(event)} />
              ) : (
                <motion.article
                  key={`past-${event.id}`}
                  className={`ep-card ${hoveredId === event.id ? 'hovered' : ''}`}
                  variants={cardVariants} initial="hidden" animate="show" exit="exit" custom={i} layout
                  onHoverStart={() => setHoveredId(event.id)} onHoverEnd={() => setHoveredId(null)}
                >
                  <div className="ep-card-top-tags">
                    <div className="ep-card-sector">
                      {Array.isArray(event.sector) ? event.sector.join(' · ') : event.sector}
                    </div>
                    {event.area && <div className="ep-card-area-tag">{event.area}</div>}
                  </div>
                  <h3 className="ep-card-name">{event.name}</h3>
                  <div className="ep-card-meta">
                    {event.location && (
                      <span className="ep-card-meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {event.location}
                      </span>
                    )}
                    {event.date && (
                      <span className="ep-card-meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {event.date}
                      </span>
                    )}
                    {event.details && (
                      <span className="ep-card-meta-item ep-card-desc-preview">{event.details.slice(0, 90)}…</span>
                    )}
                  </div>
                  {event.results && (
                    <div className="ep-card-results">
                      <div className="ep-card-result"><span>{event.results.meetings}</span><small>meetings</small></div>
                      <div className="ep-card-result-div" />
                      <div className="ep-card-result"><span>{event.results.buyers}</span><small>buyers</small></div>
                    </div>
                  )}
                  <button className="ep-card-cta" onClick={() => setSelectedEvent(event)}>
                    View Event
                    <motion.span animate={{ x: hoveredId === event.id ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
                  </button>
                  <div className="ep-card-glow" />
                </motion.article>
              )
            )}
          </AnimatePresence>
        </motion.div>

        {!loading && visible.length === 0 && (
          <motion.div className="ep-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>No events found for this filter.</p>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onViewUpcoming={() => { setSelectedEvent(null); switchTab('upcoming'); }}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      </AnimatePresence>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

  body { background-color: var(--color-two); color: var(--color-third); }

  .ep-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--color-two);
  }

  .ep-hero-bg {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 70% 60% at 30% 40%, rgba(var(--color-fifth-rgb),0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 75% 70%, rgba(0,63,92,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--color-two) 100%);
    will-change: transform;
  }

  .ep-hero-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  .ep-hero-content {
    position: relative;
    text-align: center;
    padding: 2rem;
    max-width: 860px;
  }

  .ep-hero-eyebrow {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-fifth);
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  .ep-hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(5rem, 10vw, 8rem);
    line-height: 1.0;
    color: var(--color-third);
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    overflow: visible;
  }

  .ep-hero-accent {
    font-style: italic;
    background: linear-gradient(135deg, var(--color-fifth), var(--color-fourth));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    padding-right: 0.25em;
    margin-right: -0.25em;
    overflow: visible;
  }

  .ep-hero-sub {
    font-size: 1.3rem;
    color: var(--color-third);
    opacity: 0.6;
    line-height: 1.7;
    margin-bottom: 3rem;
  }

  .ep-hero-stats {
    display: inline-flex;
    align-items: center;
    gap: 2.5rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 150px;
    padding: 1rem 3rem;
    backdrop-filter: blur(12px);
  }

  .ep-hero-stat-div { width: 1px; height: 36px; background: rgba(255,255,255,0.2); }

  .ep-hero-stat-val {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-fifth);
    line-height: 1;
  }

  .ep-hero-stat-lbl {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-third);
    opacity: 0.55;
    margin-top: 0.25rem;
    display: block;
  }

  .ep-hero-scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: var(--color-third);
    opacity: 0.4;
    letter-spacing: 0.1em;
  }

  .ep-ticker-wrap {
    overflow: hidden;
    border-top: 1px solid rgba(var(--color-fifth-rgb),0.2);
    border-bottom: 1px solid rgba(var(--color-fifth-rgb),0.2);
    padding: 0.7rem 0;
    margin-bottom: 4rem;
  }

  .ep-ticker-inner { display: flex; gap: 3rem; white-space: nowrap; }

  .ep-ticker-item {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-fifth);
    opacity: 0.7;
  }

  .ep-ticker-dot { color: var(--color-third); opacity: 0.3; margin: 0 0.5rem; }

  .ep-main { max-width: 1260px; margin: 0 auto; padding: 5rem 2rem 6rem; background: var(--color-two); }

  .ep-filter-shell {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(var(--color-fifth-rgb),0.1);
    border-radius: 18px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    margin-bottom: 2.5rem;
  }

  .ep-filter-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.8rem;
    flex-wrap: wrap;
    gap: 1rem;
    border-bottom: 1px solid rgba(var(--color-fifth-rgb),0.08);
  }

  .ep-filter-tabs {
    display: flex;
    gap: 0.25rem;
    background: rgba(var(--color-fifth-rgb),0.04);
    border: 1px solid rgba(var(--color-fifth-rgb),0.1);
    border-radius: 100px;
    padding: 4px;
  }

  .ep-filter-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--color-third);
    opacity: 0.45;
    padding: 0.55rem 1.5rem;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    transition: all 0.25s ease;
  }

  .ep-filter-tab.active {
    background: var(--color-fifth);
    color: var(--color-two);
    opacity: 1;
    box-shadow: 0 4px 16px rgba(var(--color-fifth-rgb),0.3);
  }

  .ep-filter-tab-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .ep-filter-tab-dot.upcoming { background: #4ade80; }
  .ep-filter-tab-dot.past { background: rgba(var(--color-fifth-rgb),0.5); }
  .ep-filter-tab.active .ep-filter-tab-dot { background: rgba(255,255,255,0.6); }

  .ep-filter-sort {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .ep-filter-sort-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--color-third);
    opacity: 0.35;
    margin-right: 0.2rem;
  }

  .ep-sort-pill {
    background: none;
    border: 1px solid rgba(var(--color-fifth-rgb),0.12);
    color: var(--color-third);
    opacity: 0.45;
    padding: 0.38rem 0.9rem;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.04em;
    transition: all 0.2s ease;
  }

  .ep-sort-pill.active {
    background: rgba(var(--color-fifth-rgb),0.1);
    border-color: var(--color-fifth);
    color: var(--color-fifth);
    opacity: 1;
  }

  .ep-sort-pill:hover:not(.active) { opacity: 0.8; border-color: rgba(var(--color-fifth-rgb),0.3); }

  .ep-filter-section {
    display: flex;
    align-items: flex-start;
    gap: 1.4rem;
    padding: 1rem 1.8rem;
    border-bottom: 1px solid rgba(var(--color-fifth-rgb),0.06);
  }

  .ep-filter-section:last-of-type { border-bottom: none; }

  .ep-filter-section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.58rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--color-third);
    opacity: 0.35;
    white-space: nowrap;
    padding-top: 0.3rem;
    min-width: 56px;
    flex-shrink: 0;
  }

  .ep-filter-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .ep-filter-pill {
    background: none;
    border: 1px solid rgba(var(--color-fifth-rgb),0.1);
    color: var(--color-third);
    opacity: 0.5;
    padding: 0.3rem 0.85rem;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    transition: all 0.18s ease;
    white-space: nowrap;
  }

  .ep-filter-pill:hover {
    opacity: 0.85;
    border-color: rgba(var(--color-fifth-rgb),0.3);
    color: var(--color-fifth);
    background: rgba(var(--color-fifth-rgb),0.04);
  }

  .ep-filter-pill.active {
    background: rgba(var(--color-fifth-rgb),0.1);
    border-color: var(--color-fifth);
    color: var(--color-fifth);
    opacity: 1;
  }

  .ep-filter-status {
    padding: 0.75rem 1.8rem;
    border-top: 1px solid rgba(var(--color-fifth-rgb),0.08);
    font-size: 0.7rem;
    color: var(--color-third);
    opacity: 0.45;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    letter-spacing: 0.04em;
  }

  .ep-filter-status-chip {
    background: rgba(var(--color-fifth-rgb),0.08);
    border: 1px solid rgba(var(--color-fifth-rgb),0.15);
    color: var(--color-fifth);
    opacity: 1;
    padding: 0.15rem 0.6rem;
    border-radius: 100px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .ep-filter-status-sort { margin-left: auto; opacity: 0.6; }

  .ep-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.5rem;
  }

  .ep-uc {
    cursor: pointer;
    border-radius: var(--border-radius);
    overflow: hidden;
    background: var(--color-two);
    filter: brightness(1.08);
    border: 1px solid rgba(var(--color-fifth-rgb),0.12);
    display: flex;
    flex-direction: column;
    transition: border-color 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
  }

  .ep-uc:hover {
    border-color: var(--color-fifth);
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(var(--color-fifth-rgb),0.15);
    filter: brightness(1.12);
  }

  .ep-uc-img {
    position: relative; width: 100%; height: 220px;
    background-size: cover; background-position: center 20%;
    flex-shrink: 0; overflow: hidden;
    background-color: rgba(var(--color-fifth-rgb),0.05);
  }

  .ep-uc-gradient {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%);
    z-index: 1; pointer-events: none;
  }

  .ep-uc-teal {
    position: absolute; inset: 0;
    background: rgba(var(--color-fifth-rgb),0.22);
    z-index: 2; pointer-events: none; transition: opacity 0.35s ease;
  }

  .ep-uc-org-tag {
    position: absolute; top: 12px; right: 12px; z-index: 3;
    font-size: 0.5rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
    color: white; background: rgba(var(--color-fifth-rgb),0.35);
    border: 1px solid rgba(var(--color-fifth-rgb),0.55);
    padding: 3px 9px; border-radius: 100px; backdrop-filter: blur(6px);
    font-family: 'DM Sans', sans-serif;
  }

  .ep-uc-city-wrap {
    position: absolute; bottom: 14px; left: 14px; z-index: 3;
    display: flex; flex-direction: column; gap: 0.2rem;
  }

  .ep-uc-area-badge {
    font-size: 0.5rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--color-fifth); background: rgba(0,0,0,0.45);
    border: 1px solid rgba(var(--color-fifth-rgb),0.35);
    padding: 2px 7px; border-radius: 100px; backdrop-filter: blur(4px);
    align-self: flex-start; font-family: 'DM Sans', sans-serif;
  }

  .ep-uc-city {
    color: white; font-size: 1.6rem; font-weight: 900; text-transform: uppercase;
    letter-spacing: -0.03em; text-shadow: 0 2px 12px rgba(0,0,0,0.6);
    line-height: 1; font-family: 'DM Sans', sans-serif;
  }

  .ep-uc-body { padding: 1.2rem 1.4rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }

  .ep-uc-sector {
    font-size: 0.58rem; font-weight: 800; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--color-fifth); opacity: 0.8;
  }

  .ep-uc-name {
    font-family: 'DM Serif Display', serif; font-size: 1.15rem;
    color: var(--color-third); line-height: 1.25; letter-spacing: -0.01em;
    margin: 0; transition: color 0.25s ease;
  }

  .ep-uc-meta { display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.1rem; }

  .ep-uc-meta span {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.75rem; color: var(--color-third); opacity: 0.55; font-weight: 500;
  }

  .ep-uc-meta svg { color: var(--color-fifth); opacity: 0.8; flex-shrink: 0; }

  .ep-uc-cta {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: none; border: 1px solid rgba(var(--color-fifth-rgb),0.12);
    color: var(--color-third); opacity: 0.6; padding: 0.5rem 1rem;
    border-radius: var(--border-radius); font-size: 0.75rem; font-weight: 700;
    font-family: 'DM Sans', sans-serif; cursor: pointer; align-self: flex-start;
    margin-top: 0.4rem; transition: all 0.25s ease;
  }

  .ep-uc:hover .ep-uc-cta {
    border-color: var(--color-fifth); color: var(--color-fifth); opacity: 1;
    background: rgba(var(--color-fifth-rgb),0.06);
  }

  .ep-card {
    position: relative; background: var(--color-two); filter: brightness(1.08);
    border: 1px solid rgba(var(--color-fifth-rgb),0.12); border-radius: var(--border-radius);
    padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem;
    overflow: hidden; cursor: pointer;
    transition: border-color 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
  }

  .ep-card:hover, .ep-card.hovered {
    border-color: var(--color-fifth); transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(var(--color-fifth-rgb),0.15);
    filter: brightness(1.12);
  }

  .ep-card-glow {
    position: absolute; top: 0; left: 0; right: 0; height: 200px;
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(var(--color-fifth-rgb),0.07), transparent);
    pointer-events: none; opacity: 0; transition: opacity 0.25s ease;
  }

  .ep-card:hover .ep-card-glow { opacity: 1; }

  .ep-card-top-tags { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

  .ep-card-sector {
    font-size: 0.6rem; font-weight: 800; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--color-fifth); opacity: 0.8;
  }

  .ep-card-area-tag {
    font-size: 0.55rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--color-third); opacity: 0.45;
    background: rgba(209,219,220,0.06); border: 1px solid rgba(209,219,220,0.12);
    padding: 2px 7px; border-radius: 100px;
  }

  .ep-card-name {
    font-family: 'DM Serif Display', serif; font-size: 1.35rem;
    color: var(--color-third); line-height: 1.2; letter-spacing: -0.01em;
    transition: color 0.25s ease;
  }

  .ep-card-meta { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }

  .ep-card-meta-item {
    display: flex; align-items: flex-start; gap: 0.45rem;
    font-size: 0.78rem; color: var(--color-third); opacity: 0.55; font-weight: 500;
  }

  .ep-card-desc-preview { font-style: italic; opacity: 0.4; margin-top: 0.25rem; line-height: 1.5; }
  .ep-card-meta-item svg { flex-shrink: 0; margin-top: 2px; color: var(--color-fifth); opacity: 0.7; }

  .ep-card-results {
    display: flex; align-items: center; gap: 1rem;
    background: rgba(var(--color-fifth-rgb),0.05);
    border: 1px solid rgba(var(--color-fifth-rgb),0.1);
    border-radius: var(--border-radius); padding: 0.6rem 1rem; margin-top: 0.25rem;
  }

  .ep-card-result { display: flex; flex-direction: column; line-height: 1.2; }
  .ep-card-result span { font-size: 1.1rem; font-weight: 800; color: var(--color-fourth); }
  .ep-card-result small { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-third); opacity: 0.5; }
  .ep-card-result-div { width: 1px; height: 28px; background: rgba(var(--color-fifth-rgb),0.12); }

  .ep-card-cta {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: none; border: 1px solid rgba(var(--color-fifth-rgb),0.12);
    color: var(--color-third); opacity: 0.6; padding: 0.5rem 1rem;
    border-radius: var(--border-radius); font-size: 0.75rem; font-weight: 700;
    font-family: 'DM Sans', sans-serif; cursor: pointer; align-self: flex-start;
    margin-top: 0.25rem; transition: all 0.25s ease;
  }

  .ep-card:hover .ep-card-cta {
    border-color: var(--color-fifth); color: var(--color-fifth); opacity: 1;
    background: rgba(var(--color-fifth-rgb),0.06);
  }

  .ep-empty {
    text-align: center; padding: 5rem 2rem;
    color: var(--color-third); opacity: 0.4; font-size: 0.9rem; letter-spacing: 0.05em;
  }

  .ep-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.65);
    backdrop-filter: blur(14px); z-index: 1100;
    display: flex; align-items: center; justify-content: center; padding: 1.5rem;
  }

  .ep-modal {
    position: relative; background: var(--color-two); filter: brightness(1.1);
    border: 1px solid rgba(var(--color-fifth-rgb),0.12); border-radius: 12px;
    padding: 2.8rem; width: min(680px, 94vw); max-height: 88vh; overflow-y: auto;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5); scrollbar-width: none;
  }

  .ep-modal::-webkit-scrollbar { display: none; }

  .ep-modal-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--color-fifth), var(--color-fourth));
    border-radius: 12px 12px 0 0;
  }

  .ep-modal-close {
    position: absolute; top: 1.4rem; right: 1.4rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%; width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--color-third); opacity: 0.6; transition: opacity 0.2s;
  }

  .ep-modal-close:hover { opacity: 1; }

  .ep-modal-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--color-third); opacity: 0.45;
    border: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0.7rem;
    border-radius: 100px; margin-bottom: 1.2rem;
  }

  .ep-modal-tag-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .ep-modal-tag-dot.upcoming { background: var(--color-fifth); }
  .ep-modal-tag-dot.past { background: var(--color-fourth); }

  .ep-modal-title {
    font-family: 'DM Serif Display', serif; font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 400; color: var(--color-third); margin: 0 0 1.2rem;
    line-height: 1.2; letter-spacing: -0.01em;
  }

  .ep-modal-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.4rem; }

  .ep-modal-meta span {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.82rem; font-weight: 600; color: var(--color-third); opacity: 0.6;
  }

  .ep-modal-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    margin-bottom: 1.4rem;
  }

  .ep-modal-desc { font-size: 0.9rem; color: var(--color-third); opacity: 0.65; line-height: 1.8; margin: 0 0 1.5rem; }

  .ep-modal-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;
    padding: 1rem; background: rgba(255,255,255,0.03);
    border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
  }

  .ep-modal-stat { text-align: center; display: flex; flex-direction: column; }
  .ep-modal-stat span { font-size: 1.8rem; font-weight: 800; color: var(--color-third); }
  .ep-modal-stat small { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; color: var(--color-third); }

  .ep-modal-gallery { margin-bottom: 1.5rem; }

  .ep-modal-gallery-label {
    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--color-third); margin-bottom: 0.75rem; opacity: 0.8;
    display: flex; align-items: center; gap: 0.5rem;
  }

  .ep-modal-gallery-label span { opacity: 0.4; text-transform: none; letter-spacing: 0; }

  .ep-modal-photos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }

  .ep-modal-photo {
    aspect-ratio: 4/3; border-radius: 6px; overflow: hidden;
    border: none; padding: 0; cursor: zoom-in; position: relative; display: block;
  }

  .ep-modal-photo img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: opacity 0.2s, transform 0.3s; }
  .ep-modal-photo:hover img { opacity: 1; transform: scale(1.05); }

  .ep-photo-zoom {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; color: white; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.2s;
  }

  .ep-modal-photo:hover .ep-photo-zoom { opacity: 1; }

  .ep-modal-footer {
    display: flex; align-items: center; gap: 1rem;
    padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06);
  }

  .ep-modal-cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--color-fifth); color: var(--color-two); border: none;
    padding: 0.75rem 1.6rem; font-size: 0.7rem; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.16em;
    border-radius: 100px; cursor: pointer; transition: all 0.25s;
  }

  .ep-modal-cta:hover { background: var(--color-fourth); transform: translateY(-1px); }

  .ep-modal-dismiss {
    background: none; border: none; color: var(--color-third);
    font-size: 0.82rem; font-weight: 600; cursor: pointer; opacity: 0.45; transition: opacity 0.2s;
  }

  .ep-modal-dismiss:hover { opacity: 0.8; }

  .ep-lightbox {
    position: fixed; inset: 0; z-index: 1300; background: rgba(0,0,0,0.92);
    display: flex; align-items: center; justify-content: center; padding: 1rem; cursor: zoom-out;
  }

  .ep-lightbox-img {
    max-width: 100%; max-height: 90vh; border-radius: 8px;
    object-fit: contain; cursor: default; box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  }

  .ep-lightbox-close {
    position: absolute; top: 1.2rem; right: 1.2rem;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: white; font-size: 1rem; transition: background 0.2s;
  }

  .ep-lightbox-close:hover { background: rgba(255,255,255,0.2); }

  @media (max-width: 768px) {
    .ep-filter-top { flex-direction: column; align-items: flex-start; }
    .ep-filter-section { flex-direction: column; gap: 0.75rem; }
    .ep-filter-section-label { min-width: unset; }
    .ep-grid { grid-template-columns: 1fr; }
    .ep-modal { padding: 2rem 1.25rem 1.5rem; }
    .ep-modal-photos { grid-template-columns: repeat(2, 1fr); }
    .ep-hero-stats { flex-direction: column; gap: 1rem; border-radius: 16px; }
    .ep-hero-stat-div { width: 40px; height: 1px; }
  }
`;