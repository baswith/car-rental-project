import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../bootstrap.min .css'
import ContextAPI from '../ContextAPI/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextAPI>
      <StrictMode>
        <App />
      </StrictMode>
    </ContextAPI>
  </BrowserRouter>
)
