export interface TUser {
  name: string;
  password: string;
  __id: string;
}

export interface TTodo {
    id: string
    title: string
    description: string
    completed: boolean
}

export interface TList {
    id: string
    title: string
    todos: TTodo[]
}

export interface TDesk {
    id: string
    userId: string
    title: string
    lists: TList[]
}

export interface TAddUserDesk {
    userId: string
    title: string
}

export interface TremoveUserDesk {
    userId: string
    id: string
}