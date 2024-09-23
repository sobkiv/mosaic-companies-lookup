import React from 'react';
import { MosaicWindow } from 'react-mosaic-component';
import CompaniesDropdown from './companies-dropdown';
import CompanyInfo from './company-info';
import { Company, MosaicContentProps } from '../../interfaces/companies-interface';

const MosaicContent: React.FC<MosaicContentProps> = ({
  id,
  path,
  companies,
  selectedCompanies,
  setSelectedCompanies,
  nextIndex,
  isLoading,
}) => {
  const handleCompanySelect = (company: Company) => {
    setSelectedCompanies((prev) => ({ ...prev, [id]: company }));
  };

  return (
    <MosaicWindow path={path} title="Company Info">
      {companies && (
        <CompaniesDropdown
          companies={companies}
          selectedCompany={selectedCompanies[id] || companies[parseInt(id) || nextIndex]}
          onCompanySelect={handleCompanySelect}
        />
      )}
      <CompanyInfo
        company={selectedCompanies[id] || (companies ? companies[parseInt(id)] : null)}
        isLoading={isLoading}
      />
    </MosaicWindow>
  );
};

export default MosaicContent;
