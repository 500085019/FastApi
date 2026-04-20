import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import '../styles/components.css'
import { Item , CreateItemProps } from '../types/item'




const CreateItem: React.FC<CreateItemProps> = ({ onItemCreated }) => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // NEW: create form state
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    owner_id: ''
  })

  useEffect(() => {
    fetchItems()
  }, [onItemCreated])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiClient.getItems(0, 50)
      setItems(data)
    } catch (err: any) {
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

  // NEW: handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    })
  }

  // NEW: create item
  const handleCreate = async () => {
    try {
      const payload = {
        ...newItem,
        price: parseFloat(newItem.price),
        owner_id: parseInt(newItem.owner_id)
      }

      const createdItem = await apiClient.createItem(payload)

      setItems([createdItem, ...items])
      setShowForm(false)

      // reset form
      setNewItem({
        title: '',
        description: '',
        price: '',
        owner_id: ''
      })
    } catch (err) {
      setError('Failed to create item')
      console.error(err)
    }
  }

  if (loading) return <div className="loading">Loading items...</div>

  return (
    <div className="component-container">
      <h2>Items List</h2>

      {/* CREATE BUTTON */}
      <button 
        className="btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Create Item'}
      </button>

      {/* CREATE FORM */}
      {showForm && (
        <div className="form-container">
          <input
            name="title"
            placeholder="Title"
            value={newItem.title}
            onChange={handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleChange}
          />
          <input
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
          />
          <input
            name="owner_id"
            placeholder="Owner ID"
            value={newItem.owner_id}
            onChange={handleChange}
          />

          <button className="btn-success" onClick={handleCreate}>
            Submit
          </button>
        </div>
      )}

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

export default CreateItem