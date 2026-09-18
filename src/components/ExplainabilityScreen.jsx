import React, { useState } from 'react';
import { Eye, TrendingUp, Info, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function ExplainabilityScreen({ prediction, selectedImage, onNavigate }) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'LESIONS', 'DISCOLORATION', 'TEXTURE'

  const imageSrc = selectedImage?.previewUrl || prediction?.previewUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=800&q=80';

  const heatmap = prediction?.heatmapOverlay || {
    lesions: [{ x: 40, y: 45, radius: 30 }],
    discoloration: [{ x: 48, y: 50, radius: 50 }],
    texture: [{ x: 38, y: 42, width: 40, height: 40 }]
  };

  const observedFeatures = prediction?.observedFeatures || [
    { name: 'Lesion patterns', status: 'Detected', detail: 'Concentric ring brown spots' },
    { name: 'Discoloration', status: 'Detected', detail: 'Chlorotic yellow halo perimeter' },
    { name: 'Texture variation', status: 'Detected', detail: 'Desiccated surface roughness' },
    { name: 'Shape anomaly', status: 'Low', detail: 'Normal leaf boundary geometry' }
  ];

  const explanationText = prediction?.explanationText || 'The prediction is based on visible patterns in the leaf, including lesion distribution, discoloration, and texture variation.';

  return (
    <div className="screen-main">
      <div className="hero-tag">
        <Eye size={14} />
        <span>EXPLAINABLE AI ENGINE</span>
      </div>

      <h1 className="screen-headline" style={{ fontSize: '1.75rem' }}>Why this prediction?</h1>
      <p className="screen-subtext">Visible characteristics that contributed to the prediction</p>

      {/* Visual Overlay Canvas Box */}
      <div className="xai-preview-box">
        <img 
          src={imageSrc} 
          alt="Visual Explanation" 
          className="xai-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><rect width="600" height="340" fill="%2315803D"/><text x="50%" y="50%" fill="white" font-size="20" text-anchor="middle" dy=".3em">Visual Explanation Leaf</text></svg>';
          }}
        />

        {/* Heatmap Overlay Markers */}
        <div className="xai-overlay-canvas">
          {/* Lesion Overlays */}
          {(activeTab === 'ALL' || activeTab === 'LESIONS') && heatmap.lesions?.map((spot, idx) => (
            <div 
              key={`lesion-${idx}`}
              className="xai-marker-spot lesion"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.radius * 2}px`,
                height: `${spot.radius * 2}px`
              }}
              title={spot.label || 'Lesion Region'}
            />
          ))}

          {/* Discoloration Overlays */}
          {(activeTab === 'ALL' || activeTab === 'DISCOLORATION') && heatmap.discoloration?.map((spot, idx) => (
            <div 
              key={`discoloration-${idx}`}
              className="xai-marker-spot discoloration"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.radius * 2.2}px`,
                height: `${spot.radius * 2.2}px`
              }}
              title={spot.label || 'Chlorosis Zone'}
            />
          ))}

          {/* Texture Variation Overlays */}
          {(activeTab === 'ALL' || activeTab === 'TEXTURE') && heatmap.texture?.map((spot, idx) => (
            <div 
              key={`texture-${idx}`}
              className="xai-marker-spot texture"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.width || 40}px`,
                height: `${spot.height || 40}px`
              }}
              title={spot.label || 'Desiccated Texture'}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', color: '#FEF08A', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
          Prototype visual explanation
        </div>
      </div>

      {/* Layer Filter Toggle Buttons */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button 
          onClick={() => setActiveTab('ALL')}
          style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 700, background: activeTab === 'ALL' ? 'var(--primary-deep)' : '#E2E8F0', color: activeTab === 'ALL' ? '#FFFFFF' : 'var(--text-main)' }}
        >
          All Features
        </button>
        <button 
          onClick={() => setActiveTab('LESIONS')}
          style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 700, background: activeTab === 'LESIONS' ? '#EF4444' : '#E2E8F0', color: activeTab === 'LESIONS' ? '#FFFFFF' : 'var(--text-main)' }}
        >
          ● Lesions
        </button>
        <button 
          onClick={() => setActiveTab('DISCOLORATION')}
          style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 700, background: activeTab === 'DISCOLORATION' ? '#F59E0B' : '#E2E8F0', color: activeTab === 'DISCOLORATION' ? '#FFFFFF' : 'var(--text-main)' }}
        >
          ● Discoloration
        </button>
        <button 
          onClick={() => setActiveTab('TEXTURE')}
          style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 700, background: activeTab === 'TEXTURE' ? '#06B6D4' : '#E2E8F0', color: activeTab === 'TEXTURE' ? '#FFFFFF' : 'var(--text-main)' }}
        >
          ● Texture
        </button>
      </div>

      {/* Legend */}
      <div className="xai-legend-row">
        <div className="legend-item"><span className="dot-lesion" /> Lesion</div>
        <div className="legend-item"><span className="dot-discoloration" /> Discoloration</div>
        <div className="legend-item"><span className="dot-texture" /> Texture variation</div>
      </div>

      {/* Observed Characteristics Table */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '8px' }}>
          Observed Characteristics
        </h4>

        <table className="xai-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Status</th>
              <th>Pattern Detail</th>
            </tr>
          </thead>
          <tbody>
            {observedFeatures.map((feat) => {
              const statusClass = feat.status.toLowerCase().includes('detected') ? 'detected' : feat.status.toLowerCase().includes('low') ? 'low' : 'none';
              return (
                <tr key={feat.name}>
                  <td style={{ fontWeight: 700 }}>{feat.name}</td>
                  <td>
                    <span className={`status-badge ${statusClass}`}>{feat.status}</span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{feat.detail}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ background: '#F0FDF4', borderLeft: '4px solid var(--accent-emerald)', padding: '10px 12px', borderRadius: '4px', marginTop: '14px', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
          <p>{explanationText}</p>
        </div>
      </div>

      {/* Navigation to Health Timeline */}
      <button className="btn-primary" onClick={() => onNavigate('TIMELINE')}>
        <TrendingUp size={18} />
        <span>View Health Timeline</span>
      </button>
    </div>
  );
}
