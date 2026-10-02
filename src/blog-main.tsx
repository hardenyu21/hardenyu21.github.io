import React from 'react';
import ReactDOM from 'react-dom/client';
import { Blog } from './Blog';
import './styles/base.css';
import './styles/layout.css';
import './styles/blog.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Blog />
  </React.StrictMode>,
);
