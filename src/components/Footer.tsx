import React from 'react';
import { Shield, AlertTriangle, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Important Notice</h3>
            <div className="flex items-start text-sm text-gray-700 leading-relaxed">
              <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
              <p>This tool provides educational information only and does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers.</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Privacy & Security</h3>
            <div className="flex items-start text-sm text-gray-700 leading-relaxed">
              <Shield className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
              <p>Your health information is encrypted and protected with enterprise-grade security. We follow strict HIPAA compliance and never store personal health data.</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Emergency Resources</h3>
            <div className="space-y-3">
              <a href="tel:112" className="flex items-center text-sm text-red-600 hover:text-red-700 font-semibold transition-colors">
                <span>Emergency Services: 112</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-600 font-medium">
            © 2025 HealthCheck AI. Developed by <a href="https://www.linkedin.com/in/debarpan-das-75298a260" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors underline">Debarpan</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;