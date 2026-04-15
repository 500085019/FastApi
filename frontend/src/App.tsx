import { useState } from 'react'
import UserList from './components/UserList'
import CreateUser from './components/CreateUser'
import ItemList from './components/ItemList'
import './styles/App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'items'>('users')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUserCreated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>FastAPI Management</h1>
        <p>Manage Users and Items</p>
      </header>
      
      <nav className="app-nav">
        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`nav-btn ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Items
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'users' && (
          <div className="tab-content">
            <CreateUser onUserCreated={handleUserCreated} />
            <UserList refreshTrigger={refreshTrigger} />
          </div>
        )}
        
        {activeTab === 'items' && (
          <div className="tab-content">
            <ItemList refreshTrigger={refreshTrigger} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
