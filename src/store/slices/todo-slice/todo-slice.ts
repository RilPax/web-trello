import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TAddUserDesk, TDesk, TremoveUserDesk } from "../../../types";

interface TInitialState {
  userDesks: TDesk[];
}

const initialState: TInitialState = {
  userDesks: [],
};

const fetchUserDesks = createAsyncThunk(
  "todo/fetch-todo",
  async (userId: string) => {
    const desksRaw = localStorage.getItem("todos");
    if (!desksRaw) {
      const usersDdesks: TDesk[] = [];
      localStorage.setItem("todos", JSON.stringify(usersDdesks));
      return usersDdesks;
    } else {
      const desksList = JSON.parse(desksRaw) as TDesk[];
      return desksList.filter((desk) => desk.userId === userId);
    }
  }
);

const addUserDesk = createAsyncThunk(
  "todo/add-todo",
  async ({ userId, title }: TAddUserDesk) => {
    const userDesk: TDesk = {
      userId,
      title,
      id: crypto.randomUUID(),
      lists: [],
    };

    const desksListRaw = localStorage.getItem("todos");
    if (!desksListRaw) {
      const desksList: TDesk[] = [];
      desksList.push(userDesk);
      localStorage.setItem("todos", JSON.stringify(desksList));
      return [...desksList].filter((desk) => desk.userId === userId);
    }
    const desksList: TDesk[] = JSON.parse(desksListRaw);
    desksList.push(userDesk);
    localStorage.setItem("todos", JSON.stringify(desksList));
    return [...desksList].filter((desk) => desk.userId === userId);
  }
);

const removeUserDesk = createAsyncThunk(
  "todo/delete-todo",
  async ({ id, userId }: TremoveUserDesk) => {
    const desksListRaw = localStorage.getItem("todos");
    if (!desksListRaw) {
      localStorage.setItem("todos", JSON.stringify([]));
      return [];
    }
    const desksList: TDesk[] = JSON.parse(desksListRaw);
    const filteredList = desksList.filter((desk) => desk.id !== id);
    localStorage.setItem("todos", JSON.stringify(filteredList));
    return [...filteredList].filter((desk) => desk.userId === userId);
  }
);

const todoSlice = createSlice({
  name: "todo-slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
  builder
    .addCase(fetchUserDesks.fulfilled, (state, action) => {
      state.userDesks = action.payload;
    })
    .addCase(addUserDesk.fulfilled, (state, action) => {
      state.userDesks = action.payload;
    })
    .addCase(removeUserDesk.fulfilled, (state, action) => {
      state.userDesks = action.payload;
    });
}
});

export default todoSlice.reducer;
export { removeUserDesk, addUserDesk, fetchUserDesks };
