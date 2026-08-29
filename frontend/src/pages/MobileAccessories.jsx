import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobileAccessoriesData, mobileBrands, mobileCategories } from "../data/mobileAccessoriesData";
import { Search, Filter, ShoppingCart, Zap, Smartphone } from "lucide-react";

/* ── Icon-based fallback when product image is missing ── */
const MobileFallbackImage = ({ category }) => {
  const icons = {
    "Headphones & Earbuds": "🎧",
    "Power Banks": "🔋",
    "Chargers & Adapters": "🔌",
    "Memory Cards": "💾",
  };
  const emoji = icons[category] || "📱";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #F5F7FF 0%, #EEF0FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <span style={{ fontSize: "52px" }}>{emoji}</span>
      <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600 }}>
        SDR MART
      </span>
    </div>
  );
};

/* ── Individual Mobile Accessory Product Card ── */
function MobileCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="mobile-card">
      {/* Category Tag above title */}
      <span className="mobile-category-tag">{product.categoryTag}</span>

      {/* Product title */}
      <h3 className="mobile-card-title">{product.title}</h3>

      {/* Badge */}
      {product.badge && (
        <span className="mobile-badge mobile-badge-red">{product.badge}</span>
      )}

      {/* Product Image */}
      <div className="mobile-img-box">
        {imgError || !product.image ? (
          <MobileFallbackImage category={product.category} />
        ) : (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Pricing */}
      <div className="mobile-pricing">
        <span className="mobile-price-label">Starting</span>
        <span className="mobile-price-main">{product.price}</span>
        {product.oldPrice && (
          <span className="mobile-price-old">{product.oldPrice}</span>
        )}
      </div>

      {/* Action buttons */}
      <div className="product-card-actions" style={{ marginTop: "auto" }}>
        <button className="btn-card-add" aria-label={`Add ${product.title} to cart`}>
          <ShoppingCart size={12} style={{ marginRight: "4px" }} />
          Add to Cart
        </button>
        <button className="btn-card-buy" aria-label={`Buy ${product.title} now`}>
          <Zap size={12} style={{ marginRight: "4px" }} />
          Buy Now
        </button>
      </div>
    </article>
  );
}

/* ── Main Mobile Accessories Catalog Page ── */
export default function MobileAccessories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return mobileAccessoriesData
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" || p.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "All Brands" || p.brand === selectedBrand;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "brand") return a.brand.localeCompare(b.brand);
        if (sortBy === "price-asc") {
          const pa = parseFloat(a.price.replace(/[^0-9.]/g, ""));
          const pb = parseFloat(b.price.replace(/[^0-9.]/g, ""));
          return pa - pb;
        }
        if (sortBy === "price-desc") {
          const pa = parseFloat(a.price.replace(/[^0-9.]/g, ""));
          const pb = parseFloat(b.price.replace(/[^0-9.]/g, ""));
          return pb - pa;
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "var(--bg-white)" }}>
        {/* ── Hero Banner ── */}
        <section className="perfumes-hero-banner mobile-hero-banner">
          <div className="mobile-hero-inner">
            <span className="hero-category-label">
              <Smartphone size={14} color="#E6007E" />
              <span>SDR MART TECH COLLECTION</span>
            </span>
            <h1 className="perfumes-page-title">Mobile Accessories</h1>
            <p className="perfumes-page-subtitle">
              Discover premium Headphones, Earbuds, Power Banks, Chargers, Memory Cards
              and more from top brands like Celebrat, WiWU, SanDisk, Huawei & Yesido.
            </p>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <section className="perfumes-filter-bar" style={{ padding: "20px 0" }}>
          <div className="mobile-filter-inner">
            <div className="filter-controls-wrap">
              {/* Category Tabs */}
              <div className="filter-tabs" style={{ flexWrap: "wrap" }}>
                {mobileCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Right controls */}
              <div className="filter-right-controls">
                <select
                  className="filter-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  aria-label="Filter by brand"
                >
                  {mobileBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <select
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="brand">Brand (A–Z)</option>
                </select>

                <div className="filter-search-box">
                  <Search size={16} className="search-box-icon" />
                  <input
                    type="search"
                    placeholder="Search accessories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Grid ── */}
        <section className="perfumes-grid-section mobile-grid-section">
          <div className="mobile-grid-inner">
            <div className="perfumes-results-count">
              Showing <strong>{filteredProducts.length}</strong> products
            </div>

            {filteredProducts.length === 0 ? (
              <div className="perfumes-empty-state">
                <Filter size={48} color="#9CA3AF" />
                <h3>No products match your filter</h3>
                <p>Try clearing your search or selecting a different category/brand.</p>
                <button
                  className="btn-primary-navy"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedBrand("All Brands");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="mobile-products-grid">
                {filteredProducts.map((product) => (
                  <MobileCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
