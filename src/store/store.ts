import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth-slice/auth-slice";
import todoSliceReducer from './slices/todo-slice/todo-slice'

const rootReducer = combineReducers({
  authReducer: authSliceReducer,
  todoReducer: todoSliceReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
