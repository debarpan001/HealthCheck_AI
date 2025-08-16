import React from 'react';
import Header from './components/Header';
import SymptomChecker from './components/SymptomChecker';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="py-12">
        <SymptomChecker />
      </main>
      <Footer />
    </div>
  );
}

export default App;