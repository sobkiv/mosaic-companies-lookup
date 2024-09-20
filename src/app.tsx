import React, { useEffect, useState } from 'react';
import { MosaicNode } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { Companies, Company } from './interfaces/companies-interface';
import { filterCompanyData } from './utils/filter-company-data';
import Header from './components/header/header';
import Dashboard from './components/dashboard';

const initializeNode = (): MosaicNode<string> => ({
  direction: 'row',
  first: '0',
  second: {
    direction: 'column',
    first: '1',
    second: '2',
  },
  splitPercentage: 50,
});

const App = () => {
  const [companies, setCompaniesInfo] = useState<Companies | null>(null);
  const [currentNode, setCurrentNode] = useState<MosaicNode<string> | null>(initializeNode());
  const [nextIndex, setNextIndex] = useState<number>(3);
  const [selectedCompanies, setSelectedCompanies] = useState<{
    [key: string]: Company | null;
  }>({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3001/companies');
      if (response.ok) {
        const data = await response.json();
        const filteredData = filterCompanyData(data);
        setCompaniesInfo(filteredData);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header
        currentNode={currentNode}
        setCurrentNode={setCurrentNode}
        nextIndex={nextIndex}
        setNextIndex={setNextIndex}
      />
      <Dashboard
        companies={companies}
        nextIndex={nextIndex}
        selectedCompanies={selectedCompanies}
        currentNode={currentNode}
        setCurrentNode={setCurrentNode}
        setSelectedCompanies={setSelectedCompanies}
      />
    </>
  );
};

export default App;
