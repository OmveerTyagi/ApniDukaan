import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],       // array of products
  itemCount: 0,    // total number of items
  totalPrice: 0.0, // total price of all items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (!existing) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        existing.quantity += 1;
      }
      state.itemCount += 1; 
      state.totalPrice += action.payload.price; // update totalPrice
    },
    removeFromCart: (state, action) => {
      const removedItem = state.items.find(item => item.id === action.payload);
      if (removedItem) {
        state.itemCount -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity; // subtract total
      }
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.totalPrice = 0.0; // reset totalPrice
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
