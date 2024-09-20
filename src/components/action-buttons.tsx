import React from 'react';
import { Button, Classes } from '@blueprintjs/core';
import classNames from 'classnames';

interface ActionButtonsProps {
  onAutoArrange: () => void;
  onAddToTopRight: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAutoArrange, onAddToTopRight }) => {
  return (
    <header className={classNames(Classes.NAVBAR, Classes.DARK)}>
      <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
        <div className="navbar-separator" />
        <span className="actions-label">Actions:</span>&nbsp;
        <Button className={classNames(Classes.BUTTON, Classes.iconClass('grid-view'))} onClick={onAutoArrange}>
          Auto Arrange
        </Button>
        <Button className={classNames(Classes.BUTTON, Classes.iconClass('arrow-top-right'))} onClick={onAddToTopRight}>
          Add Window to Top Right
        </Button>
      </div>
    </header>
  );
};

export default ActionButtons;
