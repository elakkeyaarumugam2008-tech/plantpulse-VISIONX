import React, { useRef, useState } from 'react';
import { Upload, Camera, CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoData';

export default function HomeScreen({ onSelectImage }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid leaf image (JPG, PNG, or WEBP).');
      return;
    }
    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      onSelectImage({
        file,
        name: file.name,
        previewUrl: event.target.result
      });
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handlePresetSelect = (preset) => {
    setErrorMessage('');
    onSelectImage({
      presetId: preset.id,
      name: preset.name,
      previewUrl: preset.imageUrl,
      targetDisease: preset.targetDisease
    });
  };

  return (
    <div className="screen-main">
      <div className="hero-tag">
        <Sparkles size={14} />
        <span>IC-06 PLANT DISEASE CLASSIFIER</span>
      </div>

      <h1 className="screen-headline">Detect. Understand. Monitor.</h1>
      <p className="screen-subtext">
        AI-assisted plant disease screening from leaf images with explainable diagnostic evidence.
      </p>

      {errorMessage && (
        <div className="disclaimer-box" style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', marginBottom: '16px' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Upload Dropzone */}
      <div 
        className={`upload-box ${isDragOver ? 'drag-over' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/jpeg,image/png,image/webp" 
          style={{ display: 'none' }} 
        />
        <input 
          type="file" 
          ref={cameraInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          capture="environment"
          style={{ display: 'none' }} 
        />

        <div className="upload-icon-circle">
          <Upload size={30} />
        </div>
        
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Upload Leaf Image
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Drag and drop leaf photo here, or click to browse (JPG, PNG, WEBP)
        </p>
      </div>

      {/* Action Buttons */}
      <div className="btn-group row">
        <button className="btn-primary" onClick={() => fileInputRef.current?.click()}>
          <Upload size={18} />
          <span>Upload Leaf</span>
        </button>

        <button className="btn-secondary" onClick={() => cameraInputRef.current?.click() || fileInputRef.current?.click()}>
          <Camera size={18} />
          <span>Capture Leaf</span>
        </button>
      </div>

      {/* Preset Demo Leaf Selector */}
      <div style={{ marginTop: '24px' }}>
        <div className="preset-selector-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ImageIcon size={14} />
          <span>Or test with a sample leaf preset:</span>
        </div>
        
        <div className="preset-scroll-row">
          {DEMO_PRESETS.map((preset) => (
            <div 
              key={preset.id} 
              className="preset-card"
              onClick={() => handlePresetSelect(preset)}
            >
              <img 
                src={preset.imageUrl} 
                alt={preset.name} 
                className="preset-thumb"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"><rect width="100" height="70" fill="%2315803D"/><text x="50%" y="50%" fill="white" font-size="12" text-anchor="middle" dy=".3em">Leaf Sample</text></svg>';
                }}
              />
              <div className="preset-label">{preset.crop}</div>
              <div className="preset-sub">{preset.targetDisease}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What PlantPulse Analyzes Card */}
      <div className="card card-green" style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-deep)', marginBottom: '8px' }}>
          What PlantPulse analyzes
        </h4>
        <div className="features-grid">
          <div className="feature-pill">
            <CheckCircle2 size={16} />
            <span>Leaf color</span>
          </div>
          <div className="feature-pill">
            <CheckCircle2 size={16} />
            <span>Texture patterns</span>
          </div>
          <div className="feature-pill">
            <CheckCircle2 size={16} />
            <span>Shape characteristics</span>
          </div>
          <div className="feature-pill">
            <CheckCircle2 size={16} />
            <span>Visible lesions</span>
          </div>
        </div>
      </div>

      {/* Medical/Diagnostic Disclaimer */}
      <div className="disclaimer-box">
        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          AI-assisted screening prototype only. Not a substitute for professional agricultural diagnosis.
        </span>
      </div>
    </div>
  );
}
