 export interface Item {
  id: number
  title: string
  description?: string
  price: number
  owner_id: number
  created_at: string
  updated_at: string
}

 export interface ItemListProps {
  refreshTrigger: number
}

export interface CreateItemProps {
  onItemCreated: () => void
}
