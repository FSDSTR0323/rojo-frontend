export interface User {
  id: number
  firstName: string
  lastName: string
  nickname: string
  password: string
  email: string
  role: string
  profileImageUrl: string
  token: string
}

export interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}
