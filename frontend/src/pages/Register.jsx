import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Must be at least 6 characters.";
    if (confirmPassword !== password)
      e.confirmPassword = "Passwords do not match.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setLoading(true);
    
    // Simulate successful registration
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Account created successfully! Redirecting to sign in…");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1200);
  };

  return (
    <main className="login-page" aria-label="Sign Up page">
      <div className="login-card" role="dialog" aria-labelledby="register-title">
        {/* ════════════════════════════════
            LEFT — Navy panel with arch
            ════════════════════════════════ */}
        <div className="login-left" aria-hidden="true">
          <span className="login-sparkle-tr">✦</span>
          <span className="login-sparkle-bl">✦</span>

          <div className="login-arch">
            <img src={loginModel} alt="SDR MART model" />
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT — Form card
            ════════════════════════════════ */}
        <div className="login-right">
          <div className="login-form-card">
            {/* Heading */}
            <h1 id="register-title">Create Account</h1>

            {successMsg && (
              <div
                style={{
                  background: "#DCFCE7",
                  color: "#15803D",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="login-field">
                <label htmlFor="reg-name">Full Name</label>
                <div className="login-input-wrap">
                  <input
                    id="reg-name"
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((p) => ({ ...p, fullName: "" }));
                    }}
                    aria-invalid={!!errors.fullName}
                  />
                </div>
                {errors.fullName && (
                  <p className="login-field-error" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="login-field">
                <label htmlFor="reg-email">Email</label>
                <div className="login-input-wrap">
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="login-field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="login-field">
                <label htmlFor="reg-password">Password</label>
                <div className="login-input-wrap">
                  <input
                    id="reg-password"
                    type={showPwd ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: "" }));
                    }}
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
                  <p className="login-field-error" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="login-field">
                <label htmlFor="reg-confirm-pwd">Confirm Password</label>
                <div className="login-input-wrap">
                  <input
                    id="reg-confirm-pwd"
                    type={showConfirmPwd ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                    }}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowConfirmPwd((v) => !v)}
                    aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                  >
                    {showConfirmPwd ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="login-field-error" role="alert">
                    {errors.confirmPassword}
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
                {loading ? "Creating Account…" : "Create Account"}
              </button>
            </form>

            {/* Already have an account */}
            <p className="login-no-account">
              Already have an account?{" "}
              <Link to="/login">Sign In</Link>
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
              aria-label="Sign up with social media"
            >
              <button
                type="button"
                className="login-social-btn social-fb"
                aria-label="Sign up with Facebook"
              >
                <FacebookIcon />
              </button>
              <button
                type="button"
                className="login-social-btn social-tw"
                aria-label="Sign up with Twitter"
              >
                <TwitterIcon />
              </button>
              <button
                type="button"
                className="login-social-btn social-ig"
                aria-label="Sign up with Instagram"
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
