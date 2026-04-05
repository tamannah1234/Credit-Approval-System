import React, { useState } from 'react';
import { loanAPI } from '../services/api';
import { Button, Card, Input, Alert, SectionHeader, Badge } from '../components/UI';

function LoanCard({ loan, index }) {
  const now = new Date();
  const end = loan.end_date ? new Date(loan.end_date) : null;
  const isActive = end ? end >= now : true;

  return (
    <Card
      style={{
        padding: 24,
        animation: `fadeInUp ${0.3 + index * 0.07}s ease`,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-display)', marginBottom: 2 }}>Loan ID</p>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>#{loan.loan_id}</p>
        </div>
        <Badge variant={isActive ? 'success' : 'default'}>{isActive ? 'Active' : 'Closed'}</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Loan Amount', value: `₹${Number(loan.loan_amount).toLocaleString()}` },
          { label: 'Interest Rate', value: `${loan.interest_rate}%` },
          { label: 'Tenure', value: `${loan.tenure} months` },
          { label: 'Monthly EMI', value: loan.monthly_repayment ? `₹${Number(loan.monthly_repayment).toFixed(2)}` : '—' },
          { label: 'EMIs Paid', value: loan.emis_paid_on_time ?? '—' },
          { label: 'Repayments Left', value: loan.repayments_left ?? '—' },
        ].map(item => (
          <div key={item.label} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{item.label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{item.value}</p>
          </div>
        ))}
      </div>

      {(loan.start_date || loan.end_date) && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 20 }}>
          {loan.start_date && (
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Start: </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>{new Date(loan.start_date).toLocaleDateString()}</span>
            </div>
          )}
          {loan.end_date && (
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>End: </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>{new Date(loan.end_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function ViewLoans() {
  const [mode, setMode] = useState('loan'); // 'loan' | 'customer'
  const [loanId, setLoanId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResult(null);
    setCustomerInfo(null);

    if (mode === 'loan') {
      if (!loanId || loanId <= 0) { setError('Please enter a valid Loan ID'); return; }
      setLoading(true);
      try {
        const data = await loanAPI.viewLoan(loanId);
        setResult([data.loan_details || data]);
        setCustomerInfo(data.customer || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!customerId || customerId <= 0) { setError('Please enter a valid Customer ID'); return; }
      setLoading(true);
      try {
        const data = await loanAPI.viewCustomerLoans(customerId);
        setResult(Array.isArray(data) ? data : data.loans || [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <SectionHeader
          label="Loan Queries"
          title="View Loan Details"
          subtitle="Search for a specific loan by ID or view all loans associated with a customer."
        />

        {/* Mode Toggle */}
        <div style={{ display: 'flex', gap: 0, background: 'var(--bg-secondary)', borderRadius: 12, padding: 4, border: '1px solid var(--border)', marginBottom: 28, width: 'fit-content' }}>
          {[
            { key: 'loan', label: '🔍 By Loan ID', badge: 'GET' },
            { key: 'customer', label: '📄 By Customer', badge: 'GET' },
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => { setMode(opt.key); setResult(null); setError(''); }}
              style={{
                padding: '9px 20px', borderRadius: 9, border: 'none',
                background: mode === opt.key ? 'var(--bg-card)' : 'transparent',
                color: mode === opt.key ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-display)', fontWeight: mode === opt.key ? 600 : 400,
                fontSize: '0.85rem', cursor: 'pointer',
                boxShadow: mode === opt.key ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <Card style={{ padding: 28, marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
            {mode === 'loan' ? (
              <div style={{ flex: 1 }}>
                <Input
                  label="Loan ID"
                  type="number"
                  value={loanId}
                  onChange={e => setLoanId(e.target.value)}
                  placeholder="Enter Loan ID..."
                  min="1"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
            ) : (
              <div style={{ flex: 1 }}>
                <Input
                  label="Customer ID"
                  type="number"
                  value={customerId}
                  onChange={e => setCustomerId(e.target.value)}
                  placeholder="Enter Customer ID..."
                  min="1"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
            )}
            <Button onClick={handleSearch} loading={loading} size="md" style={{ whiteSpace: 'nowrap' }}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {error && <div style={{ marginTop: 16 }}><Alert type="error" onClose={() => setError('')}>{error}</Alert></div>}
        </Card>

        {/* Customer info (for loan query) */}
        {customerInfo && (
          <Card style={{ padding: 20, marginBottom: 20, animation: 'fadeInUp 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👤</div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{customerInfo.first_name} {customerInfo.last_name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer #{customerInfo.customer_id} · {customerInfo.phone_number}</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>Credit Limit</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-primary)', fontSize: '1rem' }}>₹{Number(customerInfo.approved_limit).toLocaleString()}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {result !== null && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {result.length} loan{result.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {result.length === 0 ? (
              <Card style={{ padding: 48, textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', marginBottom: 12 }}>📭</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-secondary)' }}>No loans found</p>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: 4 }}>This customer has no loan history yet.</p>
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {result.map((loan, i) => <LoanCard key={loan.loan_id || i} loan={loan} index={i} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
