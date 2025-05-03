import { createAsyncThunk } from '@reduxjs/toolkit'
import { addProductService } from '../../services/productService' 

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