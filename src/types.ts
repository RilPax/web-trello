export interface TUser {
  name: string;
  password: string;
  __id: string;
}

export interface TUserRegistryData {
    name: string;
    password: string
}

export interface TTodo {
    id: string
    listId: string
    title: string
    isFinished: boolean
    description: string | null
}

export interface TList {
    id: string
    deskId: string
    title: string
}

export interface TDesk {
    id: string
    userId: string
    title: string
}

export interface addUserDeskData {
    title: string
    userId: string
}

export interface addUserListData {
    title: string
    deskId: string
}

export interface addUserTodoData {
    title: string
    listId: string
}

export type TentitiesArray = TDesk[] | TList[] | TTodo[]

