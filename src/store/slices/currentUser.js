import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: "currentUser",
  initialState: 1,
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => null
  }
});

export const setCurrentUser = currentUser.actions.set;
export const clearCurrentUser = currentUser.actions.clear;
export const currentUserReducer = currentUser.reducer;
export default currentUser;

// =====alternative method without slice=====
// // ACTIONS
// export const setUser = createAction("currentUser/set");
// export const clearUser = createAction("currentUser/clear");

// // REDUCER
// const initialState = null;
// export const reducer = createReducer(initialState, {
//   [setUser]: (state, action) => action.payload,
//   [clearUser]: (state) => initialState
// });
