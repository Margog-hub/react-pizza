import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;

    const categoryParam = category ? `&${category}` : "";
    const searchParam = search ? `&${search}` : "";

    const url = `https://68750ca8dd06792b9c967d62.mockapi.io/item?page=${currentPage}&limit=8${categoryParam}${searchParam}&sortBy=${sortBy}&order=${order}`;

    const { data } = await axios.get(url);
    return data;
  },
);
const initialState = {
  items: [],
  status: "loading", // 'loading' | 'success' | 'error'
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
