import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import '../styles/components.css'

interface Item {
  id: number
  title: string
  description?: string
  price: number
  owner_id: number
  created_at: string
  updated_at: string
}

interface ItemListProps {
  refreshTrigger: number
}

const ItemList: React.FC<ItemListProps> = ({ refreshTrigger }) => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchItems()
  }, [refreshTrigger])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiClient.getItems(0, 50)
      setItems(data)
    } catch (err : any) {
      setError('Failed to fetch items')
      console.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiClient.deleteItem(id)
        setItems(items.filter(i => i.id !== id))
      } catch (err) {
        setError('Failed to delete item')
        console.error(err)
      }
    }
  }

  if (loading) return <div className="loading">Loading items...</div>

  return (
    <div className="component-container">
      <h2>Items List</h2>
      {error && <div className="error-message">{error}</div>}
      
      {items.length === 0 ? (
        <p className="no-data">No items found</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Owner ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description || 'N/A'}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.owner_id}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
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

export default ItemList
