import { createSlice } from "@reduxjs/toolkit";

interface SearchFiltersState {
  breeds: string[];
  zipCodes: string[];
  minAge: number;
  maxAge: number;
  favorites: string[];
}

const initialState: SearchFiltersState = {
  breeds: ["German Shepard", "Vizsla"],
  zipCodes: [],
  minAge: 0,
  maxAge: 0,
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
    setMinAge: (state, action) => {
      state.minAge = action.payload;
    },
    setMaxAge: (state, action) => {
      state.maxAge = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    },
  },
});

export const {
  addBreed,
  removeBreed,
  clearBreeds,
  addZipCode,
  removeZipCode,
  setMinAge,
  setMaxAge,
  addToFavorites,
  removeFromFavorites,
} = searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
