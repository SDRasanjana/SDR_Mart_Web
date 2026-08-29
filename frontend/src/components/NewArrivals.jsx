import React from 'react';

const products = [
  { 
    id: 1, 
    name: 'Aura Noir Luxury EDP 100ml', 
    price: '$89.99', 
    oldPrice: '$110.00',
    discount: '18% OFF',
    image: '/images/prod_aura_noir_1.jpg' 
  },
  { 
    id: 2, 
    name: 'Aura Velvet Intense EDP', 
    price: '$95.00', 
    oldPrice: '$120.00',
    discount: '20% OFF',
    image: '/images/prod_aura_noir_2.jpg' 
  },
  { 
    id: 3, 
    name: 'Wireless Noise Cancelling Earbuds', 
    price: '$64.99', 
    oldPrice: '$79.99',
    discount: '15% OFF',
    image: '/images/hero_perfumes.jpg' 
  },
  { 
    id: 4, 
    name: 'Eiwey Nom Signature Fragrance', 
    price: '$79.99', 
    oldPrice: '$99.00',
    discount: '19% OFF',
    image: '/images/cat_perfumes.jpg' 
  },
];

export default function NewArrivals() {
  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2 className="serif">New Arrivals</h2>
        <a href="#">See All Products &rarr;</a>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <article key={p.id} className="product-card">
            {p.discount && <span className="product-badge-pink">{p.discount}</span>}
            
            <div className="product-img-box">
              <img src={p.image} alt={p.name} />
            </div>

            <div className="product-info">
              <h4>{p.name}</h4>
              <div className="product-price-row">
                <span className="product-price-main">{p.price}</span>
                {p.oldPrice && <span className="product-price-old">{p.oldPrice}</span>}
              </div>
            </div>

            {/* SDR MART Action Buttons: Navy Add to Cart + Pink Buy Now */}
            <div className="product-card-actions">
              <button className="btn-card-add">Add to Cart</button>
              <button className="btn-card-buy">Buy Now</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
