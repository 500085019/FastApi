import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // User endpoints
  async getUsers(skip: number = 0, limit: number = 10) {
    try {
      const response = await this.client.get('/users', { params: { skip, limit } })
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  async getUserById(id: number) {
    try {
      const response = await this.client.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }

  async createUser(userData: {
    username: string
    email: string
    password: string
    first_name?: string
    last_name?: string
  }) {
    try {
      const response = await this.client.post('/users', userData)
      return response.data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async updateUser(id: number, userData: any) {
    try {
      const response = await this.client.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async deleteUser(id: number) {
    try {
      await this.client.delete(`/users/${id}`)
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  // Item endpoints
  async getItems(skip: number = 0, limit: number = 10) {
    try {
      const response = await this.client.get('/items', { params: { skip, limit } })
      return response.data
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  }

  async getItemById(id: number) {
    try {
      const response = await this.client.get(`/items/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching item:', error)
      throw error
    }
  }

  async getUserItems(userId: number, skip: number = 0, limit: number = 10) {
    try {
      const response = await this.client.get(`/users/${userId}/items`, { params: { skip, limit } })
      return response.data
    } catch (error) {
      console.error('Error fetching user items:', error)
      throw error
    }
  }

  async deleteItem(id: number) {
    try {
      await this.client.delete(`/items/${id}`)
      return true
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  }
}

export default new ApiClient()
