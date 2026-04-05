import React, { useState } from 'react';
import { loanAPI } from '../services/api';
import { Button, Card, Input, Alert, SectionHeader, Badge } from '../components/UI';

const initialForm = {
  customer_id: '',
  loan_amount: '',
  interest_rate: '',
  tenure: '',
};

export default function CreateLoan() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  // Live EMI preview (simple compound calc)
  const emi = (() => {
    const P = Number(form.loan_amount);
    const r = Number(form.interest_rate) / 100 / 12;
    const n = Number(form.tenure);
    if (!P || !r || !n) return null;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();

  const validate = () => {
    const e = {};
    if (!form.customer_id || form.customer_id <= 0) e.customer_id = 'Valid Customer ID required';
    if (!form.loan_amount || form.loan_amount <= 0) e.loan_amount = 'Loan amount must be positive';
    if (!form.interest_rate || form.interest_rate <= 0) e.interest_rate = 'Interest rate required';
    if (!form.tenure || form.tenure <= 0) e.tenure = 'Tenure required';
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
      const data = await loanAPI.createLoan({
        customer_id: Number(form.customer_id),
        loan_amount: Number(form.loan_amount),
        interest_rate: Number(form.interest_rate),
        tenure: Number(form.tenure),
      });
      setResult(data);
      if (data.loan_approved) setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <SectionHeader
          label="Loan Management"
          title="Apply for a Loan"
          subtitle="Submit a loan application. The system will evaluate eligibility and create the loan if approved."
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
                {loading ? 'Processing...' : 'Submit Application'}
              </Button>
            </form>
          </Card>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* EMI Preview */}
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>EMI Preview</p>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: emi ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                  {emi ? `₹${emi.toFixed(0)}` : '—'}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>estimated / month</p>
              </div>
              {emi && form.loan_amount && form.tenure && (
                <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Principal</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>₹{Number(form.loan_amount).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Payable</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)' }}>₹{(emi * Number(form.tenure)).toFixed(0)}</span>
                  </div>
                </div>
              )}
            </Card>

            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>API Endpoint</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Badge variant="purple">POST</Badge>
                <code style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', background: 'rgba(0,212,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>/api/create-loan/</code>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Uses compound interest for EMI calculation. Only active loans are considered for scoring.</p>
            </Card>
          </div>
        </div>

        {/* Result */}
        {result && (
          <Card glow={result.loan_approved} style={{ padding: 28, marginTop: 24, animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>
                {result.loan_approved ? '🎉 Loan Created!' : '❌ Application Rejected'}
              </h3>
              <Badge variant={result.loan_approved ? 'success' : 'error'}>{result.loan_approved ? 'Approved' : 'Rejected'}</Badge>
            </div>

            {result.message && (
              <Alert type={result.loan_approved ? 'success' : 'error'} style={{ marginBottom: 16 }}>{result.message}</Alert>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                result.loan_id && { label: 'Loan ID', value: `#${result.loan_id}` },
                { label: 'Customer ID', value: `#${result.customer_id}` },
                result.loan_amount && { label: 'Loan Amount', value: `₹${Number(result.loan_amount).toLocaleString()}` },
                result.tenure && { label: 'Tenure', value: `${result.tenure} months` },
                result.monthly_installment && { label: 'Monthly EMI', value: `₹${Number(result.monthly_installment).toFixed(2)}` },
              ].filter(Boolean).map(item => (
                <div key={item.label} style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.value}</p>
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
