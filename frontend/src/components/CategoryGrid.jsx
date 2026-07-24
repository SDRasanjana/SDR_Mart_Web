import React from 'react';

const categories = [
  { id: 'perfumes',  title: 'Perfumes',                   image: '/images/cat_perfumes.jpg',  alt: 'Perfumes' },
  { id: 'mobile',   title: 'Mobile\nAccessories',         image: '/images/cat_mobile.jpg',    alt: 'Mobile Accessories' },
  { id: 'fancy',    title: 'Fancy items/\nWall Art',      image: '/images/cat_wallart.jpg',   alt: 'Fancy items and Wall Art' },
];

export default function CategoryGrid() {
  return (
    <section className="categories">
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-card" role="button" tabIndex={0}>
            <h3 className="serif" style={{ whiteSpace: 'pre-line' }}>
              {cat.title}
            </h3>
            <div className="cat-img-frame">
              <img src={cat.image} alt={cat.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
