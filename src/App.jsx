import React, { useState } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import AnalysisScreen from './components/AnalysisScreen';
import ResultScreen from './components/ResultScreen';
import ExplainabilityScreen from './components/ExplainabilityScreen';
import TimelineScreen from './components/TimelineScreen';
import EarlyWarningScreen from './components/EarlyWarningScreen';
import ArchitectureModal from './components/ArchitectureModal';

import { predictDisease } from './services/predictionService';
import { DEMO_PRESETS } from './data/demoData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Trigger image selection and initiate background AI inference pass
  const handleSelectImage = async (imagePayload) => {
    setSelectedImage(imagePayload);
    setCurrentScreen('ANALYSIS');

    try {
      const result = await predictDisease(imagePayload);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction Engine Error:', err);
      // Fallback prediction
      const fallback = await predictDisease(DEMO_PRESETS[0]);
      setPrediction(fallback);
    }
  };

  // Called when Analysis screen finishes scanning animation (auto-advance after ~2.5s)
  const handleAnalysisComplete = () => {
    setCurrentScreen('RESULT');
  };

  // Reset complete scan workflow back to Home
  const handleReset = () => {
    setSelectedImage(null);
    setPrediction(null);
    setCurrentScreen('HOME');
  };

  return (
    <div className="app-container">
      <Header 
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onReset={handleReset}
      />

      {currentScreen === 'HOME' && (
        <HomeScreen onSelectImage={handleSelectImage} />
      )}

      {currentScreen === 'ANALYSIS' && (
        <AnalysisScreen 
          selectedImage={selectedImage}
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}

      {currentScreen === 'RESULT' && (
        <ResultScreen 
          prediction={prediction}
          selectedImage={selectedImage}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'EXPLAINABILITY' && (
        <ExplainabilityScreen 
          prediction={prediction}
          selectedImage={selectedImage}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'TIMELINE' && (
        <TimelineScreen 
          prediction={prediction}
          selectedImage={selectedImage}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'WARNING' && (
        <EarlyWarningScreen 
          prediction={prediction}
          onNavigate={setCurrentScreen}
          onReset={handleReset}
        />
      )}

      {/* Technical Architecture Modal */}
      <ArchitectureModal 
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}
