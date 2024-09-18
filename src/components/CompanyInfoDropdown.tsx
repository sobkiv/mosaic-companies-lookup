import React from 'react';

interface CompanyDropdownProps {
  companies: string[];
  onSelect: (companyId: string) => void;
}

const CompanyDropdown: React.FC<CompanyDropdownProps> = ({ companies, onSelect }) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="p-2 border rounded"
    >
      {companies.map((company) => (
        <option key={company} value={company}>
          {company}
        </option>
      ))}
    </select>
  );
};

export default CompanyDropdown;

