import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { perfumesData } from "../data/perfumesData";
import { mobileAccessoriesData } from "../data/mobileAccessoriesData";
import { ShoppingCart, Zap, ArrowLeft, Truck, Package, ChevronRight } from "lucide-react";
import "../css/product-detail.css";

/* ── Merge all product catalogs ── */
const allProducts = [...perfumesData, ...mobileAccessoriesData];

/* ── Price string → number ── */
const parsePrice = (str) => parseFloat((str || "0").replace(/[^0-9.]/g, "")) || 0;

/* ── Format number → "Rs. XX,XXX.00" ── */
const fmtPrice = (num) =>
  "Rs. " + num.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── Fallback image placeholder ── */
function ProductFallback({ title }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #F5F7FF 0%, #FFF0F7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "64px" }}>🛍️</span>
      <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 700, textAlign: "center", padding: "0 16px" }}>
        {title}
      </span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((p) => p.id === id);

  /* ── Qty on the product info left panel ── */
  const [qty, setQty] = useState(1);

  /* ── Cart qty (right panel) ── */
  const [cartQty, setCartQty] = useState(1);

  /* ── Delivery method ── */
  const [delivery, setDelivery] = useState("standard");
  const deliveryCharge = delivery === "standard" ? 350 : 0;

  /* ── Image gallery ── */
  const [activeThumb, setActiveThumb] = useState(0);
  const [imgError, setImgError] = useState(false);

  /* ── Auto-add to cart on mount (simulated) ── */
  useEffect(() => {
    if (!product) return;
    // In a real app you'd push to a cart context / Redux store.
    // Here we just set the cartQty state to 1 (already initialised).
  }, [product]);

  /* ── Guard: product not found ── */
  if (!product) {
    return (
      <div className="pd-page">
        <Navbar />
        <div className="pd-main">
          <div className="pd-not-found">
            <h2>Product Not Found</h2>
            <p>This product doesn't exist or may have been removed.</p>
            <button className="pd-btn-add-cart" onClick={() => navigate(-1)}>
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const unitPrice = parsePrice(product.price);
  const subtotal = unitPrice * cartQty;
  const orderTotal = subtotal + deliveryCharge;

  /* Thumbnail images — use the same image repeated as demo thumbnails */
  const thumbs = [product.image, product.image, product.image];

  return (
    <div className="pd-page">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={12} className="pd-bc-sep" />
        <Link to={product.category?.toLowerCase().includes("men") || product.category?.toLowerCase().includes("her") ? "/perfumes" : "/mobile-accessories"}>
          {perfumesData.find((p) => p.id === id) ? "Perfumes" : "Mobile Accessories"}
        </Link>
        <ChevronRight size={12} className="pd-bc-sep" />
        <span className="pd-bc-current">{product.title}</span>
      </nav>

      {/* ── Two-column layout ── */}
      <div className="pd-main">
        {/* ══════════════════════════════
            LEFT — Product Information
            ══════════════════════════════ */}
        <div className="pd-left">
          <div className="pd-product-card">

            {/* Gallery */}
            <div className="pd-gallery">
              <div className="pd-main-img-wrap">
                {imgError || !product.image ? (
                  <ProductFallback title={product.title} />
                ) : (
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Thumbnails */}
              <div className="pd-thumbnails">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${activeThumb === i ? "pd-thumb-active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    {imgError || !src ? (
                      <span style={{ fontSize: 24 }}>🛍️</span>
                    ) : (
                      <img src={src} alt={`${product.title} view ${i + 1}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <span className="pd-category-tag">{product.categoryTag}</span>
            <h1 className="pd-title">{product.title}</h1>

            {/* Badges */}
            {product.badge && (
              <div className="pd-badges">
                <span
                  className={`pd-badge ${
                    product.badgeType === "green"
                      ? "pd-badge-green"
                      : "pd-badge-pink"
                  }`}
                >
                  {product.badge}
                </span>
                {product.oldPrice && (
                  <span className="pd-badge pd-badge-red">
                    {Math.round(
                      ((parsePrice(product.oldPrice) - unitPrice) /
                        parsePrice(product.oldPrice)) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>
            )}

            {/* Pricing */}
            <div className="pd-pricing">
              <span className="pd-price-main">{product.price}</span>
              {product.oldPrice && (
                <span className="pd-price-old">{product.oldPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="pd-description">{product.description}</p>

            {/* Qty + Actions */}
            <div className="pd-actions-row">
              <div className="pd-qty-ctrl" aria-label="Quantity">
                <button
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="pd-qty-value">{qty}</span>
                <button
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="pd-btn-add-cart"
                aria-label="Add to cart"
                onClick={() => setCartQty((q) => q + qty)}
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>

              <button
                className="pd-btn-buy-now"
                aria-label="Buy now"
                onClick={() => {
                  setCartQty((q) => q + qty);
                  document
                    .querySelector(".pd-right")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Zap size={14} /> Buy Now
              </button>
            </div>

            {/* Delivery pills */}
            <div className="pd-delivery-pills">
              <span className="pd-delivery-pill">
                <Truck size={13} /> Free Returns
              </span>
              <span className="pd-delivery-pill">
                <Package size={13} /> Secure Packaging
              </span>
              <span className="pd-delivery-pill">
                <ShoppingCart size={13} /> Genuine Product
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Cart + Checkout
            ══════════════════════════════ */}
        <div className="pd-right">

          {/* ── Panel 1: Cart ── */}
          <div className="pd-panel">
            <div className="pd-panel-header">
              <div className="pd-panel-step">1</div>
              <span className="pd-panel-title">Cart</span>
            </div>

            {/* Cart item */}
            <div className="pd-cart-item">
              <div className="pd-cart-item-img">
                {imgError || !product.image ? (
                  <span style={{ fontSize: 24 }}>🛍️</span>
                ) : (
                  <img src={product.image} alt={product.title} />
                )}
              </div>
              <div className="pd-cart-item-body">
                <div className="pd-cart-item-name">{product.title}</div>
                <div className="pd-cart-item-unit">Unit Price: {product.price}</div>
                <div className="pd-cart-item-bottom">
                  {/* Cart qty controls */}
                  <div className="pd-cart-qty">
                    <button
                      className="pd-cart-qty-btn"
                      onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease cart quantity"
                    >
                      −
                    </button>
                    <span className="pd-cart-qty-val">{cartQty}</span>
                    <button
                      className="pd-cart-qty-btn"
                      onClick={() => setCartQty((q) => q + 1)}
                      aria-label="Increase cart quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="pd-cart-item-subtotal">{fmtPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <p className="pd-delivery-label">Select Delivery Method</p>
            <div>
              <label
                className={`pd-delivery-option ${delivery === "standard" ? "pd-delivery-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={delivery === "standard"}
                  onChange={() => setDelivery("standard")}
                />
                <div className="pd-delivery-option-info">
                  <div className="pd-delivery-option-name">Standard Delivery</div>
                  <div className="pd-delivery-option-sub">3 – 5 working days</div>
                </div>
                <span className="pd-delivery-option-price">{fmtPrice(deliveryCharge)}</span>
              </label>

              <label
                className={`pd-delivery-option ${delivery === "pickup" ? "pd-delivery-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={delivery === "pickup"}
                  onChange={() => setDelivery("pickup")}
                />
                <div className="pd-delivery-option-info">
                  <div className="pd-delivery-option-name">Store Pickup</div>
                  <div className="pd-delivery-option-sub">Available Today</div>
                </div>
                <span className="pd-delivery-option-price">Free</span>
              </label>
            </div>

            {/* Order summary */}
            <p className="pd-summary-label" style={{ marginTop: "16px" }}>Order Summary</p>
            <div className="pd-summary-row">
              <span>Subtotal</span>
              <span className="pd-summary-val">{fmtPrice(subtotal)}</span>
            </div>
            <div className="pd-summary-row">
              <span>Delivery Charges</span>
              <span className="pd-summary-val">{fmtPrice(deliveryCharge)}</span>
            </div>
            <div className="pd-summary-row pd-total-row">
              <span>Order Total</span>
              <span className="pd-summary-val">{fmtPrice(orderTotal)}</span>
            </div>

            {/* Continue shopping */}
            <Link to={perfumesData.find((p) => p.id === id) ? "/perfumes" : "/mobile-accessories"} className="pd-continue-btn">
              <ArrowLeft size={13} /> Continue Shopping
            </Link>
          </div>

          {/* ── Panel 2: Customer Details ── */}
          <div className="pd-panel pd-customer-panel">
            <div className="pd-panel-header">
              <div className="pd-panel-step">2</div>
              <span className="pd-panel-title">Customer Details</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Proceeding to payment details — connect your payment gateway here.");
              }}
              noValidate
            >
              <div className="pd-form-grid">
                <div className="pd-form-field">
                  <label htmlFor="pd-first-name">First Name *</label>
                  <input id="pd-first-name" type="text" placeholder="John" required />
                </div>
                <div className="pd-form-field">
                  <label htmlFor="pd-last-name">Last Name *</label>
                  <input id="pd-last-name" type="text" placeholder="Doe" required />
                </div>
                <div className="pd-form-field pd-form-full">
                  <label htmlFor="pd-email">Email Address *</label>
                  <input id="pd-email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="pd-form-field pd-form-full">
                  <label htmlFor="pd-address">Delivery Address *</label>
                  <input id="pd-address" type="text" placeholder="No. 12, Main Street, Colombo 03" required />
                </div>
                <div className="pd-form-field">
                  <label htmlFor="pd-phone">Phone Number *</label>
                  <input id="pd-phone" type="tel" placeholder="077XXXXXXX" required />
                </div>
                <div className="pd-form-field">
                  <label htmlFor="pd-phone2">Secondary Phone</label>
                  <input id="pd-phone2" type="tel" placeholder="Optional" />
                </div>
              </div>

              <button type="submit" className="pd-proceed-btn" aria-label="Proceed to payment">
                <Zap size={15} /> Proceed to Payment Details
              </button>
            </form>
          </div>

        </div>{/* end pd-right */}
      </div>{/* end pd-main */}

      <Footer />
    </div>
  );
}
