import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth-slice/auth-slice";
import todoSliceReducer from "./slices/todo-slice/todo-slice";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  authReducer: authSliceReducer,
  todoReducer: todoSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
