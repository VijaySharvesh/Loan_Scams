import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { LenderList } from '../components/LenderList';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface Lender {
  id: string;
  name: string;
  imageUrl: string;
  details: {
    approvalDate?: string;
    rbiNumber?: string;
    warningType?: string;
    reportCount?: number;
  };
}

export function LenderVerification() {
  const [activeTab, setActiveTab] = useState<'verified' | 'scam'>('verified');
  const [verifiedLenders, setVerifiedLenders] = useState<Lender[]>([]);
  const [scamLenders, setScamLenders] = useState<Lender[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchLenders();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [location.search]);

  const fetchLenders = async () => {
    try {
      const [verifiedResponse, scamResponse] = await Promise.all([
        fetch('/api/lenders/verified'),
        fetch('/api/lenders/scams')
      ]);

      if (verifiedResponse.ok) {
        const verifiedData = await verifiedResponse.json();
        setVerifiedLenders(verifiedData);
      }

      if (scamResponse.ok) {
        const scamData = await scamResponse.json();
        setScamLenders(scamData);
      }
    } catch (error) {
      console.error('Error fetching lenders:', error);
    }
  };

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/lenders/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        const { verified, scams } = data;
        setVerifiedLenders(verified);
        setScamLenders(scams);
        setActiveTab(verified.length > 0 ? 'verified' : 'scam');
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Verify Your Lender
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Search our database of verified lenders and reported scams
        </p>
        <SearchBar />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for lenders...</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('verified')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Verified Lenders ({verifiedLenders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('scam')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === 'scam'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Reported Scams ({scamLenders.length})</span>
            </button>
          </div>

          {/* Lists */}
          {activeTab === 'verified' ? (
            <LenderList
              type="verified"
              lenders={verifiedLenders}
            />
          ) : (
            <LenderList
              type="scam"
              lenders={scamLenders}
            />
          )}

          {/* No Results Message */}
          {location.search && verifiedLenders.length === 0 && scamLenders.length === 0 && (
            <div className="text-center py-8">
              <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-700 mb-4">
                  We couldn't find any lenders matching your search. This could mean:
                </p>
                <ul className="text-gray-700 mb-4 list-disc list-inside">
                  <li>The lender hasn't been verified yet</li>
                  <li>No reports have been filed against this lender</li>
                  <li>The search terms might need to be more specific</li>
                </ul>
                <div className="space-y-4">
                  <Link
                    to="/report"
                    className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Report a Suspicious Lender
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}