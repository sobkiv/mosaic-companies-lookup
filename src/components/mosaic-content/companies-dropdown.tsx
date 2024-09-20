import React from 'react';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import { Company, CompanySelectProps } from '../../interfaces/companies-interface';

const CompaniesDropdown: React.FC<CompanySelectProps> = ({ companies, selectedCompany, onCompanySelect }) => {
  const CompanySelectComponent = Select.ofType<Company>();

  return (
    <CompanySelectComponent
      className={'mt-3 ml-3'}
      items={companies}
      itemRenderer={(company, { handleClick, modifiers }) => (
        <MenuItem key={company.name} text={company.name} onClick={handleClick} active={modifiers.active} />
      )}
      onItemSelect={onCompanySelect}
    >
      <Button text={selectedCompany?.name || 'Select Company'} rightIcon="double-caret-vertical" />
    </CompanySelectComponent>
  );
};

export default CompaniesDropdown;
