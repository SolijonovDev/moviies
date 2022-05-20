import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType={
  paginationPage:number | string | null | undefined;
}

const initialState:initialStateType = {
  paginationPage: null,
};

const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPagination(state:initialStateType, action:PayloadAction<number | string>) {
      state.paginationPage = action.payload;
    },
  },
});
export const { setPagination } = moviesReducer.actions;

export default moviesReducer.reducer;