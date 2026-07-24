import React from 'react';
import {
  Headphones,
  Truck,
  Zap,
  Store,
  UserCheck,
  FileText,
  PackageSearch
} from 'lucide-react';
import logoImg from '../assets/SDR Mart logo.png';

/* Inline Social Brand SVG Icons */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const XTwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* ── Top Golden Service Banner ── */}
      <div className="footer-service-bar">
        <div className="footer-service-content max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="service-item">
            <Headphones className="service-icon" />
            <span className="service-text">Customer Support</span>
          </div>

          {/* Feature 2 */}
          <div className="service-item">
            <Truck className="service-icon" />
            <span className="service-text">Island-wide Delivery</span>
          </div>

          {/* Feature 3 */}
          <div className="service-item">
            <Zap className="service-icon" />
            <span className="service-text">Express Delivery</span>
          </div>
        </div>
      </div>

      {/* ── Main Dark Navy Footer Section ── */}
      <div className="footer-main-body">
        <div className="footer-main-grid max-w-7xl mx-auto">
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-col-brand">
            {/* SDR Mart Logo */}
            <div className="footer-logo-badge">
              <img src={logoImg} alt="SDR Mart Logo" className="footer-logo-img" />
            </div>

            <div className="footer-address">
              <p>No 69B, Galle Road,</p>
              <p>Colombo 03, Sri Lanka.</p>
            </div>

            <div className="footer-hotline-wrap">
              <span className="hotline-label">HOTLINE</span>
              <a href="tel:+94112252888" className="hotline-number">
                +94 112 252 888
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="footer-social-icons">
              <a href="#" aria-label="Facebook" className="social-icon-link">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X Twitter" className="social-icon-link">
                <XTwitterIcon />
              </a>
              <a href="#" aria-label="Instagram" className="social-icon-link">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon-link">
                <LinkedinIcon />
              </a>
              <a href="#" aria-label="YouTube" className="social-icon-link">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Outline Pill Action Buttons */}
          <div className="footer-col-buttons">
            <a href="#" className="footer-action-btn">
              <Store size={18} className="btn-icon" />
              <span>Showroom Locator</span>
            </a>

            <a href="#" className="footer-action-btn">
              <UserCheck size={18} className="btn-icon" />
              <span>Showroom Login</span>
            </a>

            <a href="#" className="footer-action-btn">
              <FileText size={18} className="btn-icon" />
              <span>Service Center Location</span>
            </a>

            <a href="#" className="footer-action-btn">
              <PackageSearch size={18} className="btn-icon" />
              <span>Track Your Order</span>
            </a>
          </div>

          {/* Column 3: About */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">About</h3>
            <ul className="footer-link-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Executive Team</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Help</h3>
            <ul className="footer-link-list">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">How to Buy</a></li>
              <li><a href="#">Shipping &amp; Delivery</a></li>
              <li><a href="#">Honor &amp; Trust</a></li>
              <li><a href="#">Return Products</a></li>
            </ul>
          </div>

          {/* Column 5: Policies */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Policies</h3>
            <ul className="footer-link-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Divider & Copyright ── */}
        <div className="footer-bottom-bar max-w-7xl mx-auto">
          <p className="copyright-text">
            Copyright &copy; 2026 SDR Mart. All Rights Reserved.
          </p>
          <div className="popular-links">
            <a href="#">Popular Links</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
