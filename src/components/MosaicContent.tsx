import React from 'react';
import { MosaicWindow } from 'react-mosaic-component';
import CompanyDropdown from './CompanyDropdown';
import CompanyInfoWidget from './CompanyInfoWidget';
import { Company, MosaicContentProps } from '../interfaces/companies-interface';

const MosaicContent: React.FC<MosaicContentProps> = ({
  id,
  path,
  companies,
  selectedCompanies,
  setSelectedCompanies,
  nextIndex,
}) => {
  const handleCompanySelect = (company: Company) => {
    setSelectedCompanies((prev) => ({ ...prev, [id]: company }));
  };

  return (
    <MosaicWindow path={path} title="Company Info">
      <div>
        {companies && (
          <CompanyDropdown
            companies={companies}
            selectedCompany={selectedCompanies[id] || companies[parseInt(id) || nextIndex]}
            onCompanySelect={handleCompanySelect}
          />
        )}
        <CompanyInfoWidget company={selectedCompanies[id] || (companies ? companies[parseInt(id)] : ({} as Company))} />
      </div>
    </MosaicWindow>
  );
};

export default MosaicContent;
