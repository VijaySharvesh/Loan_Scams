import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface LenderCardProps {
  name: string;
  imageUrl: string;
  isVerified: boolean;
  details: {
    approvalDate?: string;
    rbiNumber?: string;
    warningType?: string;
    reportCount?: number;
  };
}

export function LenderCard({ name, imageUrl, isVerified, details }: LenderCardProps) {
  return (
    <div className={cn(
      "flex items-start gap-6 p-6 rounded-lg border",
      isVerified ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
    )}>
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
            <p className="text-sm text-gray-600">RBI Approval: {details.rbiNumber}</p>
            <p className="text-sm text-gray-600">Verification Date: {details.approvalDate}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-red-700 font-medium">⚠ Fraudulent Lender</p>
            <p className="text-sm text-gray-600">Warning Type: {details.warningType}</p>
            <p className="text-sm text-gray-600">Reports: {details.reportCount}</p>
            <div className="mt-4 p-3 bg-red-100 rounded-md">
              <p className="text-sm font-medium text-red-800">
                Legal Contact Path Available - Click for Assistance
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}