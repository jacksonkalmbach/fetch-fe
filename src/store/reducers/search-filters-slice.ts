import { createSlice } from "@reduxjs/toolkit";

interface SearchFiltersState {
  breeds: string[];
  zipCodes: string[];
  minAge: number;
  maxAge: number;
  sort: string;
  favorites: string[];
}

const initialState: SearchFiltersState = {
  breeds: [],
  zipCodes: [],
  minAge: 0,
  maxAge: 20,
  sort: "asc",
  favorites: [],
};

export const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    addBreed: (state, action) => {
      state.breeds.push(action.payload);
    },
    removeBreed: (state, action) => {
      state.breeds = state.breeds.filter((breed) => breed !== action.payload);
    },
    clearBreeds: (state) => {
      state.breeds = [];
    },
    addZipCode: (state, action) => {
      state.zipCodes.push(action.payload);
    },
    removeZipCode: (state, action) => {
      state.zipCodes = state.zipCodes.filter(
        (zipCode) => zipCode !== action.payload
      );
    },
    clearZipCodes: (state) => {
      state.zipCodes = [];
    },
    setMinAge: (state, action) => {
      state.minAge = action.payload;
    },
    setMaxAge: (state, action) => {
      state.maxAge = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  addBreed,
  removeBreed,
  clearBreeds,
  addZipCode,
  removeZipCode,
  clearZipCodes,
  setMinAge,
  setMaxAge,
  setSort,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
