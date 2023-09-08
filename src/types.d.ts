// User

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

// Home and Content

export interface ContentProps {
  content: {
    title: string
    description?: string
    subtitle?: string
    image?: {
      alt: string
      src: string
    }
  }
}
