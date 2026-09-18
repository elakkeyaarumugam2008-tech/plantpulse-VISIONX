// Demo data and realistic presets for PlantPulse prototype with local bundled image assets

import tomatoImg from '../assets/samples/tomato-early-blight.png';
import potatoImg from '../assets/samples/potato-late-blight.png';
import pepperImg from '../assets/samples/bell-pepper-leaf-spot.png';
import appleImg from '../assets/samples/apple-healthy.png';

export const SAMPLE_IMAGES = {
  tomato: tomatoImg,
  potato: potatoImg,
  pepper: pepperImg,
  apple: appleImg
};

export const DEMO_PRESETS = [
  {
    id: 'preset-early-blight',
    name: 'Tomato Leaf — Early Blight',
    crop: 'Tomato',
    targetDisease: 'Early Blight',
    description: 'Target-like concentric ring brown lesions with yellow halo.',
    imageUrl: tomatoImg,
    fallbackColor: '#3F6212'
  },
  {
    id: 'preset-late-blight',
    name: 'Potato Leaf — Late Blight',
    crop: 'Potato',
    targetDisease: 'Late Blight',
    description: 'Dark water-soaked lesions with pale green borders.',
    imageUrl: potatoImg,
    fallbackColor: '#1E3A8A'
  },
  {
    id: 'preset-leaf-spot',
    name: 'Bell Pepper — Leaf Spot',
    crop: 'Bell Pepper',
    targetDisease: 'Leaf Spot',
    description: 'Small circular greyish-brown spots across leaf blade.',
    imageUrl: pepperImg,
    fallbackColor: '#854D0E'
  },
  {
    id: 'preset-healthy',
    name: 'Healthy Apple Leaf',
    crop: 'Apple',
    targetDisease: 'Healthy',
    description: 'Vibrant green surface with zero visible necrotic lesions.',
    imageUrl: appleImg,
    fallbackColor: '#15803D'
  }
];

export const DEMO_TIMELINE_HISTORY = [
  {
    id: 'scan-01',
    scanId: 'PL-088',
    date: 'Sep 18, 2026',
    displayDate: 'SEP 18',
    severity: 'Low',
    severityScore: 25,
    lesionCoverage: '8%',
    disease: 'Early Blight',
    confidence: '91%',
    thumbnail: tomatoImg,
    notes: 'Isolated brown spot detected on lower left margin.'
  },
  {
    id: 'scan-02',
    scanId: 'PL-094',
    date: 'Sep 21, 2026',
    displayDate: 'SEP 21',
    severity: 'Moderate',
    severityScore: 58,
    lesionCoverage: '22%',
    disease: 'Early Blight',
    confidence: '93%',
    thumbnail: tomatoImg,
    notes: 'Concentric ring pattern expanding. Chlorotic halo visible.'
  },
  {
    id: 'scan-03',
    scanId: 'PL-101',
    date: 'Sep 24, 2026',
    displayDate: 'SEP 24',
    severity: 'High',
    severityScore: 84,
    lesionCoverage: '45%',
    disease: 'Early Blight',
    confidence: '95%',
    thumbnail: tomatoImg,
    notes: 'Multiple coalescing lesions. Leaf yellowing spreading to vein structure.'
  }
];

