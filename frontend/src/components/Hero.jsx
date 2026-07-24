import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 0,
    title: 'Explore Our Curated Collections!',
    subtitle: 'Perfumes, Tech, Decor & More',
    buttonText: 'Shop',
    image: '/images/hero_perfumes.jpg',
    alt: 'Curated Luxury Perfumes',
  },
  {
    id: 1,
    title: 'Discover Smart Tech & Accessories!',
    subtitle: 'Mobiles, Earbuds, Chargers & More',
    buttonText: 'Shop Tech',
    image: '/images/cat_mobile.jpg',
    alt: 'Mobile & Tech Accessories',
  },
  {
    id: 2,
    title: 'Elevate Your Home & Living Space!',
    subtitle: 'Wall Art, Vases, Accents & Decor',
    buttonText: 'Shop Decor',
    image: '/images/cat_wallart.jpg',
    alt: 'Fancy Items and Wall Art',
  },
];

const AUTO_SLIDE_INTERVAL = 3500; // 3.5 seconds per slide

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Helper function to reset auto-slide timer when user manually interacts
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, AUTO_SLIDE_INTERVAL);
    }
  };

  // Start auto-slide on mount and handles hover state
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, AUTO_SLIDE_INTERVAL);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleDotClick = (index) => {
    setActiveSlide(index);
    resetTimer();
  };

  const current = slides[activeSlide];

  return (
    <section
      className="hero-slider-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured Collections Carousel"
    >
      {/* ── Slide Background Image Layer (Right Side) ── */}
      <div className="hero-slide-bg-container">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide-bg ${idx === activeSlide ? 'active' : ''}`}
            aria-hidden={idx !== activeSlide}
          >
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>

      {/* ── Sweeping Golden Arc SVG Divider ── */}
      <div className="hero-curve-divider">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="hero-curve-svg"
        >
          {/* Navy Background Overlay */}
          <path
            d="M 0,0 L 700,0 C 830,140 780,300 620,400 L 0,400 Z"
            fill="#0D2235"
          />
          {/* Gold Curved Border Line */}
          <path
            d="M 700,0 C 830,140 780,300 620,400"
            fill="none"
            stroke="#C5A059"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Left Content Overlay ── */}
      <div className="hero-content-container">
        <div
          className="hero-text-content"
          key={current.id}
        >
          <h1 className="hero-title serif">{current.title}</h1>
          <p className="hero-subtitle">{current.subtitle}</p>
          <button className="hero-shop-btn">{current.buttonText}</button>
        </div>

        {/* ── Carousel Dots (Positioned under text inside navy section) ── */}
        <div className="hero-dots-wrap" aria-label="Banner slides navigation">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`hero-dot-btn ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
