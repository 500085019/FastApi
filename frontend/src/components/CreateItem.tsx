import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import apiClient from '../services/apiClient'
import { CreateItemProps } from '../types/item'

const CreateItem: React.FC<CreateItemProps> = ({ onItemCreated }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    owner_id: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        owner_id: parseInt(formData.owner_id)
      }

      await apiClient.createItem(payload)

      setFormData({
        title: '',
        description: '',
        price: '',
        owner_id: ''
      })

      setIsOpen(false)
      onItemCreated()
    } catch (err) {
      setError('Failed to create item')
      console.error(err)
    }
  }

  return (
    <div className="mb-6">
      {/* CREATE BUTTON */}
      <button
         onClick={() => setIsOpen(true)}
  className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 
  text-white p-4 rounded-full shadow-2xl hover:scale-110 
  transition-all duration-300"
>
  +
</button>

      {/* MODAL */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
            
            <Dialog.Title className="text-xl font-semibold">
              Create New Item
            </Dialog.Title>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="owner_id"
              placeholder="Owner ID"
              value={formData.owner_id}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default CreateItem