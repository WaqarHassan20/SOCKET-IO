import { createRoot } from 'react-dom/client'
// import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
      <App />
  </>
)
