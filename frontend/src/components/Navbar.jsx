import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import logoImg from "../assets/SDR Mart logo.png";

export default function Navbar() {
  const [active, setActive] = useState("Home");

  const links = [
    "Home",
    "Featured Category",
    "Perfumes",
    "Mobile Accessories",
    "Fancy Items",
    "Contact",
  ];

  return (
    <header className="navbar">
      {/* ── Top Bar ── */}
      <div className="navbar-top">
        {/* SDR Mart Logo */}
        <Link to="/" className="nav-brand-logo-link" aria-label="SDR Mart Home">
          <div className="nav-logo-badge">
            <img src={logoImg} alt="SDR Mart Logo" className="nav-logo-img" />
          </div>
        </Link>

        {/* Search */}
        <form
          className="nav-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search"
            aria-label="Search products"
          />
          <button
            className="nav-search-btn"
            aria-label="Submit search"
            type="submit"
          >
            <Search size={16} color="#fff" />
          </button>
        </form>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Account — links to /login */}
          <Link to="/login" className="nav-action-btn">
            <User size={20} />
            <span>Account</span>
          </Link>

          {/* Cart */}
          <button className="nav-action-btn" aria-label="View cart, 0 items">
            <div className="cart-badge-wrap">
              <ShoppingCart size={20} />
              <span className="cart-badge" aria-hidden="true">
                0
              </span>
            </div>
            <span>Cart</span>
          </button>
        </div>
      </div>

      {/* ── Secondary Nav ── */}
      <nav className="navbar-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className={active === link ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActive(link);
            }}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
