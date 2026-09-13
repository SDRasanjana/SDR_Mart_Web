import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { perfumesData, perfumeBrands, perfumeCategories } from "../data/perfumesData";
import { Search, Filter, Sparkles, ShoppingCart, Zap } from "lucide-react";

/* ── Fallback when product image is missing or broken ── */
const PerfumeFallbackImage = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #F5F7FF 0%, #FFF0F7 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}
  >
    <span style={{ fontSize: "52px" }}>🌸</span>
    <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600 }}>
      SDR MART Perfume
    </span>
  </div>
);

/* ── Perfume Product Card — same layout as Mobile Accessories ── */
function PerfumeCard({ product, onBuyNow }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="mobile-card">
      {/* Category / brand tag — gray small text at top */}
      <span className="mobile-category-tag">{product.categoryTag}</span>

      {/* Product title — vibrant pink, bold */}
      <h3 className="mobile-card-title">{product.title}</h3>

      {/* Badge */}
      {product.badge && (
        <span
          className={`mobile-badge ${
            product.badgeType === "green" ? "mobile-badge-green" : "mobile-badge-red"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <div className="mobile-img-box">
        {imgError || !product.image ? (
          <PerfumeFallbackImage />
        ) : (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Pricing block */}
      <div className="mobile-pricing">
        <span className="mobile-price-label">Starting</span>
        <span className="mobile-price-main">{product.price}</span>
        {product.oldPrice && (
          <span className="mobile-price-old">{product.oldPrice}</span>
        )}
      </div>

      {/* Action buttons — same Navy + Pink pattern */}
      <div className="product-card-actions" style={{ marginTop: "auto" }}>
        <button className="btn-card-add" aria-label={`Add ${product.title} to cart`}>
          <ShoppingCart size={12} style={{ marginRight: "4px" }} />
          Add to Cart
        </button>
        <button
          className="btn-card-buy"
          aria-label={`Buy ${product.title} now`}
          onClick={() => onBuyNow(product)}
        >
          <Zap size={12} style={{ marginRight: "4px" }} />
          Buy Now
        </button>
      </div>
    </article>
  );
}

/* ── Perfumes Catalog Page ── */
export default function Perfumes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [sortBy, setSortBy] = useState("featured");

  /* ── Buy Now auth guard ── */
  const handleBuyNow = (product) => {
    const user = localStorage.getItem("sdr_user");
    if (!user) {
      navigate(`/login?redirect=/product/${product.id}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const filteredProducts = useMemo(() => {
    return perfumesData
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" || p.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "All Brands" || p.brand === selectedBrand;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "brand") return a.brand.localeCompare(b.brand);
        if (sortBy === "price-asc") {
          return parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""));
        }
        if (sortBy === "price-desc") {
          return parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, ""));
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "var(--bg-white)" }}>
        {/* ── Hero Banner ── */}
        <section className="perfumes-hero-banner">
          <div className="mobile-hero-inner">
            <span className="hero-category-label">
              <Sparkles size={14} color="#E6007E" />
              <span>SDR MART LUXURY COLLECTION</span>
            </span>
            <h1 className="perfumes-page-title">Fragrance & Perfume Collection</h1>
            <p className="perfumes-page-subtitle">
              Discover authentic designer perfumes from Carolina Herrera, Givenchy, Jeanne Arthes & more.
            </p>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <section className="perfumes-filter-bar" style={{ padding: "20px 0" }}>
          <div className="mobile-filter-inner">
            <div className="filter-controls-wrap">
              {/* Category tabs */}
              <div className="filter-tabs" style={{ flexWrap: "wrap" }}>
                {perfumeCategories.map((cat) => (
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
                  {perfumeBrands.map((b) => (
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
                    placeholder="Search perfumes..."
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
              Showing <strong>{filteredProducts.length}</strong> fragrances
            </div>

            {filteredProducts.length === 0 ? (
              <div className="perfumes-empty-state">
                <Filter size={48} color="#9CA3AF" />
                <h3>No perfumes match your filter</h3>
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
              /* ── Reuse mobile-products-grid for consistent 5-column layout ── */
              <div className="mobile-products-grid">
                {filteredProducts.map((product) => (
                  <PerfumeCard key={product.id} product={product} onBuyNow={handleBuyNow} />
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
