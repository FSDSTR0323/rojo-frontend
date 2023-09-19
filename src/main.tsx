import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RecipeProvider from './context/RecipeContext.jsx'
import theme from './config/theme'
import { ThemeProvider } from '@mui/material/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
)
