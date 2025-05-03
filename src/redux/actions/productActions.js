import { createAsyncThunk } from '@reduxjs/toolkit'
import { addProductService, fetchAllProductService } from '../../services/productService' 

export const addNewProduct = createAsyncThunk(
    "product/create",
    async (formData, { rejectWithValue }) => {
        try {
            console.log('product action', formData);
            
            return await addProductService(formData)
        } catch (error) {
            return rejectWithValue(error.message || "Failed to add new product");
        }
    }
)

export const fetchAllProducts = createAsyncThunk(
    'product/fetchAll',
    async (filters, { rejectWithValue }) => {
      try {
        const response =  await fetchAllProductService(filters)
        return response; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
      }
    }
  );