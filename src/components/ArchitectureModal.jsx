import React from 'react';
import { X, Cpu, CheckCircle2, ArrowDown, Code2 } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pipelineSteps = [
    { title: '1. Leaf Image Input', detail: 'JPG/PNG Upload or Camera Stream', status: 'Implemented' },
    { title: '2. Preprocessing & Resizing', detail: 'Normalized 224x224 RGB Matrix', status: 'Implemented' },
    { title: '3. Feature Extraction Pass', detail: 'Color, Texture, Shape & Lesion Analysis', status: 'Implemented' },
    { title: '4. Disease Classification', detail: 'CNN Transfer Learning Inference Engine', status: 'Implemented (Demo Abstraction)' },
    { title: '5. Confidence & Severity Scoring', detail: 'Probability Distribution & Symptom Metrics', status: 'Implemented' },
    { title: '6. Explainable AI (XAI)', detail: 'Grad-CAM Heatmap & Symptom Overlays', status: 'Implemented (Visual Overlay)' },
    { title: '7. Disease Progression Monitoring', detail: 'Multi-Scan Timeline & Worsening Trend Detection', status: 'Implemented' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close Modal">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-green)', fontWeight: 800, marginBottom: '6px' }}>
          <Cpu size={20} />
          <span>TECHNICAL CREDIBILITY</span>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '8px' }}>
          PlantPulse AI Architecture Pipeline
        </h2>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Overview of the system architecture distinguishing hackathon prototype execution from production ML integration.
        </p>

        {/* Architecture Flow Diagram */}
        <div className="architecture-flow">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className="flow-step-card">
                <div>
                  <div style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>{step.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.detail}</div>
                </div>
                <span className={step.status.includes('Future') ? 'tag-future' : 'tag-impl'}>
                  {step.status}
                </span>
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="flow-arrow">↓</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* System Distinction Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '14px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '6px' }}>
            <Code2 size={16} />
            <span>Future Production Backend Architecture</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            In production, the frontend calls <code style={{ background: '#E2E8F0', padding: '1px 4px', borderRadius: '3px' }}>predictDiseaseFromBackendApi()</code> to transmit leaf tensors to a Python Flask/FastAPI service hosting a trained ResNet/MobileNet model with OpenCV pre-segmentation and automated PyTorch Grad-CAM explainability outputs.
          </p>
        </div>
      </div>
    </div>
  );
}
