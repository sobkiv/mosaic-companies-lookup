import { createBalancedTreeFromLeaves, getLeaves } from 'react-mosaic-component';
import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';
import React from 'react';
import { AutoArrangeButtonProps } from '../../interfaces/companies-interface';

const AutoArrangeButton: React.FC<AutoArrangeButtonProps> = ({ currentNode, setCurrentNode }) => {
  const autoArrange = () => {
    if (currentNode) {
      const leaves = getLeaves(currentNode);
      setCurrentNode(createBalancedTreeFromLeaves(leaves));
    }
  };

  return (
    <Button className={classNames(Classes.BUTTON, Classes.iconClass('grid-view'))} onClick={autoArrange}>
      Auto Arrange
    </Button>
  );
};

export default AutoArrangeButton;
