import React from 'react';
import { LenderCard } from './LenderCard';

interface LenderListProps {
  type: 'verified' | 'scam';
  lenders: Array<{
    id: string;
    name: string;
    imageUrl: string;
    details: {
      approvalDate?: string;
      rbiNumber?: string;
      warningType?: string;
      reportCount?: number;
    };
  }>;
}

export function LenderList({ type, lenders }: LenderListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {type === 'verified' ? 'Verified Lenders' : 'Reported Scams'}
      </h2>
      <div className="space-y-4">
        {lenders.map((lender) => (
          <LenderCard
            key={lender.id}
            name={lender.name}
            imageUrl={lender.imageUrl}
            isVerified={type === 'verified'}
            details={lender.details}
          />
        ))}
      </div>
    </div>
  );
}