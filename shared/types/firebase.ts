export namespace DB {
  export type Collection = {
    title: string
    collection: string
    path: string
  }

  // export type Collections = Collection & {
  //   id: string
  // }
  export type Collections = Omit<Collection, 'collection'> & {
    isNew?: true
  }

  export type Task = {
    title: string
    createAt: string // new Date().toISOString()
    deadline?: string // new Date().toISOString()
    labels: string[]
  }
}
export type ResponseProjectGroup = {
  orders: DB.Collections[]
  collections: Record<string, DB.Task[]>
}

export type DecodedIdTokenKeys =
  | 'aud'
  | 'auth_time'
  | 'email'
  | 'email_verified'
  | 'exp'
  | 'firebase'
  | 'iat'
  | 'iss'
  | 'phone_number'
  | 'picture'
  | 'sub'
  | 'uid'
  | 'name'
  | 'user_id'
