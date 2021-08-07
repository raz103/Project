import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { upsertData } from "../modelDucks/Data";
import { removeFromArrayMutably, addIfNotInArray } from "../../helpers";

// THUNKS
export const saveData = createAsyncThunk(
  "dataManagement/saveData",
  async (data, thunkAPI) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const selectedUserIds = dataArray.map((singleData) => singleData.user);

    // pretend backend returns success here
    thunkAPI.dispatch(upsertData(dataArray));
    thunkAPI.dispatch(removeEditing(selectedUserIds));
    thunkAPI.dispatch(removeAltered(selectedUserIds));
    thunkAPI.dispatch(clearSelected());
  }
);

const initialState = {
  selectedUserIds: [],
  editingUserIds: [],
  alteredUserIds: [] // TODO: use this to maintain if a user's 'form' got changed
};

const dataManagement = createSlice({
  name: "dataManagement",
  initialState,
  reducers: {
    putSelected: (state, { payload }) => {
      if (!Array.isArray(payload)) {
        state.selectedUserIds = [payload];
      } else {
        state.selectedUserIds = payload;
      }
    },
    clearSelected: (state) => {
      state.selectedUserIds = [];
    },
    toggleSelected: (state, { payload }) => {
      if (state.selectedUserIds.includes(payload)) {
        removeFromArrayMutably(state.selectedUserIds, payload);
      } else {
        state.selectedUserIds.push(payload);
      }
    },
    removeSelected: (state, { payload }) => {
      removeFromArrayMutably(state.selectedUserIds, payload);
    },
    putAltered: (state, { payload }) => {
      addIfNotInArray(state.alteredUserIds, payload);
    },
    removeAltered: (state, { payload }) => {
      if (Array.isArray(payload)) {
        payload.forEach((userId) => {
          removeFromArrayMutably(state.alteredUserIds, userId);
        });
      } else {
        removeFromArrayMutably(state.alteredUserIds, payload);
      }
    },
    putEditing: (state, { payload }) => {
      if (Array.isArray(payload)) {
        payload.forEach((userId) => {
          addIfNotInArray(state.editingUserIds, userId);
        });
      } else {
        addIfNotInArray(state.editingUserIds, payload);
      }
    },
    removeEditing: (state, { payload }) => {
      if (Array.isArray(payload)) {
        payload.forEach((userId) => {
          removeFromArrayMutably(state.editingUserIds, userId);
        });
      } else {
        removeFromArrayMutably(state.editingUserIds, payload);
      }
    },
    clearEditing: (state) => {
      state.editingUserIds = [];
    },
    putDefaults: (state) => {
      state.editingUserIds = [];
      state.selectedUserIds = [];
      state.alteredUserIds = [];
    }
    // putDefaults: (state) => {
    // // with manual return
    //   return {
    //     ...state,
    //     editingUserIds: [],
    //     selectedUserIds: [],
    //     alteredUserIds: []
    //   };
    // }
  },
  extraReducers: {
    [saveData.rejected]: (state, { error, payload }) => {
      console.log({ error, payload });
    }
  }
});

// =====EXPORTS=====

// ACTIONS
export const putSelected = dataManagement.actions.putSelected;
export const removeSelected = dataManagement.actions.removeSelected;
export const clearSelected = dataManagement.actions.clearSelected;
export const toggleSelected = dataManagement.actions.toggleSelected;

export const putAltered = dataManagement.actions.putAltered;
export const removeAltered = dataManagement.actions.removeAltered;

export const putEditing = dataManagement.actions.putEditing;
export const removeEditing = dataManagement.actions.removeEditing;
export const clearEditing = dataManagement.actions.clearEditing;

export const putDefaults = dataManagement.actions.putDefaults;

// REDUCER
export const dataManagementReducer = dataManagement.reducer;

// SELECTORS
export const isSelectedSelector = createSelector(
  [(state) => state.dataManagement.selectedUserIds, (_, userId) => userId],
  (selectedUserIds, userId) => {
    return selectedUserIds.includes(userId);
  }
);

export const selectedUserIdsSelector = (state) =>
  state.dataManagement.selectedUserIds;

export const alteredUserIdsSelector = (state) =>
  state.dataManagement.alteredUserIds;

export const isEditingSelector = createSelector(
  [(state) => state.dataManagement.editingUserIds, (_, userId) => userId],
  (editingUserIds, userId) => {
    return editingUserIds.includes(userId);
  }
);

// SLICE
export default dataManagement;
