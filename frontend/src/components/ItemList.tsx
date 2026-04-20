import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import '../styles/components.css'
import { Item , ItemListProps } from '../types/item'


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
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 mb-4">
  <h2 className="text-2xl font-bold text-gray-800">
    Items Dashboard
  </h2>
  <p className="text-gray-500 text-sm">
    Manage your items in a modern interface
  </p>
</div>
      {error && <div className="bg-red-100/80 backdrop-blur border border-red-300 
text-red-700 px-4 py-3 rounded-xl shadow">
  {error}
</div>}
      
      {items.length === 0 ? (
        <div className="text-center py-20">
  <h3 className="text-xl font-semibold text-gray-600">
    No items yet
  </h3>
  <p className="text-gray-400 mt-2">
    Create your first item to get started 🚀
  </p>
</div>
      ) : (
        <div className="table-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div 
      key={item.id}
      className="bg-white/70 backdrop-blur-lg border border-white/30 
      rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.title}
        </h3>

        <button
          onClick={() => handleDelete(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-2">
        {item.description || 'No description'}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-indigo-600 font-bold text-lg">
          ${item.price}
        </span>

        <span className="text-xs text-gray-400">
          Owner: {item.owner_id}
        </span>
      </div>
    </div>
  ))}
</div>
        </div>
      )}
    </div>
  )
}

export default ItemList
