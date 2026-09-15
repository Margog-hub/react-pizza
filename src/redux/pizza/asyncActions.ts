import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./type";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;

    const categoryParam = category ? `&${category}` : "";
    const searchParam = search ? `&${search}` : "";

    const url = `https://68750ca8dd06792b9c967d62.mockapi.io/item?page=${currentPage}&limit=8${categoryParam}${searchParam}&sortBy=${sortBy}&order=${order}`;

    const { data } = await axios.get<Pizza[]>(url);
    return data;
  },
);
