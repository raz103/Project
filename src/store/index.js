import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "redux-orm";
import orm from "./orm";
import { error, currentUser, dataManagement } from "./slices";
import populateStore from "./populateStore";

// import { User, Data } from "./modelDucks/models";

// orm.register(User, Data);

const ormReducer = createReducer(orm);

const store = configureStore({
  reducer: {
    orm: ormReducer,
    currentUser: currentUser.reducer,
    dataManagement: dataManagement.reducer,
    error: error.reducer
  }
});

populateStore(store);

export default store;
