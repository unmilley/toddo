export namespace Database {
  export type Todo = {
    task: string
    create_at: number
    isDone: boolean
  }

  export type Todos = {
    id: string
    task: string
    create_at: number
    isDone: boolean
  }

  export type Group = {
    [key: string]: {
      [key: string]: Todo
    }
  }

  export type Groups = {
    title: string
    tasks: {
      [key: string]: Database.Todo
    }
    completed: number
    total: number
  }
}
