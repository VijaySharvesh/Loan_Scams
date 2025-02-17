import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { LenderList } from '../components/LenderList';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export function LenderVerification() {
  const [activeTab, setActiveTab] = useState<'verified' | 'scam'>('verified');
  const [verifiedLenders, setVerifiedLenders] = useState([]);
  const [scamLenders, setScamLenders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchLenders = async () => {
      try {
        const [lendersRes, reportsRes] = await Promise.all([
          fetch('http://localhost:5000/api/lenders'),
          fetch('http://localhost:5000/api/reports')
        ]);

        if (lendersRes.ok) setVerifiedLenders(await lendersRes.json());
        if (reportsRes.ok) setScamLenders(await reportsRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLenders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-center text-3xl font-bold mb-4">Lender Verification</h2>
      <SearchBar />
      <div className="flex space-x-4 my-6">
        {['verified', 'scam'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab === 'verified' ? <ShieldCheck /> : <AlertTriangle />} {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'verified' ? verifiedLenders.length : scamLenders.length})
          </button>
        ))}
      </div>
      <LenderList type={activeTab} lenders={activeTab === 'verified' ? verifiedLenders : scamLenders} />
    </div>
  );
}
