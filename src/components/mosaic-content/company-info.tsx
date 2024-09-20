import React from 'react';
import { processNames } from '../../utils/process-names';
import { CompanyInfoWidgetProps } from '../../interfaces/companies-interface';

const CompanyInfo: React.FC<CompanyInfoWidgetProps> = ({ company }) => {
  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {Object.entries(company).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong className="font-bold">{processNames(key)}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
};

export default CompanyInfo;
