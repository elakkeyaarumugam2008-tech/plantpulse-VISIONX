import React from 'react';
import { Leaf, Cpu, RefreshCw } from 'lucide-react';

export default function Header({ currentScreen, onNavigate, onOpenArchitecture, onReset }) {
  const steps = [
    { id: 'HOME', label: 'Scan', num: 1 },
    { id: 'ANALYSIS', label: 'Analyze', num: 2 },
    { id: 'RESULT', label: 'Result', num: 3 },
    { id: 'EXPLAINABILITY', label: 'Explain', num: 4 },
    { id: 'TIMELINE', label: 'Timeline', num: 5 },
    { id: 'WARNING', label: 'Warning', num: 6 }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.id === currentScreen);
  };

  const activeIndex = getCurrentStepIndex();

  return (
    <header>
      <div className="app-header">
        <div className="brand-wrapper" onClick={onReset} title="PlantPulse — Return to Home">
          <div className="brand-icon">
            <Leaf size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="brand-title">PlantPulse</span>
              <span className="brand-tag">PLANT HEALTH AI</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="header-action-btn" 
            onClick={onOpenArchitecture}
            title="View Technical AI Architecture Pipeline"
          >
            <Cpu size={16} />
            <span>AI Pipeline</span>
          </button>
          
          {currentScreen !== 'HOME' && (
            <button 
              className="header-action-btn" 
              onClick={onReset}
              title="Reset & Scan Another Leaf"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Step Tracker Bar */}
      <div className="step-indicator-bar">
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;

          return (
            <div 
              key={step.id} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <span className="step-number">{step.num}</span>
              <span className="step-label" style={{ display: isActive ? 'inline' : 'none' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </header>
  );
}
