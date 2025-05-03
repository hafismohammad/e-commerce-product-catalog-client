import axios from "axios";
import API_URL from "../axios/API_URL";

export const addProductService = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data; 
  } catch (error) {
    console.error("Error in add new product service:", error);
    throw error; 
  }
};


export const fetchAllProductService = async (filter) => {
  try {
    const queryParams = new URLSearchParams(filter).toString();
    console.log('queryParams',queryParams);
    
    const response = await axios.get(`${API_URL}/api/products?${queryParams}`);

    console.log('res servie', response);
    
    return response.data; 
  } catch (error) {
    console.error("Error in add new product service:", error);
    throw error; 
  }
};