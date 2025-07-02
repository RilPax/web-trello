import type { TDesk, TList, TTodo } from "../types";

export const deleteDesk = (desks: TDesk[], lists: TList[], todos: TTodo[], id: string) => {
    const filteredDesks = desks.filter(desk => desk.id !== id)
    const deletedDeskid = desks.find(desk => desk.id === id)!.id

    const {filteredTodos, filteredLists} = deleteDeskLists(lists, todos, deletedDeskid)

    return {filteredDesks, filteredLists, filteredTodos}
}

export const deleteList = (lists: TList[], todos: TTodo[], id: string) => {
    const deletedListId  = lists.find(list => list.id === id)!.id
    const filteredLists = lists.filter(list => list.id !== id)
    const filteredTodos = deleteListTodos(todos, deletedListId)
    return {filteredLists, filteredTodos}
}

export const deleteDeskLists = (lists: TList[], todos: TTodo[], deskId: string) => {
    const filteredLists = lists.filter(list => list.deskId !== deskId)
    const deletedLists = lists.filter(list => list.deskId === deskId)
    const filteredTodos:TTodo[] = []
    deletedLists.forEach(list => {
        filteredTodos.push(...(deleteListTodos(todos, list.id)))
    })
    return {filteredLists, filteredTodos}
}

export const deleteTodo = (todos: TTodo[], id: string) => {
    return todos.filter(todo => todo.id !== id)
}

export const deleteListTodos = (todos: TTodo[], listId: string) => {
    return todos.filter(todo => todo.listId !== listId)
}