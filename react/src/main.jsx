import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from './components/Loader'

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#D9C1AB',
      darker: '#5E3228',
    },
    secondary: {
      main: '#997E78'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <Loader />
        <RouterProvider router={router} />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
