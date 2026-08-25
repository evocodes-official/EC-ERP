import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ERP from './ERP'
import LandingPage from './Components/LandingPage'
import LegalPages from './Components/LegalPages'
import ScrollToTop from './Components/ScrollToTop'

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('ec_erp_user')) {
      setIsLoggedIn(true)
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<LegalPages page="terms" />} />
        <Route path="/privacy" element={<LegalPages page="privacy" />} />
        <Route path="/copyright" element={<LegalPages page="copyright" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ERP />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
