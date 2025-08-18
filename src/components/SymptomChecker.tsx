import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, MapPin, Calendar, Phone, User, Clock, Star } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Condition {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  availableSlots: string[];
}

interface Disease {
  name: string;
  symptoms: string[];
  generalMedicines: string[];
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  whenToSeeDoctor: string;
}

const SymptomChecker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'analysis' | 'results' | 'doctors' | 'booking' | 'disease-lookup'>('input');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<Condition[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '', notes: '' });
  const [diseaseInput, setDiseaseInput] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  // Mock data - in real app, this would come from APIs
  const symptomSuggestions = [
    // Neurological Symptoms
    { id: '1', name: 'Headache', severity: 'mild' as const },
    { id: '2', name: 'Migraine', severity: 'moderate' as const },
    { id: '3', name: 'Dizziness', severity: 'moderate' as const },
    { id: '4', name: 'Memory loss', severity: 'moderate' as const },
    { id: '5', name: 'Confusion', severity: 'moderate' as const },
    { id: '6', name: 'Seizures', severity: 'severe' as const },
    { id: '7', name: 'Numbness in limbs', severity: 'moderate' as const },
    { id: '8', name: 'Tremors', severity: 'moderate' as const },
    { id: '9', name: 'Loss of coordination', severity: 'severe' as const },
    { id: '10', name: 'Blurred vision', severity: 'moderate' as const },
    
    // Respiratory Symptoms
    { id: '11', name: 'Cough', severity: 'mild' as const },
    { id: '12', name: 'Shortness of breath', severity: 'severe' as const },
    { id: '13', name: 'Wheezing', severity: 'moderate' as const },
    { id: '14', name: 'Chest tightness', severity: 'moderate' as const },
    { id: '15', name: 'Coughing up blood', severity: 'severe' as const },
    { id: '16', name: 'Sore throat', severity: 'mild' as const },
    { id: '17', name: 'Runny nose', severity: 'mild' as const },
    { id: '18', name: 'Sneezing', severity: 'mild' as const },
    { id: '19', name: 'Hoarse voice', severity: 'mild' as const },
    { id: '20', name: 'Difficulty swallowing', severity: 'moderate' as const },
    
    // Cardiovascular Symptoms
    { id: '21', name: 'Chest pain', severity: 'severe' as const },
    { id: '22', name: 'Heart palpitations', severity: 'moderate' as const },
    { id: '23', name: 'Rapid heartbeat', severity: 'moderate' as const },
    { id: '24', name: 'Irregular heartbeat', severity: 'moderate' as const },
    { id: '25', name: 'Swelling in legs', severity: 'moderate' as const },
    { id: '26', name: 'High blood pressure', severity: 'moderate' as const },
    { id: '27', name: 'Low blood pressure', severity: 'moderate' as const },
    { id: '28', name: 'Cold hands and feet', severity: 'mild' as const },
    
    // Gastrointestinal Symptoms
    { id: '29', name: 'Nausea', severity: 'moderate' as const },
    { id: '30', name: 'Vomiting', severity: 'moderate' as const },
    { id: '31', name: 'Diarrhea', severity: 'moderate' as const },
    { id: '32', name: 'Constipation', severity: 'mild' as const },
    { id: '33', name: 'Abdominal pain', severity: 'moderate' as const },
    { id: '34', name: 'Bloating', severity: 'mild' as const },
    { id: '35', name: 'Loss of appetite', severity: 'moderate' as const },
    { id: '36', name: 'Heartburn', severity: 'mild' as const },
    { id: '37', name: 'Blood in stool', severity: 'severe' as const },
    { id: '38', name: 'Black stool', severity: 'severe' as const },
    { id: '39', name: 'Excessive gas', severity: 'mild' as const },
    { id: '40', name: 'Acid reflux', severity: 'mild' as const },
    
    // Musculoskeletal Symptoms
    { id: '41', name: 'Joint pain', severity: 'moderate' as const },
    { id: '42', name: 'Muscle pain', severity: 'mild' as const },
    { id: '43', name: 'Back pain', severity: 'moderate' as const },
    { id: '44', name: 'Neck pain', severity: 'moderate' as const },
    { id: '45', name: 'Stiffness', severity: 'mild' as const },
    { id: '46', name: 'Swollen joints', severity: 'moderate' as const },
    { id: '47', name: 'Muscle weakness', severity: 'moderate' as const },
    { id: '48', name: 'Muscle cramps', severity: 'mild' as const },
    { id: '49', name: 'Bone pain', severity: 'moderate' as const },
    
    // General/Constitutional Symptoms
    { id: '50', name: 'Fever', severity: 'moderate' as const },
    { id: '51', name: 'Chills', severity: 'moderate' as const },
    { id: '52', name: 'Fatigue', severity: 'mild' as const },
    { id: '53', name: 'Weakness', severity: 'moderate' as const },
    { id: '54', name: 'Weight loss', severity: 'moderate' as const },
    { id: '55', name: 'Weight gain', severity: 'moderate' as const },
    { id: '56', name: 'Night sweats', severity: 'moderate' as const },
    { id: '57', name: 'Excessive sweating', severity: 'mild' as const },
    { id: '58', name: 'Sleep problems', severity: 'mild' as const },
    { id: '59', name: 'Loss of consciousness', severity: 'severe' as const },
    
    // Skin Symptoms
    { id: '60', name: 'Rash', severity: 'mild' as const },
    { id: '61', name: 'Itching', severity: 'mild' as const },
    { id: '62', name: 'Dry skin', severity: 'mild' as const },
    { id: '63', name: 'Skin discoloration', severity: 'moderate' as const },
    { id: '64', name: 'Bruising', severity: 'moderate' as const },
    { id: '65', name: 'Unusual moles', severity: 'moderate' as const },
    { id: '66', name: 'Hair loss', severity: 'mild' as const },
    { id: '67', name: 'Nail changes', severity: 'mild' as const },
    
    // Urinary/Reproductive Symptoms
    { id: '68', name: 'Frequent urination', severity: 'moderate' as const },
    { id: '69', name: 'Painful urination', severity: 'moderate' as const },
    { id: '70', name: 'Blood in urine', severity: 'severe' as const },
    { id: '71', name: 'Difficulty urinating', severity: 'moderate' as const },
    { id: '72', name: 'Pelvic pain', severity: 'moderate' as const },
    { id: '73', name: 'Irregular periods', severity: 'moderate' as const },
    { id: '74', name: 'Heavy menstrual bleeding', severity: 'moderate' as const },
    
    // Mental Health Symptoms
    { id: '75', name: 'Anxiety', severity: 'moderate' as const },
    { id: '76', name: 'Depression', severity: 'moderate' as const },
    { id: '77', name: 'Mood swings', severity: 'mild' as const },
    { id: '78', name: 'Irritability', severity: 'mild' as const },
    { id: '79', name: 'Panic attacks', severity: 'moderate' as const },
    { id: '80', name: 'Difficulty concentrating', severity: 'mild' as const },
    
    // Eye/Ear/Nose/Throat Symptoms
    { id: '81', name: 'Eye pain', severity: 'moderate' as const },
    { id: '82', name: 'Red eyes', severity: 'mild' as const },
    { id: '83', name: 'Ear pain', severity: 'moderate' as const },
    { id: '84', name: 'Hearing loss', severity: 'moderate' as const },
    { id: '85', name: 'Ringing in ears', severity: 'mild' as const },
    { id: '86', name: 'Nasal congestion', severity: 'mild' as const },
    { id: '87', name: 'Loss of smell', severity: 'moderate' as const },
    { id: '88', name: 'Loss of taste', severity: 'moderate' as const },
    
    // Endocrine Symptoms
    { id: '89', name: 'Excessive thirst', severity: 'moderate' as const },
    { id: '90', name: 'Excessive hunger', severity: 'moderate' as const },
    { id: '91', name: 'Heat intolerance', severity: 'mild' as const },
    { id: '92', name: 'Cold intolerance', severity: 'mild' as const },
    { id: '93', name: 'Changes in appetite', severity: 'mild' as const },
  ];

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      rating: 4.8,
      distance: '0.8 mi',
      address: '123 Health St, Medical District',
      phone: '(555) 123-4567',
      availableSlots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Emergency Medicine',
      rating: 4.9,
      distance: '1.2 mi',
      address: '456 Care Ave, Downtown',
      phone: '(555) 987-6543',
      availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM']
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Family Medicine',
      rating: 4.7,
      distance: '2.1 mi',
      address: '789 Wellness Blvd, Suburb',
      phone: '(555) 456-7890',
      availableSlots: ['8:30 AM', '12:00 PM', '2:30 PM', '4:00 PM']
    }
  ];

  // Disease database with symptoms and general medicines
  const diseaseDatabase: Disease[] = [
    {
      name: 'Common Cold',
      symptoms: ['Runny nose', 'Sneezing', 'Sore throat', 'Cough', 'Mild headache', 'Low-grade fever', 'Fatigue'],
      generalMedicines: ['Paracetamol', 'Ibuprofen', 'Throat lozenges', 'Decongestants', 'Cough syrup', 'Vitamin C'],
      description: 'A viral infection of the upper respiratory tract',
      severity: 'mild',
      whenToSeeDoctor: 'If symptoms persist for more than 10 days or worsen significantly'
    },
    {
      name: 'Influenza (Flu)',
      symptoms: ['High fever', 'Chills', 'Muscle aches', 'Fatigue', 'Headache', 'Dry cough', 'Sore throat'],
      generalMedicines: ['Paracetamol', 'Ibuprofen', 'Antiviral medications (Tamiflu)', 'Throat lozenges', 'Plenty of fluids'],
      description: 'A viral infection that attacks the respiratory system',
      severity: 'moderate',
      whenToSeeDoctor: 'If you have difficulty breathing, persistent chest pain, or high fever for more than 3 days'
    },
    {
      name: 'Migraine',
      symptoms: ['Severe headache', 'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 'Visual disturbances'],
      generalMedicines: ['Ibuprofen', 'Paracetamol', 'Aspirin', 'Sumatriptan', 'Anti-nausea medications'],
      description: 'A neurological condition causing severe headaches',
      severity: 'moderate',
      whenToSeeDoctor: 'If headaches become more frequent or severe, or if accompanied by neurological symptoms'
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      symptoms: ['Headaches', 'Dizziness', 'Blurred vision', 'Chest pain', 'Shortness of breath', 'Nosebleeds'],
      generalMedicines: ['ACE inhibitors', 'Beta-blockers', 'Diuretics', 'Calcium channel blockers'],
      description: 'A condition where blood pressure is consistently elevated',
      severity: 'moderate',
      whenToSeeDoctor: 'Regular monitoring required; seek immediate care if blood pressure is extremely high'
    },
    {
      name: 'Diabetes Type 2',
      symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing wounds', 'Weight loss'],
      generalMedicines: ['Metformin', 'Insulin', 'Sulfonylureas', 'DPP-4 inhibitors'],
      description: 'A metabolic disorder characterized by high blood sugar levels',
      severity: 'moderate',
      whenToSeeDoctor: 'Regular monitoring required; seek care if blood sugar levels are uncontrolled'
    },
    {
      name: 'Asthma',
      symptoms: ['Shortness of breath', 'Wheezing', 'Chest tightness', 'Coughing', 'Difficulty breathing'],
      generalMedicines: ['Bronchodilators (Albuterol)', 'Inhaled corticosteroids', 'Leukotriene modifiers'],
      description: 'A respiratory condition where airways narrow and swell',
      severity: 'moderate',
      whenToSeeDoctor: 'If experiencing severe breathing difficulties or frequent attacks'
    },
    {
      name: 'Gastroenteritis',
      symptoms: ['Diarrhea', 'Vomiting', 'Nausea', 'Abdominal cramps', 'Fever', 'Dehydration'],
      generalMedicines: ['Oral rehydration salts', 'Loperamide', 'Probiotics', 'Paracetamol for fever'],
      description: 'Inflammation of the stomach and intestines',
      severity: 'moderate',
      whenToSeeDoctor: 'If severe dehydration, blood in stool, or symptoms persist for more than 3 days'
    },
    {
      name: 'Arthritis',
      symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion', 'Warmth around joints'],
      generalMedicines: ['NSAIDs (Ibuprofen)', 'Topical pain relievers', 'Corticosteroids', 'Disease-modifying drugs'],
      description: 'Inflammation of one or more joints',
      severity: 'moderate',
      whenToSeeDoctor: 'If joint pain is severe or interferes with daily activities'
    },
    {
      name: 'Depression',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep disturbances', 'Appetite changes', 'Difficulty concentrating'],
      generalMedicines: ['Antidepressants (SSRIs)', 'Therapy', 'Lifestyle changes', 'Support groups'],
      description: 'A mental health disorder characterized by persistent sadness',
      severity: 'moderate',
      whenToSeeDoctor: 'If experiencing thoughts of self-harm or if symptoms interfere with daily life'
    },
    {
      name: 'Anxiety Disorder',
      symptoms: ['Excessive worry', 'Restlessness', 'Fatigue', 'Difficulty concentrating', 'Muscle tension', 'Sleep problems'],
      generalMedicines: ['Anti-anxiety medications', 'Beta-blockers', 'Therapy', 'Relaxation techniques'],
      description: 'A mental health condition characterized by excessive worry',
      severity: 'moderate',
      whenToSeeDoctor: 'If anxiety interferes with daily activities or causes panic attacks'
    },
    {
      name: 'Pneumonia',
      symptoms: ['Cough with phlegm', 'Fever', 'Chills', 'Shortness of breath', 'Chest pain', 'Fatigue'],
      generalMedicines: ['Antibiotics', 'Pain relievers', 'Cough medicine', 'Fever reducers'],
      description: 'An infection that inflames air sacs in lungs',
      severity: 'severe',
      whenToSeeDoctor: 'Seek immediate medical attention, especially if breathing difficulties occur'
    },
    {
      name: 'Urinary Tract Infection (UTI)',
      symptoms: ['Burning sensation during urination', 'Frequent urination', 'Cloudy urine', 'Pelvic pain', 'Strong-smelling urine'],
      generalMedicines: ['Antibiotics', 'Pain relievers', 'Increased fluid intake', 'Cranberry supplements'],
      description: 'An infection in any part of the urinary system',
      severity: 'moderate',
      whenToSeeDoctor: 'If symptoms persist or worsen, or if fever develops'
    },
    {
      name: 'Eczema',
      symptoms: ['Itchy skin', 'Red patches', 'Dry skin', 'Skin inflammation', 'Cracked skin'],
      generalMedicines: ['Topical corticosteroids', 'Moisturizers', 'Antihistamines', 'Calcineurin inhibitors'],
      description: 'A condition that makes skin red and itchy',
      severity: 'mild',
      whenToSeeDoctor: 'If symptoms are severe or don\'t respond to over-the-counter treatments'
    },
    {
      name: 'Acid Reflux (GERD)',
      symptoms: ['Heartburn', 'Acid regurgitation', 'Chest pain', 'Difficulty swallowing', 'Chronic cough'],
      generalMedicines: ['Antacids', 'H2 blockers', 'Proton pump inhibitors', 'Lifestyle modifications'],
      description: 'A digestive disorder where stomach acid flows back into the esophagus',
      severity: 'mild',
      whenToSeeDoctor: 'If symptoms occur frequently or interfere with daily life'
    },
    {
      name: 'Insomnia',
      symptoms: ['Difficulty falling asleep', 'Frequent waking', 'Early morning awakening', 'Daytime fatigue', 'Irritability'],
      generalMedicines: ['Sleep aids', 'Melatonin', 'Relaxation techniques', 'Sleep hygiene practices'],
      description: 'A sleep disorder characterized by difficulty sleeping',
      severity: 'mild',
      whenToSeeDoctor: 'If sleep problems persist for more than a few weeks'
    }
  ];

  const searchDisease = (query: string) => {
    return diseaseDatabase.find(disease => 
      disease.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredDiseases = diseaseDatabase.filter(disease =>
    disease.name.toLowerCase().includes(diseaseInput.toLowerCase())
  );

  const addSymptom = (symptom: Symptom) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput('');
    }
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const analyzeSymptoms = () => {
    setCurrentStep('analysis');
    // Simulate AI analysis
    setTimeout(() => {
      // Enhanced AI analysis based on selected symptoms
      const mockResults: Condition[] = generateDiagnosisResults(selectedSymptoms);
      setAnalysisResults(mockResults);
      setCurrentStep('results');
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Enhanced AI diagnosis generator based on symptoms
  const generateDiagnosisResults = (symptoms: Symptom[]): Condition[] => {
    const symptomNames = symptoms.map(s => s.name.toLowerCase());
    const hasHighSeverity = symptoms.some(s => s.severity === 'severe');
    const hasModerateSeverity = symptoms.some(s => s.severity === 'moderate');
    
    let possibleConditions: Condition[] = [];
    
    // Respiratory conditions
    if (symptomNames.some(s => ['cough', 'shortness of breath', 'chest tightness', 'wheezing'].includes(s))) {
      if (symptomNames.includes('shortness of breath') || symptomNames.includes('chest pain')) {
        possibleConditions.push({
          name: 'Asthma',
          confidence: 75,
          severity: 'medium',
          description: 'Chronic respiratory condition causing airway inflammation',
          recommendations: ['Use prescribed inhaler', 'Avoid triggers', 'Seek immediate care if severe']
        });
      }
      if (symptomNames.includes('fever') || symptomNames.includes('cough')) {
        possibleConditions.push({
          name: 'Pneumonia',
          confidence: 65,
          severity: hasHighSeverity ? 'high' : 'medium',
          description: 'Infection that inflames air sacs in lungs',
          recommendations: ['Seek medical attention', 'Rest and hydration', 'Complete prescribed antibiotics']
        });
      }
    }
    
    // Cardiovascular conditions
    if (symptomNames.some(s => ['chest pain', 'heart palpitations', 'shortness of breath', 'swelling in legs'].includes(s))) {
      if (symptomNames.includes('chest pain')) {
        possibleConditions.push({
          name: 'Angina',
          confidence: 70,
          severity: 'high',
          description: 'Chest pain due to reduced blood flow to heart',
          recommendations: ['Seek immediate medical attention', 'Rest', 'Take prescribed nitroglycerin if available']
        });
      }
      if (symptomNames.includes('heart palpitations') || symptomNames.includes('rapid heartbeat')) {
        possibleConditions.push({
          name: 'Arrhythmia',
          confidence: 60,
          severity: 'medium',
          description: 'Irregular heart rhythm',
          recommendations: ['Monitor symptoms', 'Avoid caffeine', 'Consult cardiologist']
        });
      }
    }
    
    // Gastrointestinal conditions
    if (symptomNames.some(s => ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'].includes(s))) {
      if (symptomNames.includes('diarrhea') && symptomNames.includes('vomiting')) {
        possibleConditions.push({
          name: 'Gastroenteritis',
          confidence: 80,
          severity: 'medium',
          description: 'Inflammation of stomach and intestines',
          recommendations: ['Stay hydrated', 'BRAT diet', 'Rest', 'Seek care if dehydration occurs']
        });
      }
      if (symptomNames.includes('abdominal pain') && symptomNames.includes('nausea')) {
        possibleConditions.push({
          name: 'Appendicitis',
          confidence: 55,
          severity: 'high',
          description: 'Inflammation of the appendix',
          recommendations: ['Seek immediate medical attention', 'Do not eat or drink', 'Go to emergency room']
        });
      }
    }
    
    // Neurological conditions
    if (symptomNames.some(s => ['headache', 'dizziness', 'confusion', 'memory loss'].includes(s))) {
      if (symptomNames.includes('headache') && symptomNames.includes('fever')) {
        possibleConditions.push({
          name: 'Meningitis',
          confidence: 45,
          severity: 'high',
          description: 'Inflammation of protective membranes covering brain and spinal cord',
          recommendations: ['Seek immediate emergency care', 'Do not delay treatment', 'Call 112']
        });
      }
      if (symptomNames.includes('migraine') || (symptomNames.includes('headache') && symptomNames.includes('nausea'))) {
        possibleConditions.push({
          name: 'Migraine',
          confidence: 85,
          severity: 'medium',
          description: 'Severe headache often with nausea and light sensitivity',
          recommendations: ['Rest in dark room', 'Apply cold compress', 'Take prescribed medication']
        });
      }
    }
    
    // Infectious diseases
    if (symptomNames.includes('fever')) {
      if (symptomNames.some(s => ['cough', 'sore throat', 'runny nose'].includes(s))) {
        possibleConditions.push({
          name: 'Common Cold',
          confidence: 90,
          severity: 'low',
          description: 'Viral upper respiratory tract infection',
          recommendations: ['Rest and hydration', 'Over-the-counter pain relievers', 'Monitor symptoms']
        });
      }
      if (symptomNames.some(s => ['muscle pain', 'fatigue', 'chills'].includes(s))) {
        possibleConditions.push({
          name: 'Influenza',
          confidence: 75,
          severity: 'medium',
          description: 'Seasonal flu virus infection',
          recommendations: ['Antiviral medication within 48 hours', 'Complete rest', 'Increase fluid intake']
        });
      }
    }
    
    // Musculoskeletal conditions
    if (symptomNames.some(s => ['joint pain', 'muscle pain', 'stiffness', 'swollen joints'].includes(s))) {
      if (symptomNames.includes('joint pain') && symptomNames.includes('stiffness')) {
        possibleConditions.push({
          name: 'Arthritis',
          confidence: 70,
          severity: 'medium',
          description: 'Inflammation of joints causing pain and stiffness',
          recommendations: ['Anti-inflammatory medication', 'Gentle exercise', 'Heat/cold therapy']
        });
      }
      if (symptomNames.includes('muscle pain') && symptomNames.includes('fatigue')) {
        possibleConditions.push({
          name: 'Fibromyalgia',
          confidence: 55,
          severity: 'medium',
          description: 'Chronic condition causing widespread muscle pain',
          recommendations: ['Regular exercise', 'Stress management', 'Sleep hygiene', 'Pain management']
        });
      }
    }
    
    // Mental health conditions
    if (symptomNames.some(s => ['anxiety', 'depression', 'panic attacks', 'mood swings'].includes(s))) {
      if (symptomNames.includes('anxiety') || symptomNames.includes('panic attacks')) {
        possibleConditions.push({
          name: 'Anxiety Disorder',
          confidence: 80,
          severity: 'medium',
          description: 'Mental health condition characterized by excessive worry',
          recommendations: ['Breathing exercises', 'Professional counseling', 'Stress reduction techniques']
        });
      }
      if (symptomNames.includes('depression') || symptomNames.includes('mood swings')) {
        possibleConditions.push({
          name: 'Depression',
          confidence: 75,
          severity: 'medium',
          description: 'Mental health disorder causing persistent sadness',
          recommendations: ['Professional therapy', 'Support groups', 'Regular exercise', 'Medication if needed']
        });
      }
    }
    
    // Endocrine conditions
    if (symptomNames.some(s => ['excessive thirst', 'frequent urination', 'weight loss', 'fatigue'].includes(s))) {
      if (symptomNames.includes('excessive thirst') && symptomNames.includes('frequent urination')) {
        possibleConditions.push({
          name: 'Diabetes',
          confidence: 70,
          severity: 'medium',
          description: 'Condition affecting blood sugar regulation',
          recommendations: ['Blood sugar testing', 'Dietary changes', 'Medical evaluation', 'Regular monitoring']
        });
      }
    }
    
    // Skin conditions
    if (symptomNames.some(s => ['rash', 'itching', 'skin discoloration'].includes(s))) {
      if (symptomNames.includes('rash') && symptomNames.includes('itching')) {
        possibleConditions.push({
          name: 'Eczema',
          confidence: 65,
          severity: 'low',
          description: 'Chronic skin condition causing inflammation and itching',
          recommendations: ['Moisturize regularly', 'Avoid triggers', 'Topical treatments', 'Dermatologist consultation']
        });
      }
    }
    
    // Default fallback conditions if no specific matches
    if (possibleConditions.length === 0) {
      possibleConditions.push({
        name: 'General Malaise',
        confidence: 60,
        severity: hasModerateSeverity ? 'medium' : 'low',
        description: 'General feeling of discomfort or illness',
        recommendations: ['Rest and hydration', 'Monitor symptoms', 'Consult healthcare provider if symptoms persist']
      });
    }
    
    // Sort by confidence and return top 3
    return possibleConditions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  };
  const getUrgencyRecommendation = () => {
    const highSeveritySymptoms = selectedSymptoms.filter(s => s.severity === 'severe').length;
    const topCondition = analysisResults[0];
    
    if (highSeveritySymptoms > 0 || (topCondition && topCondition.severity === 'high')) {
      return {
        level: 'urgent',
        message: 'Seek immediate medical attention',
        color: 'bg-red-500 text-white'
      };
    } else if (topCondition && topCondition.severity === 'medium') {
      return {
        level: 'moderate',
        message: 'Schedule appointment within 24-48 hours',
        color: 'bg-yellow-500 text-white'
      };
    } else {
      return {
        level: 'routine',
        message: 'Consider routine consultation if symptoms persist',
        color: 'bg-green-500 text-white'
      };
    }
  };

  const filteredSuggestions = symptomSuggestions.filter(symptom =>
    symptom.name.toLowerCase().includes(symptomInput.toLowerCase()) &&
    !selectedSymptoms.find(s => s.id === symptom.id)
  );

  if (currentStep === 'input') {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl mb-6 shadow-lg">
            <Search className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Smart Symptom Checker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">AI-powered health analysis to guide your care decisions with confidence and precision</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setCurrentStep('input')}
              className="px-6 py-3 rounded-xl font-semibold text-blue-600 bg-blue-50 border border-blue-200 mr-2"
            >
              Symptom Analysis
            </button>
            <button
              onClick={() => setCurrentStep('disease-lookup')}
              className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Disease Lookup
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What symptoms are you experiencing?</h2>
          
          <div className="relative mb-8">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Type a symptom (e.g., headache, chest pain, nausea, joint pain)"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg bg-gray-50 focus:bg-white transition-all duration-200 shadow-sm"
            />
            {filteredSuggestions.length > 0 && symptomInput && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto">
                {filteredSuggestions.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => addSymptom(symptom)}
                    className="w-full px-6 py-4 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{symptom.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                        symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {symptom.severity}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedSymptoms.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected symptoms:</h3>
              <div className="flex flex-wrap gap-3">
                {selectedSymptoms.map((symptom) => (
                  <span
                    key={symptom.id}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold shadow-sm border border-blue-200"
                  >
                    {symptom.name}
                    <button
                      onClick={() => removeSymptom(symptom.id)}
                      className="ml-2 text-blue-600 hover:text-blue-800 font-bold text-lg"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 mr-4 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-bold mb-2 text-base">Important Notice</p>
                <p className="leading-relaxed">This AI-powered tool analyzes 90+ symptoms to predict possible conditions. It provides educational information only and is not a substitute for professional medical advice. Always consult healthcare providers for medical concerns.</p>
              </div>
            </div>
          </div>

          <button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Analyze Symptoms ({selectedSymptoms.length})
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'disease-lookup') {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl mb-6 shadow-lg">
            <Search className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Disease Information Lookup</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Search for any disease to learn about its symptoms and general treatment options</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setCurrentStep('input')}
              className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors mr-2"
            >
              Symptom Analysis
            </button>
            <button
              onClick={() => setCurrentStep('disease-lookup')}
              className="px-6 py-3 rounded-xl font-semibold text-green-600 bg-green-50 border border-green-200"
            >
              Disease Lookup
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Search for Disease Information</h2>
          
          <div className="relative mb-8">
            <input
              type="text"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)}
              placeholder="Type a disease name (e.g., diabetes, asthma, migraine, depression)"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none text-lg bg-gray-50 focus:bg-white transition-all duration-200 shadow-sm"
            />
            {filteredDiseases.length > 0 && diseaseInput && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto">
                {filteredDiseases.map((disease, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDisease(disease);
                      setDiseaseInput(disease.name);
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-green-50 focus:bg-green-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{disease.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        disease.severity === 'mild' ? 'bg-green-100 text-green-800' :
                        disease.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {disease.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{disease.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedDisease && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedDisease.name}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{selectedDisease.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedDisease.severity === 'mild' ? 'bg-green-100 text-green-800' :
                    selectedDisease.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedDisease.severity} condition
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-3" />
                    Common Symptoms
                  </h4>
                  <ul className="space-y-2">
                    {selectedDisease.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-center text-blue-800">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    General Medicines & Treatments
                  </h4>
                  <ul className="space-y-2">
                    {selectedDisease.generalMedicines.map((medicine, index) => (
                      <li key={index} className="flex items-center text-purple-800">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        {medicine}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-amber-900 mb-2">When to See a Doctor</h4>
                    <p className="text-amber-800 leading-relaxed">{selectedDisease.whenToSeeDoctor}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 mr-4 flex-shrink-0" />
                  <div className="text-sm text-red-900">
                    <p className="font-bold mb-2 text-base">Medical Disclaimer</p>
                    <p className="leading-relaxed">This information is for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for proper diagnosis and treatment. Do not self-medicate based on this information.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedDisease && diseaseInput && filteredDiseases.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Disease Not Found</h3>
              <p className="text-gray-500">Try searching for a different disease name or check the spelling.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 'analysis') {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-8 shadow-lg">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Analyzing Your Symptoms</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">Our advanced AI is processing your symptoms and comparing them against comprehensive medical databases...</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const urgency = getUrgencyRecommendation();
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Based on your symptoms, here are the most likely conditions with confidence ratings</p>
          </div>

          <div className={`rounded-2xl p-6 mb-8 ${urgency.color} shadow-lg`}>
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-4" />
              <span className="font-bold text-lg">{urgency.message}</span>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            {analysisResults.map((condition, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{condition.name}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{condition.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600 mb-1">{condition.confidence}%</div>
                    <div className="text-sm text-gray-600 font-medium mb-3">Confidence</div>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getSeverityColor(condition.severity)}`}>
                      {condition.severity} risk
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${condition.confidence}%` }}
                  ></div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                    {condition.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setCurrentStep('doctors')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Find Nearby Doctors
            </button>
            <button
              onClick={() => setCurrentStep('input')}
              className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 py-4 px-8 rounded-2xl font-bold text-lg hover:from-gray-300 hover:to-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'doctors') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Nearby Healthcare Providers</h2>
          <p className="text-gray-600">Based on your location and symptoms</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {mockDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{doctor.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{doctor.distance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{doctor.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{doctor.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Available Today:</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {slot}
                      </span>
                    ))}
                    {doctor.availableSlots.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{doctor.availableSlots.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setCurrentStep('booking');
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-200 rounded-xl p-6 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">Showing healthcare providers within 5 miles</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setCurrentStep('results')}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'booking' && selectedDoctor) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Book Appointment</h2>
            <p className="text-gray-600">Schedule with {selectedDoctor.name}</p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <User className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium">{selectedDoctor.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{selectedDoctor.address}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
              <div className="grid grid-cols-2 gap-3">
                {selectedDoctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setBookingData({...bookingData, time: slot})}
                    className={`px-4 py-3 border rounded-lg text-center transition-colors ${
                      bookingData.time === slot
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
              <textarea
                value={bookingData.notes}
                onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                placeholder="Describe your symptoms or concerns..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                <p><strong>Date:</strong> {bookingData.date || 'Not selected'}</p>
                <p><strong>Time:</strong> {bookingData.time || 'Not selected'}</p>
                <p><strong>Location:</strong> {selectedDoctor.address}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  alert('Appointment booked successfully! You will receive a confirmation email shortly.');
                  setCurrentStep('input');
                  setSelectedSymptoms([]);
                  setAnalysisResults([]);
                  setSelectedDoctor(null);
                  setBookingData({ date: '', time: '', notes: '' });
                }}
                disabled={!bookingData.date || !bookingData.time}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Appointment
              </button>
              <button
                onClick={() => setCurrentStep('doctors')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors"
              >
                Back to Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SymptomChecker;