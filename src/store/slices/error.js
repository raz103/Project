const { createSlice } = require("@reduxjs/toolkit");

// TODO: keep an array of errors with IDs, and remove the error by id
// so that the last one always stays for at least 3000ms?
export const error = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => ""
  }
});

export const setError = error.actions.set;
export const clearError = error.actions.clear;
export const errorReducer = error.reducer;

export default error;
