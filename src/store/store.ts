import { configureStore } from "@reduxjs/toolkit";
import searchFiltersReducer from "./reducers/search-filters-slice";
import userAuthReducer from "./reducers/user-slice";

export const store = configureStore({
  reducer: {
    searchFilters: searchFiltersReducer,
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
