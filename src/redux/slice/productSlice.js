import { createSlice } from '@reduxjs/toolkit';
import { addNewProduct, fetchAllProducts } from '../actions/productActions';  


const initialState = {
    products: [],
    productDetails: null,
    loading: false,
    error: null,
  };

  const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      
      .addCase(addNewProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(addNewProduct.fulfilled, (state, action) => {
            state.loading = false;
            // console.log('action.payload',action.payload);
            
            state.products.push(action.payload); 
        })
        .addCase(addNewProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        .addCase(fetchAllProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products =  action.payload.data; 
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // .addCase(updateProduct.pending, (state) => {
        //   state.loading = true;
        // })
        // .addCase(updateProduct.fulfilled, (state, action) => {
        //   state.loading = false;
        //   const index = state.products.findIndex((prod) => prod._id === action.payload._id);
        //   if (index !== -1) {
        //     state.products[index] = action.payload; // Updating the product in the state
        //   }
        // })
        // .addCase(updateProduct.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload;
        // })
  
        // .addCase(deleteProduct.pending, (state) => {
        //   state.loading = true;
        // })
        // .addCase(deleteProduct.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.products = state.products.filter((prod) => prod._id !== action.payload); // Removing deleted product
        // })
        // .addCase(deleteProduct.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload;
        // });
    },
  });
  
  export default productSlice.reducer;