export const DISEASE_CATALOG = {
  'Early Blight': {
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    severity: 'Moderate',
    defaultConfidence: 0.94,
    scanId: 'PL-001',
    defaultImage: tomatoImg,
    characteristics: {
      lesions: true,
      discoloration: true,
      textureVariation: true,
      shapeAnomaly: false
    },
    observedFeatures: [
      { name: 'Lesion patterns', status: 'Detected', detail: 'Concentric ring brown spots' },
      { name: 'Discoloration', status: 'Detected', detail: 'Chlorotic yellow halo perimeter' },
      { name: 'Texture variation', status: 'Detected', detail: 'Desiccated surface roughness' },
      { name: 'Shape anomaly', status: 'Low', detail: 'Normal leaf boundary geometry' }
    ],
    explanationText: 'The prediction is based on visible dark brown necrotic lesions featuring characteristic target-like concentric rings surrounded by a distinct yellow chlorotic halo.',
    heatmapOverlay: {
      lesions: [
        { x: 38, y: 42, radius: 24, intensity: 0.9, label: 'Primary Lesion' },
        { x: 62, y: 55, radius: 18, intensity: 0.8, label: 'Secondary Lesion' }
      ],
      discoloration: [
        { x: 45, y: 48, radius: 45, intensity: 0.6, label: 'Chlorosis Zone' }
      ],
      texture: [
        { x: 40, y: 45, width: 35, height: 35, label: 'Desiccated Tissue' }
      ]
    },
    monitoringItems: [
      'Increase in lesion diameter (> 5mm)',
      'Expansion of yellowing chlorotic border',
      'Spread of dark spots to adjacent leaves'
    ],
    nextSteps: 'Perform another scan after 3 days. Ensure leaf surfaces remain dry and improve air ventilation around lower canopy foliage.'
  },

  'Late Blight': {
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    severity: 'High',
    defaultConfidence: 0.96,
    scanId: 'PL-002',
    defaultImage: potatoImg,
    characteristics: {
      lesions: true,
      discoloration: true,
      textureVariation: true,
      shapeAnomaly: true
    },
    observedFeatures: [
      { name: 'Lesion patterns', status: 'Detected', detail: 'Dark water-soaked blotches' },
      { name: 'Discoloration', status: 'Detected', detail: 'Dark brown necrotic tissue' },
      { name: 'Texture variation', status: 'Detected', detail: 'Slight white fungal fuzz underneath' },
      { name: 'Shape anomaly', status: 'Moderate', detail: 'Curled leaf margins' }
    ],
    explanationText: 'Prediction driven by rapidly expanding dark water-soaked leaf blotches with pale green margins and necrotic tissue breakdown.',
    heatmapOverlay: {
      lesions: [
        { x: 30, y: 35, radius: 32, intensity: 0.95, label: 'Water-soaked lesion' },
        { x: 68, y: 60, radius: 28, intensity: 0.85, label: 'Blotch zone' }
      ],
      discoloration: [
        { x: 50, y: 45, radius: 55, intensity: 0.7, label: 'Necrotic margin' }
      ],
      texture: [
        { x: 32, y: 38, width: 40, height: 40, label: 'Mildew edge' }
      ]
    },
    monitoringItems: [
      'Rapid lesion expansion within 24-48 hours',
      'Presence of whitish sporulation under damp conditions',
      'Stem and petiole darkening'
    ],
    nextSteps: 'High priority alert. Isolate infected plant. Avoid overhead irrigation and re-scan in 48 hours.'
  },

  'Leaf Spot': {
    name: 'Leaf Spot',
    scientificName: 'Cercospora / Septoria spp.',
    severity: 'Low',
    defaultConfidence: 0.89,
    scanId: 'PL-003',
    defaultImage: pepperImg,
    characteristics: {
      lesions: true,
      discoloration: false,
      textureVariation: true,
      shapeAnomaly: false
    },
    observedFeatures: [
      { name: 'Lesion patterns', status: 'Detected', detail: 'Small circular grey/brown specks' },
      { name: 'Discoloration', status: 'Low', detail: 'Minimal chlorosis' },
      { name: 'Texture variation', status: 'Detected', detail: 'Pitted surface spots' },
      { name: 'Shape anomaly', status: 'Low', detail: 'Intact leaf structure' }
    ],
    explanationText: 'Prediction based on multiple small scattered circular necrotic spots with dark borders evenly distributed across leaf surface.',
    heatmapOverlay: {
      lesions: [
        { x: 25, y: 30, radius: 12, intensity: 0.75, label: 'Spot cluster A' },
        { x: 55, y: 40, radius: 14, intensity: 0.8, label: 'Spot cluster B' },
        { x: 70, y: 65, radius: 10, intensity: 0.7, label: 'Spot cluster C' }
      ],
      discoloration: [
        { x: 50, y: 50, radius: 30, intensity: 0.3, label: 'Mild halo' }
      ],
      texture: [
        { x: 50, y: 45, width: 30, height: 30, label: 'Pitted surface' }
      ]
    },
    monitoringItems: [
      'Merging of individual spots into larger necrotic blocks',
      'Premature leaf yellowing or drop',
      'Appearance of spots on new upper shoots'
    ],
    nextSteps: 'Monitor weekly. Prune heavily spotted lower foliage to prevent fungal spore splash.'
  },

  'Healthy': {
    name: 'Healthy',
    scientificName: 'Normal Physiology',
    severity: 'None',
    defaultConfidence: 0.98,
    scanId: 'PL-000',
    defaultImage: appleImg,
    characteristics: {
      lesions: false,
      discoloration: false,
      textureVariation: false,
      shapeAnomaly: false
    },
    observedFeatures: [
      { name: 'Lesion patterns', status: 'None', detail: 'Zero necrotic spots detected' },
      { name: 'Discoloration', status: 'None', detail: 'Uniform chlorophyll distribution' },
      { name: 'Texture variation', status: 'None', detail: 'Smooth cuticular wax layer' },
      { name: 'Shape anomaly', status: 'None', detail: 'Symmetrical healthy leaf blade' }
    ],
    explanationText: 'The classifier detected optimal green color uniformity, crisp vein definition, and absence of visual lesion features.',
    heatmapOverlay: {
      lesions: [],
      discoloration: [],
      texture: []
    },
    monitoringItems: [
      'Maintain routine watering and fertilization schedule',
      'Check underside of leaves periodically for pests',
      'Scan monthly for baseline health tracking'
    ],
    nextSteps: 'No action required. Plant exhibits vigorous health characteristics.'
  }
};
