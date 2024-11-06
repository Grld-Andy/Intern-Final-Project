import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import UserContextProvider from './contexts/UserContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import ProjectFormContextProvider from './contexts/ProjectFormContext.tsx';
import ReactGA from 'react-ga';

// Initialize Google Analytics
ReactGA.initialize('G-EQV9RPJGBR');
ReactGA.pageview(window.location.pathname + window.location.search);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <ProjectFormContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectFormContextProvider>
    </UserContextProvider>
  </StrictMode>,
);