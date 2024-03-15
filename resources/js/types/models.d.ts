export interface User {
  // columns
  id: number
  name: unknown
  email: unknown
  email_verified_at: string|null
  password?: string
  remember_token?: unknown|null
  created_at: string|null
  updated_at: string|null
  // relations
  notifications: DatabaseNotification[]
}

