import { useState, useEffect } from 'react'
import Login from './components/Login'
import ChatBot from './components/ChatBot'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl">
        Loading...
      </div>
    )
  }

  return (
    <div>
      {user ? (
        <ChatBot user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
