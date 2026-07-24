import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import NewArrivals from './components/NewArrivals';
import Footer from './components/Footer';
import Login from './pages/Login';

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

/* ── Login page (no navbar/footer chrome, standalone) ── */
function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}

/* ── Root with Router ── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<HomePage />} />
        <Route path="/login"  element={<LoginPage />} />
        {/* Fallback — redirect unknown routes to home */}
        <Route path="*"       element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
