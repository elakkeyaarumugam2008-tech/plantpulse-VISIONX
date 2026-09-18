import React from 'react';
import { Calendar, AlertTriangle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { DEMO_TIMELINE_HISTORY } from '../data/demoData';

export default function TimelineScreen({ prediction, selectedImage, onNavigate }) {
  const currentDisease = prediction?.disease || 'Early Blight';
  const historyScans = DEMO_TIMELINE_HISTORY;

  return (
    <div className="screen-main">
      <div className="hero-tag">
        <Calendar size={14} />
        <span>PROGRESION MONITORING ENGINE</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <h1 className="screen-headline" style={{ fontSize: '1.75rem', margin: 0 }}>Plant Health Timeline</h1>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-green)', background: '#E6F4EA', padding: '4px 10px', borderRadius: '12px' }}>
          Plant #01
        </span>
      </div>
      <p className="screen-subtext">Tracking visible disease symptom progression across repeated scans over time.</p>

      {/* Progression Stepper Indicator */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Symptom Progression Trend: {currentDisease}
        </div>

        <div className="progression-stepper">
          <div className="stepper-node">
            <div className="stepper-circle low">8%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--severity-low)' }}>LOW</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>SEP 18</div>
          </div>

          <div className="stepper-arrow">→</div>

          <div className="stepper-node">
            <div className="stepper-circle moderate">22%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--severity-moderate)' }}>MODERATE</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>SEP 21</div>
          </div>

          <div className="stepper-arrow">→</div>

          <div className="stepper-node">
            <div className="stepper-circle high">45%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--severity-high)' }}>HIGH</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>SEP 24</div>
          </div>
        </div>

        {/* Worsening Trend Alert Banner */}
        <div className="worsening-warning-banner">
          <AlertTriangle size={24} />
          <div>
            <div className="warning-banner-title">⚠ WORSENING TREND</div>
            <div className="warning-banner-text">
              Recent scans indicate a rapid increase in visible lesion surface coverage (8% → 45%).
            </div>
          </div>
        </div>
      </div>

      {/* Historical Scans List */}
      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '14px' }}>
        Scan History & Severity Logs
      </h4>

      <div style={{ marginBottom: '20px' }}>
        {historyScans.map((scan) => {
          const sevLower = scan.severity.toLowerCase();
          const thumbSrc = scan.id === 'scan-03' && selectedImage?.previewUrl ? selectedImage.previewUrl : scan.thumbnail;

          return (
            <div key={scan.id} className={`timeline-card ${sevLower}`}>
              <div className="timeline-dot" />
              <div className="timeline-header">
                <span className="timeline-date">{scan.displayDate} — {scan.date}</span>
                <span className={`severity-pill ${sevLower}`}>
                  {scan.severity} ({scan.lesionCoverage})
                </span>
              </div>
              <div className="timeline-body">
                <img 
                  src={thumbSrc} 
                  alt={scan.disease} 
                  className="timeline-thumb" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><rect width="56" height="56" fill="%2315803D"/><text x="50%" y="50%" fill="white" font-size="8" text-anchor="middle" dy=".3em">Scan</text></svg>';
                  }}
                />
                <div className="timeline-info">
                  <div style={{ fontWeight: 700, color: 'var(--primary-deep)' }}>
                    {scan.disease} (Scan {scan.scanId})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {scan.notes}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <button className="btn-primary" onClick={() => onNavigate('WARNING')}>
        <ShieldAlert size={18} />
        <span>Compare Latest Scan & View Insights</span>
      </button>
    </div>
  );
}
