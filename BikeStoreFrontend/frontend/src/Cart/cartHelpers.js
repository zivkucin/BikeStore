import axios from "axios";
import { urlOrderItem } from "../endpoints";


export const addItem = async (product, count, orderId, callback) => {
    try {
      const item = {
        productId: product.productId,
        orderId: orderId,
        quantity: count,
      };
      const token=localStorage.getItem('jwt');
  
      const response = await axios.post(`${urlOrderItem}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      callback(); 
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
};





