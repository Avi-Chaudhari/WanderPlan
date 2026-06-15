import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/authContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
