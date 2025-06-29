import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../../types";

interface TInitialState {
  currentUser: null | TUser;
  users: TUser[];
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: TInitialState = {
  currentUser: null,
  users: [],
  isLoading: false,
  isAuthenticated: false,
};

const fetchCurrentUserData = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const user = localStorage.getItem("user/current");
    return user ? JSON.parse(user) : null;
  }
);

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: TUser) => {
    const userList = localStorage.getItem("user/list");

    let updatedList: TUser[] = [];

    if (userList) {
      const parsed = JSON.parse(userList) as TUser[];
      updatedList = [...parsed, userData];
    } else {
      updatedList = [userData];
    }

    localStorage.setItem("user/list", JSON.stringify(updatedList));
    localStorage.setItem("user/current", JSON.stringify(userData));
    return userData;
  }
);

const logoutCurrentUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user/current");
  return null;
});

const deleteUserData = createAsyncThunk(
  "auth/deleteUser",
  async (__, { rejectWithValue }) => {
    const currentRaw = localStorage.getItem("user/current");
    const currentListRaw = localStorage.getItem("user/list");

    if (!currentRaw || !currentListRaw) {
      return rejectWithValue("что то пошло не так");
    }
    const currentUser = JSON.parse(currentRaw) as TUser;
    const userList = JSON.parse(currentListRaw) as TUser[];

    const updatedUserList = userList.filter(
      (user) => user.__id !== currentUser.__id
    );
    localStorage.removeItem("user/current");
    localStorage.setItem("user/list", JSON.stringify(updatedUserList));
    return currentUser.__id;
  }
);

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.users = [...state.users, action.payload];
        state.isAuthenticated = true;
      })
      .addCase(logoutCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.users = state.users.filter(
          (user) => user.__id !== action.payload
        );
      });
  },
});

export default authSlice.reducer;
export {
  fetchCurrentUserData,
  registerUser,
  logoutCurrentUser,
  deleteUserData,
};
