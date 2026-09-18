/**
 * PlantPulse Prediction Service
 * 
 * Clean abstraction layer for leaf image classification.
 * In a production environment, this service makes an async REST/gRPC call
 * to a Python ML Inference backend (TensorFlow/PyTorch CNN model).
 * 
 * For this prototype, it delivers structured demo prediction payloads
 * clearly tagged as "Demo prediction".
 */

import { DISEASE_CATALOG, DEMO_PRESETS } from '../data/demoData';

/**
 * Predicts plant disease from an image input (Data URL, File, or preset object)
 * 
 * @param {Object|File|string} imageInput 
 * @returns {Promise<Object>} Structured prediction payload
 */
export async function predictDisease(imageInput) {
  // Simulate network latency / model execution time (e.g. 800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  let targetCondition = 'Early Blight';
  let customImagePreview = null;

  if (typeof imageInput === 'object' && imageInput !== null) {
    if (imageInput.presetId) {
      const matchedPreset = DEMO_PRESETS.find(p => p.id === imageInput.presetId);
      if (matchedPreset) {
        targetCondition = matchedPreset.targetDisease;
        customImagePreview = matchedPreset.imageUrl;
      }
    } else if (imageInput.previewUrl) {
      customImagePreview = imageInput.previewUrl;
      if (imageInput.targetDisease) {
        targetCondition = imageInput.targetDisease;
      } else {
        const fileName = (imageInput.name || '').toLowerCase();
        if (fileName.includes('late') || fileName.includes('potato')) {
          targetCondition = 'Late Blight';
        } else if (fileName.includes('spot') || fileName.includes('pepper')) {
          targetCondition = 'Leaf Spot';
        } else if (fileName.includes('healthy') || fileName.includes('apple') || fileName.includes('green')) {
          targetCondition = 'Healthy';
        } else {
          targetCondition = 'Early Blight';
        }
      }
    }
  } else if (typeof imageInput === 'string') {
    customImagePreview = imageInput;
  }

  const catalogEntry = DISEASE_CATALOG[targetCondition] || DISEASE_CATALOG['Early Blight'];

  // Construct standard prediction response object
  return {
    disease: catalogEntry.name,
    scientificName: catalogEntry.scientificName,
    confidence: catalogEntry.defaultConfidence,
    confidencePercentage: Math.round(catalogEntry.defaultConfidence * 100) + '%',
    severity: catalogEntry.severity,
    scanId: catalogEntry.scanId || `PL-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString(),
    isDemoPrediction: true,
    previewUrl: customImagePreview || catalogEntry.defaultImage || DEMO_PRESETS[0].imageUrl,
    characteristics: { ...catalogEntry.characteristics },
    observedFeatures: catalogEntry.observedFeatures,
    explanationText: catalogEntry.explanationText,
    heatmapOverlay: catalogEntry.heatmapOverlay,
    monitoringItems: catalogEntry.monitoringItems,
    nextSteps: catalogEntry.nextSteps
  };
}

/**
 * Placeholder for connecting real ML REST backend endpoint in future integration
 * @param {FormData} formData 
 */
export async function predictDiseaseFromBackendApi(formData) {
  const response = await fetch('/api/v1/predict', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error(`ML Backend API Error: ${response.statusText}`);
  }
  return await response.json();
}
