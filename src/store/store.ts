import { configureStore } from "@reduxjs/toolkit";
import searchFiltersReducer from "./reducers/search-filters-slice";

export const store = configureStore({
  reducer: {
    searchFilters: searchFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
