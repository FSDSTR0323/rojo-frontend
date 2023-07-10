import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
