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
      const { id, price, quantity = 1 } = action.payload;
      const existing = state.items.find(item => item.id === id);

      if (!existing) {
        // If not in cart, add new with given quantity (or 1 default)
        state.items.push({ ...action.payload, quantity });
        state.itemCount += quantity;
        state.totalPrice += price * quantity;
      } else {
        // If already in cart, increase quantity
        existing.quantity += quantity;
        state.itemCount += quantity;
        state.totalPrice += price * quantity;
      }
    },
    removeFromCart: (state, action) => {
      const removedItem = state.items.find(item => item.id === action.payload);
      if (removedItem) {
        state.itemCount -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;
      }
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.totalPrice = 0.0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
