import React from 'react';
import { Heart, Shield, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">HealthCheck AI</h1>
                <p className="text-sm text-gray-600 font-medium">Smart Symptom Analysis</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center px-3 py-2 bg-green-50 rounded-full text-sm text-green-700 font-medium">
              <Shield className="w-4 h-4 mr-2" />
              <span>HIPAA Secure</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-red-50 rounded-full text-sm text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
              <Phone className="w-4 h-4 mr-2" />
              <span>Emergency: 112</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;