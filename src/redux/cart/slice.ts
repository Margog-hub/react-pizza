import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./type";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";


const initialState:  CartSliceState = getCartFromLS()

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((items) => items.id !== action.payload);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
