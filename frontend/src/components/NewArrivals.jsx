import React from 'react';

const products = [
  { id: 1, name: 'Aura Noir EDP',  price: '$89.99', image: '/images/prod_aura_noir_1.jpg' },
  { id: 2, name: 'Aura Noir EDP',  price: '$89.99', image: '/images/prod_aura_noir_2.jpg' },
  { id: 3, name: 'Aura Noir EDP',  price: '$89.99', image: '/images/hero_perfumes.jpg' },
  { id: 4, name: 'Eiwey Nom EDP',  price: '$89.99', image: '/images/cat_perfumes.jpg' },
  { id: 5, name: 'Einoy Nom EDP',  price: '$89.99', image: '/images/prod_aura_noir_1.jpg' },
];

export default function NewArrivals() {
  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2 className="serif">New Arrivals</h2>
        <a href="#">See All</a>
      </div>

      <div className="products-grid">
        {products.map(p => (
          <article key={p.id} className="product-card">
            <div className="product-img-box">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="product-info">
              <h4>{p.name}</h4>
              <span className="price">{p.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
