import axios from 'axios';
import API_URL from '../config/api';

export const getProducts = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/product`, {
            params: { category },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/product`, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};