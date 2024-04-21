import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as usersReducer } from "./user/user";

const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
