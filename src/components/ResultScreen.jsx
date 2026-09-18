import React from 'react';
import { Eye, TrendingUp, ShieldAlert, Sparkles, Tag } from 'lucide-react';

export default function ResultScreen({ prediction, selectedImage, onNavigate }) {
  if (!prediction) {
    return (
      <div className="screen-main" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p>No prediction result available. Please select an image first.</p>
        <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => onNavigate('HOME')}>
          Return to Home
        </button>
      </div>
    );
  }

  const {
    disease = 'Early Blight',
    confidencePercentage = '94%',
    severity = 'Moderate',
    scanId = 'PL-001',
    isDemoPrediction = true
  } = prediction;

  const getSeverityColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high': return 'var(--severity-high)';
      case 'moderate': return 'var(--severity-moderate)';
      case 'low': return 'var(--severity-low)';
      default: return 'var(--severity-low)';
    }
  };

  const imageSrc = selectedImage?.previewUrl || prediction.previewUrl;

  return (
    <div className="screen-main">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div className="result-header-badge">PREDICTED CONDITION</div>
        <div className="scan-id-tag">
          <Tag size={12} />
          <span>Scan ID: {scanId}</span>
        </div>
      </div>

      <h1 className="disease-name">{disease}</h1>

      {/* Primary Leaf Preview */}
      <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '20px', boxShadow: 'var(--shadow-md)' }}>
        <img 
          src={imageSrc} 
          alt={disease} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240" viewBox="0 0 600 240"><rect width="600" height="240" fill="%2315803D"/><text x="50%" y="50%" fill="white" font-size="20" text-anchor="middle" dy=".3em">Predicted Leaf Image</text></svg>';
          }}
        />
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(15, 46, 27, 0.85)', backdropFilter: 'blur(4px)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} color="#10B981" />
          <span>Processed by PlantPulse</span>
        </div>
      </div>

      {/* Metrics Card Grid */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-label">Confidence</div>
          <div className="metric-value">{confidencePercentage}</div>
          {isDemoPrediction && (
            <span className="demo-tag">Demo prediction</span>
          )}
        </div>

        <div className="metric-card">
          <div className="metric-label">Severity</div>
          <div className="metric-value" style={{ color: getSeverityColor(severity) }}>
            {severity}
          </div>
          <div className="severity-bar-wrapper">
            <div className="severity-bar-bg">
              <div className={`severity-bar-fill ${severity.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Card */}
      <div className="card card-green" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '6px', fontSize: '0.95rem' }}>
          <ShieldAlert size={18} color="var(--primary-green)" />
          <span>Diagnostic Overview</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Visible leaf symptoms match the characteristic signatures of <strong>{disease}</strong>. 
          Click <strong>See Why</strong> to inspect the visual feature heatmap or <strong>Track Plant</strong> to view disease progression.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="btn-group row">
        <button className="btn-primary" onClick={() => onNavigate('EXPLAINABILITY')}>
          <Eye size={18} />
          <span>See Why</span>
        </button>

        <button className="btn-secondary" onClick={() => onNavigate('TIMELINE')}>
          <TrendingUp size={18} />
          <span>Track Plant</span>
        </button>
      </div>
    </div>
  );
}
