import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'perfumes',  title: 'Perfumes',                   path: '/perfumes',             image: '/images/cat_perfumes.jpg',  alt: 'Perfumes' },
  { id: 'mobile',   title: 'Mobile\nAccessories',         path: '/mobile-accessories',   image: '/images/cat_mobile.jpg',    alt: 'Mobile Accessories' },
  { id: 'fancy',    title: 'Fancy items/\nWall Art',      path: '/#categories',          image: '/images/cat_wallart.jpg',   alt: 'Fancy items and Wall Art' },
];

export default function CategoryGrid() {
  return (
    <section className="categories" id="categories">
      <div className="categories-grid">
        {categories.map(cat => (
          <Link key={cat.id} to={cat.path} className="cat-card">
            <h3 className="serif" style={{ whiteSpace: 'pre-line' }}>
              {cat.title}
            </h3>
            <div className="cat-img-frame">
              <img src={cat.image} alt={cat.alt} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
