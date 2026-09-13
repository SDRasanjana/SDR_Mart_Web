import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import logoImg from "../assets/SDR Mart logo.png";

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("sdr_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
  }, []);

  const getFirstName = (fullName) => {
    if (!fullName) return "Account";
    return fullName.trim().split(" ")[0];
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("sdr_user");
      window.location.reload();
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Perfumes", path: "/perfumes" },
    { name: "Mobile Accessories", path: "/mobile-accessories" },
    { name: "Fancy Items", path: "/#categories" },
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
            placeholder="Search SDR MART products..."
            aria-label="Search SDR MART products"
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
          {/* Account — shows first name if logged in, otherwise links to /login */}
          {user ? (
            <div className="nav-action-btn" style={{ cursor: "pointer" }} onClick={handleLogout} title="Click to logout">
              <User size={20} />
              <span>{getFirstName(user.name)}</span>
            </div>
          ) : (
            <Link to="/login" className="nav-action-btn">
              <User size={20} />
              <span>Account</span>
            </Link>
          )}

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
        {navLinks.map((link) => {
          const isActive =
            link.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(link.path);

          return (
            <Link
              key={link.name}
              to={link.path}
              className={isActive ? "active" : ""}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
