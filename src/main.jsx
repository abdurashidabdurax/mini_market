import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('cartSidebarRoot')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
