import React from 'react';
import { processNames } from '../../utils/process-names';
import { CompanyInfoWidgetProps } from '../../interfaces/companies-interface';

const CompanyInfo: React.FC<CompanyInfoWidgetProps> = ({ company, isLoading }) => {
  if (!company && isLoading) {
    return <div className="mt-2 ml-4">Loading...</div>;
  }

  if (!company) {
    return <div className="mt-2 ml-4">No company data available.</div>;
  }

  return (
    <div className="p-4">
      {Object.entries(company ?? {}).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong className="font-bold">{processNames(key)}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
};

export default CompanyInfo;
