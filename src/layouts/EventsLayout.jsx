import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import EventsPage from '../components/EventPage.jsx';
import CallToAction from '../components/CallToAction.jsx';

export default function EventsLayout() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Header
        activeSection="events"
        scrollVelocity={0}
        scrollProgress={scrollYProgress}
        theme={theme}
        setTheme={setTheme}
      />
      <EventsPage />
      <CallToAction
        image="/events-bg.jpg"
        headline="Join Our Next Trade Mission"
        subheadline="Be part of a curated B2B experience."
        ctaLabel="Register Now"
        href="/Register"
      />
      <Footer />
    </>
  );
}