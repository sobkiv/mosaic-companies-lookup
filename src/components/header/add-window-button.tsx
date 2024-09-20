import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';
import {
  Corner,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  updateTree,
} from 'react-mosaic-component';
import React from 'react';
import { AddWindowButtonProps } from '../../interfaces/companies-interface';

const AddWindowButton: React.FC<AddWindowButtonProps> = ({ currentNode, setCurrentNode, nextIndex, setNextIndex }) => {
  const addToTopRight = () => {
    if (currentNode) {
      let updatedNode = currentNode;
      const path = getPathToCorner(updatedNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(updatedNode, path.slice(0, -1)) as MosaicParent<string>;
      const destination = getNodeAtPath(updatedNode, path) as MosaicNode<string>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      const first = direction === 'row' ? destination : nextIndex.toString();
      const second = direction === 'row' ? nextIndex.toString() : destination;

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
  return (
    <Button className={classNames(Classes.BUTTON, Classes.iconClass('arrow-top-right'))} onClick={addToTopRight}>
      Add Window to Top Right
    </Button>
  );
};

export default AddWindowButton;
