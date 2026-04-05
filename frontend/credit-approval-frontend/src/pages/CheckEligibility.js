import React, { useState } from 'react';
import { loanAPI } from '../services/api';
import { Button, Card, Input, Alert, SectionHeader, Badge } from '../components/UI';

const initialForm = {
  customer_id: '',
  loan_amount: '',
  interest_rate: '',
  tenure: '',
};

export default function CheckEligibility() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.customer_id || form.customer_id <= 0) e.customer_id = 'Valid Customer ID required';
    if (!form.loan_amount || form.loan_amount <= 0) e.loan_amount = 'Loan amount must be positive';
    if (!form.interest_rate || form.interest_rate <= 0) e.interest_rate = 'Interest rate must be positive';
    if (!form.tenure || form.tenure <= 0) e.tenure = 'Tenure must be positive';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await loanAPI.checkEligibility({
        customer_id: Number(form.customer_id),
        loan_amount: Number(form.loan_amount),
        interest_rate: Number(form.interest_rate),
        tenure: Number(form.tenure),
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreMeta = (score) => {
    if (score === null || score === undefined) return null;
    if (score > 50) return { label: 'Excellent', color: '#10b981', width: `${Math.min(score, 100)}%`, variant: 'success' };
    if (score > 30) return { label: 'Good', color: '#00d4ff', width: `${score}%`, variant: 'accent' };
    if (score > 10) return { label: 'Fair', color: '#f59e0b', width: `${score}%`, variant: 'warning' };
    return { label: 'Poor', color: '#ef4444', width: `${score}%`, variant: 'error' };
  };

  const scoreMeta = result ? getScoreMeta(result.credit_score) : null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <SectionHeader
          label="Credit Analysis"
          title="Check Loan Eligibility"
          subtitle="Evaluate a customer's loan eligibility based on their credit score and the loan parameters."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
          <Card style={{ padding: 32 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Input
                label="Customer ID"
                name="customer_id"
                type="number"
                value={form.customer_id}
                onChange={handleChange}
                placeholder="1"
                min="1"
                error={errors.customer_id}
              />

              <Input
                label="Loan Amount (₹)"
                name="loan_amount"
                type="number"
                value={form.loan_amount}
                onChange={handleChange}
                placeholder="100000"
                min="1"
                error={errors.loan_amount}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input
                  label="Interest Rate (%)"
                  name="interest_rate"
                  type="number"
                  value={form.interest_rate}
                  onChange={handleChange}
                  placeholder="10"
                  min="0.1" step="0.1"
                  error={errors.interest_rate}
                />
                <Input
                  label="Tenure (months)"
                  name="tenure"
                  type="number"
                  value={form.tenure}
                  onChange={handleChange}
                  placeholder="12"
                  min="1"
                  error={errors.tenure}
                />
              </div>

              {error && <Alert type="error" onClose={() => setError('')}>{error}</Alert>}

              <Button type="submit" loading={loading} size="lg">
                {loading ? 'Analyzing...' : 'Check Eligibility'}
              </Button>
            </form>
          </Card>

          {/* Rules sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>Approval Rules</p>
              {[
                { score: '> 50', label: 'Approved', color: '#10b981' },
                { score: '30–50', label: 'Rate ≥ 12%', color: '#00d4ff' },
                { score: '10–30', label: 'Rate ≥ 16%', color: '#f59e0b' },
                { score: '< 10', label: 'Rejected', color: '#ef4444' },
              ].map(r => (
                <div key={r.score} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>Score {r.score}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: r.color, fontFamily: 'var(--font-display)' }}>{r.label}</span>
                </div>
              ))}
              <p style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>EMI {'>'} 50% of salary → Auto rejection</p>
            </Card>

            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>API Endpoint</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge variant="accent">POST</Badge>
                <code style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', background: 'rgba(0,212,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>/api/check-eligibility/</code>
              </div>
            </Card>
          </div>
        </div>

        {/* Result */}
        {result && (
          <Card glow={result.approval} style={{ padding: 28, marginTop: 24, animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>
                {result.approval ? '✅ Loan Eligible' : '❌ Not Eligible'}
              </h3>
              <Badge variant={result.approval ? 'success' : 'error'}>{result.approval ? 'Approved' : 'Rejected'}</Badge>
            </div>

            {/* Credit Score Meter */}
            {result.credit_score !== undefined && scoreMeta && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>Credit Score</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: scoreMeta.color }}>{result.credit_score} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ 100</span></span>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4 }}>
                  <div style={{ height: '100%', width: scoreMeta.width, background: scoreMeta.color, borderRadius: 4, transition: 'width 1s ease', boxShadow: `0 0 8px ${scoreMeta.color}60` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <Badge variant={scoreMeta.variant}>{scoreMeta.label}</Badge>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                { label: 'Customer ID', value: `#${result.customer_id}` },
                result.loan_id && { label: 'Loan ID', value: `#${result.loan_id}` },
                { label: 'Monthly EMI', value: result.monthly_installment ? `₹${Number(result.monthly_installment).toFixed(2)}` : '—' },
                result.corrected_interest_rate !== undefined && {
                  label: 'Corrected Rate',
                  value: result.corrected_interest_rate ? `${result.corrected_interest_rate}%` : 'N/A',
                },
                result.message && { label: 'Message', value: result.message },
              ].filter(Boolean).map(item => (
                <div key={item.label} style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', wordBreak: 'break-word' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 300px"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
