import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '../components/UI';

const features = [
  {
    icon: '👤',
    title: 'Register Customer',
    description: 'Onboard new customers with personal details, salary, and contact info.',
    path: '/register',
    badge: 'POST',
    badgeVariant: 'success',
    color: '#10b981',
  },
  {
    icon: '🎯',
    title: 'Check Eligibility',
    description: 'Evaluate loan eligibility based on credit score and business rules.',
    path: '/eligibility',
    badge: 'POST',
    badgeVariant: 'accent',
    color: '#00d4ff',
  },
  {
    icon: '📝',
    title: 'Apply for Loan',
    description: 'Create new loan applications with amount, rate, and tenure details.',
    path: '/create-loan',
    badge: 'POST',
    badgeVariant: 'purple',
    color: '#a78bfa',
  },
  {
    icon: '🔍',
    title: 'View Loans',
    description: 'Retrieve loan details by Loan ID or view all loans for a customer.',
    path: '/loans',
    badge: 'GET',
    badgeVariant: 'warning',
    color: '#f59e0b',
  },
];

const creditRules = [
  { score: '> 50', decision: 'Loan Approved', color: '#10b981', icon: '✅' },
  { score: '30 – 50', decision: 'Approved (rate ≥ 12%)', color: '#00d4ff', icon: '🔵' },
  { score: '10 – 30', decision: 'Approved (rate ≥ 16%)', color: '#f59e0b', icon: '⚠️' },
  { score: '< 10', decision: 'Loan Rejected', color: '#ef4444', icon: '❌' },
];

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ animation: 'fadeInUp 0.6s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', marginBottom: 24 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>Credit Approval System</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Smart Credit{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Decisions
            </span>
            <br />Made Simple
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 36px' }}>
            A rule-based credit scoring system that evaluates customer creditworthiness, manages loan applications, and automates approval decisions.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{
                padding: '13px 28px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
                color: '#050914', fontWeight: 700, fontSize: '0.9rem',
                fontFamily: 'var(--font-display)', cursor: 'pointer',
                boxShadow: '0 0 24px rgba(0,212,255,0.3)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Get Started →
              </button>
            </Link>
            <Link to="/loans">
              <button style={{
                padding: '13px 28px', borderRadius: 10,
                background: 'transparent', border: '1px solid rgba(0,212,255,0.25)',
                color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem',
                fontFamily: 'var(--font-display)', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'; }}
              >
                View Loans
              </button>
            </Link>
          </div>
        </div>

        {/* Tech stack pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 44, animation: 'fadeInUp 0.8s ease' }}>
          {['Django REST', 'PostgreSQL', 'Celery', 'Redis', 'Docker'].map(tech => (
            <span key={tech} style={{
              padding: '4px 12px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 500,
            }}>{tech}</span>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: '0 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <Link key={f.path} to={f.path} style={{ textDecoration: 'none' }}>
              <Card
                style={{
                  padding: 28, cursor: 'pointer', height: '100%',
                  transition: 'all 0.25s ease',
                  animation: `fadeInUp ${0.4 + i * 0.1}s ease`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${f.color}40`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${f.color}12`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: '1.8rem' }}>{f.icon}</span>
                  <Badge variant={f.badgeVariant}>{f.badge}</Badge>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.description}</p>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: f.color, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                  Open <span>→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Credit Scoring Rules */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* Rules */}
          <div style={{ animation: 'fadeInUp 0.7s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 2, background: 'var(--accent-primary)', borderRadius: 2 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>Credit Engine</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Scoring Rules</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>Loan approval decisions are automated using a rule-based credit scoring engine.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {creditRules.map(rule => (
                <div key={rule.score} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 12,
                  background: `${rule.color}08`, border: `1px solid ${rule.color}22`,
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{rule.icon}</span>
                  <div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: rule.color, fontSize: '0.9rem' }}>Score {rule.score}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: 8 }}>→ {rule.decision}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Rules */}
          <div style={{ animation: 'fadeInUp 0.8s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 2, background: 'var(--accent-secondary)', borderRadius: 2 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontFamily: 'var(--font-display)' }}>Credit Factors</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Scoring Inputs</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>The credit score (0–100) is calculated from multiple factors.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'EMI Payment History', desc: 'On-time payments boost score significantly', pct: 85 },
                { label: 'Active Loan Count', desc: 'Fewer active loans = higher creditworthiness', pct: 70 },
                { label: 'Loan Volume vs Limit', desc: 'Exceeding limit sets credit score to 0', pct: 90 },
                { label: 'EMI-to-Salary Ratio', desc: 'EMI > 50% of salary = auto rejection', pct: 75 },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px 18px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.pct}%</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>{item.desc}</p>
                  <div style={{ height: 3, background: 'var(--border)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: 'linear-gradient(90deg, #7c3aed, #00d4ff)', borderRadius: 2, transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
