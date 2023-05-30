import { createSlice } from "@reduxjs/toolkit";

interface SearchFiltersState {
  breeds: string[];
  zipCodes: string[];
  minAge: number;
  maxAge: number;
}

const initialState: SearchFiltersState = {
  breeds: [],
  zipCodes: [],
  minAge: 0,
  maxAge: 0,
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
} = searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
