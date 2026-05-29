import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap CSS (pnpm add bootstrap 으로 설치)
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
