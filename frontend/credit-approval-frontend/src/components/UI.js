import React from 'react';

/* ─── Button ─── */
export function Button({ children, variant = 'primary', size = 'md', loading, disabled, className = '', ...props }) {
  const base = `
    inline-flex items-center justify-center gap-2 font-display font-600 
    border rounded-[10px] transition-all duration-250 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  const variants = {
    primary: `
      bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-[#050914]
      border-transparent hover:shadow-[0_0_24px_rgba(0,212,255,0.4)]
      hover:-translate-y-0.5 active:translate-y-0
    `,
    secondary: `
      bg-transparent text-[#00d4ff] border-[#00d4ff40]
      hover:bg-[#00d4ff10] hover:border-[#00d4ff80]
    `,
    danger: `
      bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white
      border-transparent hover:shadow-[0_0_24px_rgba(239,68,68,0.4)]
    `,
    ghost: `
      bg-transparent text-[#8ba4c8] border-transparent
      hover:text-[#f0f6ff] hover:bg-[#ffffff08]
    `,
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.02em' }}
      {...props}
    >
      {loading && <Spinner size={14} />}
      {children}
    </button>
  );
}

/* ─── Card ─── */
export function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`rounded-[20px] border ${className}`}
      style={{
        background: 'var(--bg-card)',
        borderColor: glow ? 'rgba(0,212,255,0.25)' : 'var(--border)',
        boxShadow: glow ? '0 0 30px rgba(0,212,255,0.08)' : 'none',
        transition: 'var(--transition)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Input ─── */
export function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <Icon size={15} />
          </div>
        )}
        <input
          className={className}
          style={{
            width: '100%',
            padding: Icon ? '11px 14px 11px 38px' : '11px 14px',
            background: 'rgba(10,22,40,0.8)',
            border: `1px solid ${error ? 'var(--accent-red)' : 'var(--border)'}`,
            borderRadius: 10,
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'var(--transition)',
            fontFamily: 'var(--font-body)',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--accent-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? 'var(--accent-red)' : 'var(--border)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)' }}>{error}</span>}
    </div>
  );
}

/* ─── Badge ─── */
export function Badge({ children, variant = 'default' }) {
  const styles = {
    default: { background: 'rgba(139,164,200,0.15)', color: '#8ba4c8' },
    success: { background: 'rgba(16,185,129,0.15)', color: '#10b981' },
    error: { background: 'rgba(239,68,68,0.15)', color: '#ef4444' },
    warning: { background: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
    accent: { background: 'rgba(0,212,255,0.15)', color: '#00d4ff' },
    purple: { background: 'rgba(124,58,237,0.15)', color: '#a78bfa' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
      borderRadius: 100, fontSize: '0.72rem', fontWeight: 600,
      letterSpacing: '0.05em', textTransform: 'uppercase',
      fontFamily: 'var(--font-display)',
      ...styles[variant],
    }}>
      {children}
    </span>
  );
}

/* ─── Spinner ─── */
export function Spinner({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Alert ─── */
export function Alert({ type = 'info', children, onClose }) {
  const styles = {
    success: { border: '#10b98140', bg: 'rgba(16,185,129,0.08)', icon: '✓', color: '#10b981' },
    error: { border: '#ef444440', bg: 'rgba(239,68,68,0.08)', icon: '✕', color: '#ef4444' },
    warning: { border: '#f59e0b40', bg: 'rgba(245,158,11,0.08)', icon: '⚠', color: '#f59e0b' },
    info: { border: '#00d4ff40', bg: 'rgba(0,212,255,0.08)', icon: 'i', color: '#00d4ff' },
  };
  const s = styles[type];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '14px 16px', borderRadius: 12,
      background: s.bg, border: `1px solid ${s.border}`,
      animation: 'fadeInUp 0.3s ease',
    }}>
      <span style={{ color: s.color, fontWeight: 700, marginTop: 1, fontSize: '0.85rem' }}>{s.icon}</span>
      <div style={{ flex: 1, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{children}</div>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 0 }}>✕</button>
      )}
    </div>
  );
}

/* ─── Section Header ─── */
export function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {label && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 20, height: 2, background: 'var(--accent-primary)', borderRadius: 2 }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>{label}</span>
        </div>
      )}
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 8 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480 }}>{subtitle}</p>}
    </div>
  );
}

/* ─── Stat Card ─── */
export function StatCard({ label, value, icon: Icon, color = 'var(--accent-primary)', trend }) {
  return (
    <Card style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>{label}</p>
          <p style={{ fontSize: '1.7rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
          {trend && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{trend}</p>}
        </div>
        {Icon && (
          <div style={{ padding: 10, borderRadius: 10, background: `${color}18`, color }}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </Card>
  );
}
