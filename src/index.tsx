// import App from './pages/App';
// import './style.css';
// import './wdyr'
// import { createRoot } from 'react-dom/client';

// const container = document.getElementById('app');
// if (!container) {
//   throw new Error('Failed to find the root element');
// }

// const root = createRoot(container);

// root.render(<App />);


import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './wdyr';
import './style.css';
import App from '@pages/App';
const container = document.getElementById('app');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
