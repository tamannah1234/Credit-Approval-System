import React, { useState } from 'react';
import { customerAPI } from '../services/api';
import { Button, Card, Input, Alert, SectionHeader, Badge } from '../components/UI';

const initialForm = {
  first_name: '',
  last_name: '',
  age: '',
  monthly_salary: '',
  phone_number: '',
};

export default function RegisterCustomer() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'First name is required';
    if (!form.last_name.trim()) e.last_name = 'Last name is required';
    if (!form.age || form.age < 18 || form.age > 100) e.age = 'Valid age between 18–100 required';
    if (!form.monthly_salary || form.monthly_salary <= 0) e.monthly_salary = 'Monthly salary must be positive';
    if (!/^\d{10}$/.test(form.phone_number)) e.phone_number = 'Valid 10-digit phone number required';
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
      const data = await customerAPI.register({
        ...form,
        age: Number(form.age),
        monthly_salary: Number(form.monthly_salary),
      });
      setResult(data);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approvedLimit = form.monthly_salary
    ? (Math.round(Number(form.monthly_salary) * 36 / 100000) * 100000).toLocaleString()
    : '—';

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <SectionHeader
          label="Customer Management"
          title="Register New Customer"
          subtitle="Onboard a customer to start managing their credit profile and loan applications."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Form */}
          <Card style={{ padding: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Aaron"
                  error={errors.first_name}
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Garcia"
                  error={errors.last_name}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="18" max="100"
                  error={errors.age}
                />
                <Input
                  label="Phone Number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="9629317944"
                  maxLength="10"
                  error={errors.phone_number}
                />
              </div>

              <Input
                label="Monthly Salary (₹)"
                name="monthly_salary"
                type="number"
                value={form.monthly_salary}
                onChange={handleChange}
                placeholder="50000"
                min="1"
                error={errors.monthly_salary}
              />

              {error && <Alert type="error" onClose={() => setError('')}>{error}</Alert>}

              <Button type="submit" loading={loading} size="lg" style={{ marginTop: 4 }}>
                {loading ? 'Registering...' : 'Register Customer'}
              </Button>
            </form>
          </Card>

          {/* Side panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Preview */}
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>Limit Preview</p>
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Approved Credit Limit</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}>
                  ₹{approvedLimit}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>36× monthly salary</p>
              </div>
            </Card>

            {/* API Info */}
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>API Endpoint</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Badge variant="success">POST</Badge>
                <code style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', background: 'rgba(0,212,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>/api/register/</code>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Registers customer and auto-calculates the approved credit limit based on 36× salary.</p>
            </Card>
          </div>
        </div>

        {/* Success Result */}
        {result && (
          <Card glow style={{ padding: 28, marginTop: 24, animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>✅ Customer Registered</h3>
              <Badge variant="success">Success</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {[
                { label: 'Customer ID', value: `#${result.id}` },
                { label: 'Name', value: `${result.first_name} ${result.last_name}` },
                { label: 'Age', value: result.age },
                { label: 'Phone', value: result.phone_number },
                { label: 'Monthly Salary', value: `₹${Number(result.monthly_salary).toLocaleString()}` },
                { label: 'Approved Limit', value: `₹${Number(result.approved_limit).toLocaleString()}` },
              ].map(item => (
                <div key={item.label} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.12)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 340px"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
