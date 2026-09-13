import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginModel from "../assets/login_page.png";
import "../css/login.css";

/* ── SVG Icon helpers ── */
const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const UserSilhouette = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="30" rx="18" ry="20" fill="rgba(255,255,255,0.35)" />
    <path
      d="M6 98c0-22 14-36 34-36s34 14 34 36"
      fill="rgba(255,255,255,0.35)"
    />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="#fff">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="#fff">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "At least 6 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setLoading(true);
    // Call backend API
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      setLoading(false);
      
      if (!response.ok) {
        setErrors({ email: data.message || "Login failed" });
        return;
      }
      
      // Store user session in localStorage
      localStorage.setItem("sdr_user", JSON.stringify({ name: data.user.name, email: data.user.email }));
      
      // Redirect back to the page that triggered the login (e.g. product page)
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get("redirect") || "/";
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrors({ email: "Server error. Please try again later." });
    }
  };

  return (
    <main className="login-page" aria-label="Sign In page">
      <div className="login-card" role="dialog" aria-labelledby="login-title">
        {/* ════════════════════════════════
            LEFT — Navy panel with arch
            ════════════════════════════════ */}
        <div className="login-left" aria-hidden="true">
          {/* Corner sparkle decorators */}
          <span className="login-sparkle-tr">✦</span>
          <span className="login-sparkle-bl">✦</span>

          {/* Arch frame */}
          <div className="login-arch">
            <img src={loginModel} alt="SDR MART model" />
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT — Soft light panel + white form
            ════════════════════════════════ */}
        <div className="login-right">
          <div className="login-form-card">
            {/* Heading */}
            <h1 id="login-title">Sign In</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="login-field">
                <label htmlFor="login-email">Email</label>
                <div className="login-input-wrap">
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p id="email-err" className="login-field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <input
                    id="login-password"
                    type={showPwd ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: "" }));
                    }}
                    aria-describedby={errors.password ? "pwd-err" : undefined}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p id="pwd-err" className="login-field-error" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            {/* No account link */}
            <p className="login-no-account">
              Don't have an account?{" "}
              <Link to="/register">Sign Up</Link>
            </p>

            {/* OR Divider */}
            <div className="login-divider" aria-hidden="true">
              <span className="login-divider-line" />
              <span>or</span>
              <span className="login-divider-line" />
            </div>

            {/* Social Logins */}
            <div
              className="login-socials"
              role="group"
              aria-label="Sign in with social media"
            >
              <button
                type="button"
                className="login-social-btn social-fb"
                aria-label="Sign in with Facebook"
              >
                <FacebookIcon />
              </button>
              <button
                type="button"
                className="login-social-btn social-tw"
                aria-label="Sign in with Twitter"
              >
                <TwitterIcon />
              </button>
              <button
                type="button"
                className="login-social-btn social-ig"
                aria-label="Sign in with Instagram"
              >
                <InstagramIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
