import React, { useState } from 'react';
import { Shield, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface LenderCardProps {
  name: string;
  imageUrl: string;
  isVerified: boolean;
  details?: {
    approvalDate?: string;
    rbiNumber?: string;
    warningType?: string;
    reportCount?: number;
  };
  onVerify?: () => void;
}

export function LenderCard({ name, imageUrl, isVerified, details = {}, onVerify }: LenderCardProps) {
  const {
    rbiNumber = 'N/A',
    approvalDate = 'N/A',
    warningType = 'N/A',
    reportCount = 0,
  } = details;

  const handleVerify = () => {
    if (onVerify) onVerify();
  };

  return (
    <div
      className={cn(
        'flex items-start gap-6 p-6 rounded-lg border',
        isVerified ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
      )}
    >
      <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {isVerified ? (
            <Shield className="text-green-600 h-5 w-5" />
          ) : (
            <ShieldAlert className="text-red-600 h-5 w-5" />
          )}
        </div>

        {isVerified ? (
          <div className="space-y-1">
            <p className="text-green-700 font-medium">✓ Verified & Authorized by RBI</p>
            <p className="text-sm text-gray-600">RBI Approval: {rbiNumber}</p>
            <p className="text-sm text-gray-600">Verification Date: {approvalDate}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-red-700 font-medium">⚠ Fraudulent Lender</p>
            <p className="text-sm text-gray-600">Warning Type: {warningType}</p>
            <p className="text-sm text-gray-600">Reports: {reportCount}</p>
            <button onClick={handleVerify} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Verify Lender
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
