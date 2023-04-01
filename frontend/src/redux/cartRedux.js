import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {      
      state.products.push(action.payload);
      let sum = 0;
      state.products.forEach((element) => {
        sum+=element.price*element.quantity;
      }); 
      state.total = sum;
      state.quantity = state.products.length;
    },
    addQuantity: (state, action) => {      
      let sum = 0;
      state.products.forEach((element) => {
        element.sku === action.payload.sku && element.quantity++;
        sum+=element.price*element.quantity;
      }); 
      state.total = sum;
      state.quantity = state.products.length;
    },
    reduceQuantity: (state, action) => {      
      let sum = 0;
      state.products.forEach((element) => {
        element.sku === action.payload.sku && element.quantity--;
        sum+=element.price*element.quantity;
      }); 
      state.total = sum;
      state.quantity = state.products.length;
    },

    removeProduct: (state, action) => {
      const filter = state.products.filter(
        (product) => product.sku !== action.payload.sku
      );
      let sum = 0;
      filter.forEach((element) => {
        sum += (element.price*element.quantity);
      });
      state.products = filter;
      state.total = sum;
      state.quantity = state.products.length;
    },
    clearCart: (state) => {
     
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const { addProduct, removeProduct, addQuantity,reduceQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
