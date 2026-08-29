import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import NewArrivals from './components/NewArrivals';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfumes from './pages/Perfumes';
import MobileAccessories from './pages/MobileAccessories';

/* ── Home page assembled from sections ── */
function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <CategoryGrid />
        <NewArrivals />
      </main>
      <Footer />
    </div>
  );
}

/* ── Root with Router ── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/perfumes"            element={<Perfumes />} />
        <Route path="/mobile-accessories"  element={<MobileAccessories />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        {/* Fallback — redirect unknown routes to home */}
        <Route path="*"          element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
