import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

export default function AnalysisScreen({ selectedImage, onAnalysisComplete }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { label: 'Leaf color', delay: 500 },
    { label: 'Texture patterns', delay: 1100 },
    { label: 'Shape characteristics', delay: 1700 },
    { label: 'Lesion characteristics', delay: 2300 }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStage(1), 600);
    const timer2 = setTimeout(() => setActiveStage(2), 1200);
    const timer3 = setTimeout(() => setActiveStage(3), 1800);
    const timer4 = setTimeout(() => setActiveStage(4), 2400);

    const finishTimer = setTimeout(() => {
      if (onAnalysisComplete) {
        onAnalysisComplete();
      }
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(finishTimer);
    };
  }, [onAnalysisComplete]);

  const imageSrc = selectedImage?.previewUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="screen-main analysis-container">
      <h2 className="screen-headline" style={{ fontSize: '1.75rem' }}>Analyzing Leaf</h2>
      <p className="screen-subtext">Examining visible characteristics...</p>

      {/* Laser Scanner Frame */}
      <div className="scanner-frame">
        <img 
          src={imageSrc} 
          alt="Analyzing Leaf" 
          className="scanner-image" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="280" viewBox="0 0 320 280"><rect width="320" height="280" fill="%2315803D"/><text x="50%" y="50%" fill="white" font-size="16" text-anchor="middle" dy=".3em">Analyzing Leaf Image...</text></svg>';
          }}
        />
        <div className="scanner-laser" />
      </div>

      {/* Analysis Stages List */}
      <div className="analysis-stages-list">
        {stages.map((stage, idx) => {
          const isDone = activeStage > idx;
          const isActive = activeStage === idx;

          return (
            <div 
              key={stage.label} 
              className={`analysis-stage-row ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="stage-icon">
                  {isDone ? (
                    <Check size={18} color="#10B981" strokeWidth={3} />
                  ) : isActive ? (
                    <div className="spinner" />
                  ) : (
                    <span style={{ fontSize: '1.2rem', color: '#CBD5E1' }}>•</span>
                  )}
                </div>
                <span>{stage.label}</span>
              </div>
              
              <span style={{ fontSize: '0.75rem', color: isDone ? '#10B981' : isActive ? 'var(--primary-green)' : '#94A3B8', fontWeight: 700 }}>
                {isDone ? 'Done' : isActive ? 'Analyzing...' : 'Waiting'}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <Loader2 size={16} className="spinner" style={{ animationDuration: '1s' }} />
        <span>Computer Vision Feature Extraction Pass in Progress...</span>
      </div>
    </div>
  );
}
