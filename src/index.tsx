import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DashboardApp from './dashboard-app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DashboardApp />
  </React.StrictMode>
);
