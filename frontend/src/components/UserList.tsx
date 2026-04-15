import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import '../styles/components.css'

interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface UserListProps {
  refreshTrigger: number
}

const UserList: React.FC<UserListProps> = ({ refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchUsers()
  }, [refreshTrigger])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiClient.getUsers(0, 50)
      setUsers(data)
    } catch (err) {
      setError('Failed to fetch users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiClient.deleteUser(id)
        setUsers(users.filter(u => u.id !== id))
      } catch (err) {
        setError('Failed to delete user')
        console.error(err)
      }
    }
  }

  if (loading) return <div className="loading">Loading users...</div>

  return (
    <div className="component-container">
      <h2>Users List</h2>
      {error && <div className="error-message">{error}</div>}
      
      {users.length === 0 ? (
        <p className="no-data">No users found</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 'N/A'}</td>
                  <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList
