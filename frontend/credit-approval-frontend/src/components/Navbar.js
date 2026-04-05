import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/register', label: 'Register' },
  { path: '/eligibility', label: 'Eligibility' },
  { path: '/create-loan', label: 'Apply Loan' },
  { path: '/loans', label: 'View Loans' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(5,9,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,48,80,0.8)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0,212,255,0.35)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Credit<span style={{ color: 'var(--accent-primary)' }}>Sense</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
                    border: active ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.target.style.color = 'var(--text-primary)';
                      e.target.style.background = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.target.style.color = 'var(--text-secondary)';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#10b981', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>LIVE</span>
          </div>

          {/* Mobile toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', padding: 4 }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {mobileOpen ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: 'rgba(5,9,20,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '16px 24px 24px',
          animation: 'fadeInUp 0.2s ease',
        }}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'block', padding: '12px 16px', borderRadius: 10,
                  marginBottom: 4,
                  fontFamily: 'var(--font-display)', fontWeight: active ? 600 : 400,
                  color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  background: active ? 'rgba(0,212,255,0.08)' : 'transparent',
                  textDecoration: 'none', fontSize: '0.9rem',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
