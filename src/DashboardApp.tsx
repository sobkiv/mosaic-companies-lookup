import React, { useEffect, useState } from 'react';
import {
  Mosaic,
  MosaicWindow,
  MosaicNode,
  MosaicDirection,
  MosaicParent,
  updateTree,
  getLeaves,
  createBalancedTreeFromLeaves,
  getPathToCorner,
  getNodeAtPath,
  getOtherDirection,
  Corner,
} from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import CompanyInfoWidget from './components/CompanyInfoWidget';
import { Classes, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import { Companies, Company } from './interfaces/companies-interface';
import { filterCompanyData } from './utils/filter-company-data';

const Dashboard: React.FC = () => {
  const [companies, setCompaniesInfo] = useState<Companies | null>(null);
  const [currentNode, setCurrentNode] = useState<MosaicNode<string> | null>({
    direction: 'row',
    first: '0',
    second: {
      direction: 'column',
      first: '1',
      second: '2',
    },
    splitPercentage: 50,
  });
  const [loading, setLoading] = useState(true);
  const [nextIndex, setNextIndex] = useState<number>(3);

  useEffect(() => {
    const fetchData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const autoArrange = () => {
    if (currentNode) {
      const leaves = getLeaves(currentNode);
      setCurrentNode(createBalancedTreeFromLeaves(leaves));
    }
  };

  const addToTopRight = () => {
    if (currentNode) {
      let updatedNode = currentNode;
      const leaves = getLeaves(currentNode);
      const totalWindowCount = leaves.length;
      const path = getPathToCorner(updatedNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(updatedNode, path.slice(0, -1)) as MosaicParent<string>;
      const destination = getNodeAtPath(updatedNode, path) as MosaicNode<string>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<string>;
      let second: MosaicNode<string>;
      const newIndex = nextIndex.toString();
      if (direction === 'row') {
        first = destination;
        second = newIndex;
      } else {
        first = newIndex;
        second = destination;
      }

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

  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    0: <CompanyInfoWidget company={companies ? companies[0] : ({} as Company)} />,
    1: <CompanyInfoWidget company={companies ? companies[1] : ({} as Company)} />,
    2: <CompanyInfoWidget company={companies ? companies[2] : ({} as Company)} />,
    ...Object.fromEntries(
      Array.from({ length: nextIndex - 3 }, (_, i) => {
        const index = i + 3;
        return [index.toString(), <CompanyInfoWidget company={companies ? companies[index] : ({} as Company)} />];
      }),
    ),
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen">
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <div className="navbar-separator" />
          <span className="actions-label">Actions:</span>&nbsp;
          <Button className={classNames(Classes.BUTTON, Classes.iconClass('grid-view'))} onClick={autoArrange}>
            Auto Arrange
          </Button>
          <Button className={classNames(Classes.BUTTON, Classes.iconClass('arrow-top-right'))} onClick={addToTopRight}>
            Add Window to Top Right
          </Button>
        </div>
      </div>
      <Mosaic<string>
        renderTile={(id, path) => (
          <MosaicWindow path={path} createNode={() => nextIndex.toString()} title={`Company info`}>
            <div>
              {ELEMENT_MAP[id]}
            </div>
          </MosaicWindow>
        )}
        value={currentNode}
        onChange={setCurrentNode}
        blueprintNamespace="bp4"
      />
    </div>
  );
};

export default Dashboard;
