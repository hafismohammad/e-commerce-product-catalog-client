import axios from "axios";
import API_URL from "../axios/API_URL";

export const addProductService = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('response', response);
    
    return response.data; 
  } catch (error) {
    console.error("Error in add new product service:", error);
    throw error; 
  }
};
