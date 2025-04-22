import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TradingDashboard from './components/trading/TradingDashboard';
import ResearcherDashboard from './components/researcher/ResearcherDashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 mt-16">
            <Routes>
              <Route path="/" element={<TradingDashboard />} />
              <Route path="/researcher" element={<ResearcherDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;