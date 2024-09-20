import React from 'react';
import { Mosaic } from 'react-mosaic-component';
import MosaicContent from './mosaic-content/mosaic-content';
import { DashboardProps } from '../interfaces/companies-interface';

const Dashboard: React.FC<DashboardProps> = ({
  companies,
  nextIndex,
  setSelectedCompanies,
  selectedCompanies,
  currentNode,
  setCurrentNode,
}) => {
  return (
    <main className="h-screen">
      <Mosaic<string>
        renderTile={(id, path) => (
          <MosaicContent
            id={id}
            path={path}
            companies={companies}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            nextIndex={nextIndex}
          />
        )}
        value={currentNode}
        onChange={setCurrentNode}
      />
    </main>
  );
};

export default Dashboard;
