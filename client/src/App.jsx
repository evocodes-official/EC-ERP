import { useState, useEffect } from 'react'
import ERP from './ERP'
import LandingPage from './Components/LandingPage'
import LinkedInCallback from './Components/LinkedInCallback'
import LegalPages from './Components/LegalPages'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLinkedInCallback, setIsLinkedInCallback] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Check if we're on the LinkedIn OAuth callback route
    const path = window.location.pathname
    if (path === '/auth/linkedin/callback') {
      setIsLinkedInCallback(true)
    }

    // Check if user was previously logged in via LinkedIn
    const linkedInUser = localStorage.getItem('linkedin_user')
    if (linkedInUser) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (isLinkedInCallback) {
    return <LinkedInCallback />
  }

  if (isLoggedIn) {
    return <ERP />
  }

  if (currentPage === 'terms' || currentPage === 'privacy' || currentPage === 'copyright') {
    return <LegalPages onBack={() => handleNavigate('home')} />
  }

  return <LandingPage onLogin={handleLogin} onNavigate={handleNavigate} />
}

export default App
