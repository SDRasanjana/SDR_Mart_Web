import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 0,
    titlePrefix: 'Shop Smarter. ',
    titleHighlight: 'Shop with SDR MART.',
    subtitle: 'Discover Premium Perfumes, Tech Accessories & Lifestyle Decor',
    primaryBtn: 'Shop Collection',
    secondaryBtn: 'Buy Now',
    image: '/images/hero_perfumes.jpg',
    alt: 'Curated Luxury Perfumes',
  },
  {
    id: 1,
    titlePrefix: 'Smart Tech & Gadgets. ',
    titleHighlight: 'Only at SDR MART.',
    subtitle: 'Mobiles, Earbuds, Fast Chargers & Tech Essentials',
    primaryBtn: 'Explore Tech',
    secondaryBtn: 'Buy Now',
    image: '/images/cat_mobile.jpg',
    alt: 'Mobile & Tech Accessories',
  },
  {
    id: 2,
    titlePrefix: 'Elevate Your Home. ',
    titleHighlight: 'Styled by SDR MART.',
    subtitle: 'Wall Art, Luxury Vases, Accents & Living Decor',
    primaryBtn: 'Shop Decor',
    secondaryBtn: 'Buy Now',
    image: '/images/cat_wallart.jpg',
    alt: 'Fancy Items and Wall Art',
  },
];

const AUTO_SLIDE_INTERVAL = 3500; // 3.5 seconds per slide

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

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

      {/* ── Sweeping Light Blue & Magenta Arc SVG Divider ── */}
      <div className="hero-curve-divider">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="hero-curve-svg"
        >
          {/* Light Blue background section overlay */}
          <path
            d="M 0,0 L 680,0 C 810,140 760,300 600,400 L 0,400 Z"
            fill="#F5F7FF"
          />
          {/* Magenta Accent Curve Stroke */}
          <path
            d="M 680,0 C 810,140 760,300 600,400"
            fill="none"
            stroke="#E6007E"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Left Content Overlay ── */}
      <div className="hero-content-container">
        <div className="hero-text-content" key={current.id}>
          <h1 className="hero-title serif">
            {current.titlePrefix}
            <br />
            <span className="text-pink">{current.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle">{current.subtitle}</p>
          
          {/* Action Buttons: Navy Primary + Pink Secondary */}
          <div className="hero-actions-wrap">
            <button className="btn-primary-navy">{current.primaryBtn}</button>
            <button className="btn-secondary-pink">{current.secondaryBtn}</button>
          </div>
        </div>

        {/* ── Carousel Dots ── */}
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
