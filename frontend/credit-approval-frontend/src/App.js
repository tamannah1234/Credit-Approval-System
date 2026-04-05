import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RegisterCustomer from './pages/RegisterCustomer';
import CheckEligibility from './pages/CheckEligibility';
import CreateLoan from './pages/CreateLoan';
import ViewLoans from './pages/ViewLoans';

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 64 }}>
      <div>
        <p style={{ fontSize: '5rem', marginBottom: 8 }}>404</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: 8 }}>Page not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
        <a href="/" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>← Back to Dashboard</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterCustomer />} />
        <Route path="/eligibility" element={<CheckEligibility />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/loans" element={<ViewLoans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
