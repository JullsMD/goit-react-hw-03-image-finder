import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import s from './App.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className={s.App} />
  </React.StrictMode>
);
