import React, { useEffect, useState } from "react";
import {
  Mosaic,
  MosaicNode,
  updateTree,
  getLeaves,
  createBalancedTreeFromLeaves,
  getPathToCorner,
  getNodeAtPath,
  getOtherDirection,
  Corner,
  MosaicParent,
  MosaicDirection,
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Companies, Company } from "./interfaces/companies-interface";
import { filterCompanyData } from "./utils/filter-company-data";
import ActionButtons from "./components/ActionButtons";
import MosaicContent from "./components/MosaicContent";

const initializeNode = (): MosaicNode<string> => ({
  direction: "row",
  first: "0",
  second: {
    direction: "column",
    first: "1",
    second: "2",
  },
  splitPercentage: 50,
});

const Dashboard: React.FC = () => {
  const [companies, setCompaniesInfo] = useState<Companies | null>(null);
  const [currentNode, setCurrentNode] = useState<MosaicNode<string> | null>(
    initializeNode(),
  );
  const [loading, setLoading] = useState(true);
  const [nextIndex, setNextIndex] = useState<number>(3);
  const [selectedCompanies, setSelectedCompanies] = useState<{
    [key: string]: Company | null;
  }>({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/companies");
      if (response.ok) {
        const data = await response.json();
        const filteredData = filterCompanyData(data);
        setCompaniesInfo(filteredData);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const autoArrange = () => {
    if (currentNode) {
      const leaves = getLeaves(currentNode);
      setCurrentNode(createBalancedTreeFromLeaves(leaves));
    }
  };

  const addToTopRight = () => {
    if (currentNode) {
      let updatedNode = currentNode;
      const path = getPathToCorner(updatedNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(
        updatedNode,
        path.slice(0, -1),
      ) as MosaicParent<string>;
      const destination = getNodeAtPath(
        updatedNode,
        path,
      ) as MosaicNode<string>;
      const direction: MosaicDirection = parent
        ? getOtherDirection(parent.direction)
        : "row";

      const first = direction === "row" ? destination : nextIndex.toString();
      const second = direction === "row" ? nextIndex.toString() : destination;

      updatedNode = updateTree(updatedNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);

      setCurrentNode(updatedNode);
      setNextIndex(nextIndex + 1);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ActionButtons
        onAutoArrange={autoArrange}
        onAddToTopRight={addToTopRight}
      />
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
    </>
  );
};

export default Dashboard;
