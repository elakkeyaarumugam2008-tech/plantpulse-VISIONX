import React from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

export default function EarlyWarningScreen({ prediction, onNavigate, onReset }) {
  const diseaseName = prediction?.disease || 'Early Blight';

  const monitoringItems = prediction?.monitoringItems || [
    'Increase in lesion area',
    'Further leaf discoloration',
    'Spread to nearby leaves'
  ];

  return (
    <div className="screen-main">
      <div className="hero-tag" style={{ background: '#FEE2E2', color: '#991B1B' }}>
        <AlertTriangle size={14} />
        <span>EARLY WARNING NOTIFICATION</span>
      </div>

      <h1 className="screen-headline" style={{ fontSize: '1.75rem' }}>Plant Health Insight</h1>
      <p className="screen-subtext">Actionable monitoring steps based on symptom progression analysis.</p>

      {/* Main Warning Card */}
      <div className="card" style={{ background: '#FFFBEB', borderColor: '#FDE68A', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <AlertTriangle size={24} color="#D97706" />
          <h3 style={{ fontSize: '1.15rem', color: '#92400E', fontWeight: 800, margin: 0 }}>
            Condition may be worsening
          </h3>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #FCD34D', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginTop: '10px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Condition</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-deep)', marginTop: '2px' }}>
            {diseaseName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ color: 'var(--severity-moderate)' }}>Moderate</span>
            <span style={{ color: '#D97706' }}>→</span>
            <span style={{ color: 'var(--severity-high)' }}>High Risk Progression</span>
          </div>
        </div>
      </div>

      {/* What to Monitor Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={18} color="var(--primary-green)" />
          <span>What to monitor</span>
        </h4>

        <div className="action-check-list">
          {monitoringItems.map((item, idx) => (
            <div key={idx} className="action-check-item">
              <CheckCircle2 size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Step Section */}
      <div className="card card-green" style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <UserCheck size={18} color="var(--primary-green)" />
          <span>Recommended Next Step</span>
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--primary-dark)', lineHeight: 1.5 }}>
          Perform another scan after the 3-day monitoring period. 
          If symptoms continue to worsen or lesions spread to main stem structures, consult a certified local agricultural extension specialist.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="btn-group row">
        <button className="btn-primary" onClick={onReset}>
          <RefreshCw size={18} />
          <span>Scan Again</span>
        </button>

        <button className="btn-secondary" onClick={() => onNavigate('TIMELINE')}>
          <Calendar size={18} />
          <span>View Timeline</span>
        </button>
      </div>
    </div>
  );
}
