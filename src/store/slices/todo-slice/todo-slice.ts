import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { addUserDeskData, addUserListData, addUserTodoData, TDesk, TList, TTodo } from "../../../types";
import { deleteDesk, deleteList, deleteTodo } from "../../../utils/utils";

interface TInitialState {
  desks: TDesk[]
  lists: TList[]
  todos: TTodo[]
}

const initialState: TInitialState = {
  desks: [],
  lists: [],
  todos: []
}

export const fetchUserDesks = createAsyncThunk(
  'fetch/descs',
  async (userId: string) => {
    const desksRaw = localStorage.getItem('desks')
    if(!desksRaw) return []
    const desksList = JSON.parse(desksRaw) as TDesk[]
    return desksList.filter(desk => desk.userId === userId)
  }
)
export const FetchDesksLists = createAsyncThunk(
  'fetch/lists',
  async (deskId: string) => {
    const listsRaw = localStorage.getItem('lists')
    if(!listsRaw) return []
    const listsList = JSON.parse(listsRaw) as TList[]
    return listsList.filter(list => list.deskId === deskId)
  }
)
export const fetchListsTodos = createAsyncThunk(
  'fetch/todos',
  async (listId: string) => {
    const todosRaw = localStorage.getItem('todos')
    if(!todosRaw) return []
    const todosList = JSON.parse(todosRaw) as TTodo[]
    return todosList.filter(todo => todo.listId === listId)
  }
)

export const deleteUserTodo = createAsyncThunk(
  'delete/todo',
  async (todoId: string) => {
    const todosRaw = localStorage.getItem('todos')
    if(!todosRaw) return []
    const todosList = JSON.parse(todosRaw) as TTodo[]
    const filteredTodos = deleteTodo(todosList, todoId)
    localStorage.setItem('todos', JSON.stringify(filteredTodos))
    return filteredTodos
  }
)

export const deleteUserList = createAsyncThunk(
  'delete/list',
  async (listId: string) => {
    const listsRaw = localStorage.getItem('lists');
    const todosRaw = localStorage.getItem('todos');

    const lists: TList[] = listsRaw ? JSON.parse(listsRaw) : [];
    const todos: TTodo[] = todosRaw ? JSON.parse(todosRaw) : [];

    const { filteredLists, filteredTodos } = deleteList(lists, todos, listId);

    localStorage.setItem('lists', JSON.stringify(filteredLists));
    localStorage.setItem('todos', JSON.stringify(filteredTodos));

    return { filteredLists, filteredTodos };
  }
);

export const deleteUserDesk = createAsyncThunk(
  'delete/desk',
  async (deskId: string) => {
    const desksRaw = localStorage.getItem('desks');
    const listsRaw = localStorage.getItem('lists');
    const todosRaw = localStorage.getItem('todos');

    const desks: TDesk[] = desksRaw ? JSON.parse(desksRaw) : [];
    const lists: TList[] = listsRaw ? JSON.parse(listsRaw) : [];
    const todos: TTodo[] = todosRaw ? JSON.parse(todosRaw) : [];

    const { filteredDesks, filteredLists, filteredTodos } = deleteDesk(desks, lists, todos, deskId);

    localStorage.setItem('desks', JSON.stringify(filteredDesks));
    localStorage.setItem('lists', JSON.stringify(filteredLists));
    localStorage.setItem('todos', JSON.stringify(filteredTodos));

    return { filteredDesks, filteredLists, filteredTodos };
  }
);

export const addUserDesk = createAsyncThunk(
  'add/desk',
  async ({userId, title}: addUserDeskData) => {
    const desksRaw = localStorage.getItem('desks')
    const desksList: TDesk[] = desksRaw ? JSON.parse(desksRaw) : []
    const newDesk: TDesk = {
      userId,
      title,
      id: String(desksList.length + 1)
    }
    const updatedDesksList:TDesk[] = [...desksList, newDesk]
    localStorage.setItem('desks', JSON.stringify(updatedDesksList))
    return updatedDesksList
  }
)

export const addUserList = createAsyncThunk(
  'add/list',
  async ({deskId, title}: addUserListData) => {
    const listsRaw = localStorage.getItem('lists')
    const listsList: TList[] = listsRaw ? JSON.parse(listsRaw) : []
    const newList: TList = {
      deskId,
      title,
      id: String(listsList.length + 1)
    }
    const updatedListsList: TList[] =  [...listsList, newList]
    localStorage.setItem('lists', JSON.stringify(updatedListsList))
    return updatedListsList
  }
)

export const addUserTodo = createAsyncThunk(
  'add/todo',
  async ({listId, title}: addUserTodoData) => {
    const todosRaw = localStorage.getItem('todos')
    const todosList: TTodo[] = todosRaw ? JSON.parse(todosRaw) : []
    const newTodo: TTodo = {
      listId,
      title,
      id: String(todosList.length + 1),
      isFinished: false,
      description: null
    }
    const updatedTodosList: TTodo[] = [...todosList, newTodo]
    localStorage.setItem('todos', JSON.stringify(updatedTodosList))
    return updatedTodosList
  }
)

const todoSlice = createSlice({
  name: 'todo-slice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserDesks.fulfilled, (state, action) => {
        state.desks = action.payload
      })
      .addCase(FetchDesksLists.fulfilled, (state, action) => {
        state.lists = action.payload
      })
      .addCase(fetchListsTodos.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(deleteUserTodo.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(deleteUserList.fulfilled, (state, action) => {
        state.lists = action.payload.filteredLists
        state.todos = action.payload.filteredTodos
      })
      .addCase(deleteUserDesk.fulfilled, (state, action) => {
        state.desks = action.payload.filteredDesks
        state.lists = action.payload.filteredLists
        state.todos = action.payload.filteredTodos
      })
      .addCase(addUserDesk.fulfilled, (state, action) => {
        state.desks = action.payload
      })
      .addCase(addUserList.fulfilled, (state, action) => {
        state.lists = action.payload
      })
      .addCase(addUserTodo.fulfilled, (state, action) => {
        state.todos = action.payload
      })
  },
})

export default todoSlice.reducer