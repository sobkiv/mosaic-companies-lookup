import React from 'react';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { HeaderProps } from '../../interfaces/companies-interface';
import AutoArrangeButton from './auto-arrange-button';
import AddWindowButton from './add-window-button';

const Header: React.FC<HeaderProps> = ({ currentNode, setCurrentNode, nextIndex, setNextIndex }) => {
  return (
    <header className={classNames(Classes.NAVBAR, Classes.DARK)}>
      <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
        <div className="navbar-separator" />
        <span className="actions-label">Actions:</span>&nbsp;
        <AutoArrangeButton currentNode={currentNode} setCurrentNode={setCurrentNode} />
        <AddWindowButton
          currentNode={currentNode}
          setCurrentNode={setCurrentNode}
          nextIndex={nextIndex}
          setNextIndex={setNextIndex}
        />
      </div>
    </header>
  );
};

export default Header;
