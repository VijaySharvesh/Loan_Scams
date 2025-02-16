import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LenderVerification } from './pages/LenderVerification';
import { LegalAssistance } from './pages/LegalAssistance';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Report } from './pages/Report';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<LenderVerification />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/legal-assistance" element={<LegalAssistance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;