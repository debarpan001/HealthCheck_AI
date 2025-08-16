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

const SymptomChecker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'analysis' | 'results' | 'doctors' | 'booking'>('input');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<Condition[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '', notes: '' });

  // Mock data - in real app, this would come from APIs
  const symptomSuggestions = [
    { id: '1', name: 'Headache', severity: 'mild' as const },
    { id: '2', name: 'Fever', severity: 'moderate' as const },
    { id: '3', name: 'Chest pain', severity: 'severe' as const },
    { id: '4', name: 'Cough', severity: 'mild' as const },
    { id: '5', name: 'Nausea', severity: 'moderate' as const },
    { id: '6', name: 'Dizziness', severity: 'moderate' as const },
    { id: '7', name: 'Shortness of breath', severity: 'severe' as const },
    { id: '8', name: 'Fatigue', severity: 'mild' as const },
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
      const mockResults: Condition[] = [
        {
          name: 'Common Cold',
          confidence: 85,
          severity: 'low',
          description: 'Viral upper respiratory tract infection',
          recommendations: ['Rest and hydration', 'Over-the-counter pain relievers', 'Monitor symptoms']
        },
        {
          name: 'Influenza',
          confidence: 60,
          severity: 'medium',
          description: 'Seasonal flu virus infection',
          recommendations: ['Antiviral medication', 'Complete rest', 'See healthcare provider if symptoms worsen']
        },
        {
          name: 'Sinusitis',
          confidence: 45,
          severity: 'medium',
          description: 'Inflammation of the sinus cavities',
          recommendations: ['Nasal decongestants', 'Warm compresses', 'Consider antibiotic consultation']
        }
      ];
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

        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What symptoms are you experiencing?</h2>
          
          <div className="relative mb-8">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Type a symptom (e.g., headache, fever, cough)"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg bg-gray-50 focus:bg-white transition-all duration-200 shadow-sm"
            />
            {filteredSuggestions.length > 0 && symptomInput && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
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
                <p className="leading-relaxed">This tool provides educational information only and is not a substitute for professional medical advice. Always consult healthcare providers for medical concerns.</p>
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