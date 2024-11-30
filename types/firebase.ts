import type { User as _User } from 'firebase/auth'

export interface User extends _User {
  displayName: string | null
  projects?: string[]
}
