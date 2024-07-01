import React, { useEffect, useState } from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';
import { urlProducts } from '../../../endpoints';

function MyOrderItems({ orderItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const response = await axios.get(`${urlProducts}/id/${productId}`);
        const product = response.data;
        return product;
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    };
  
    const fetchOrderItemProducts = async () => {
        const productPromises = orderItems.map(async (orderItem) => {
          const product = await fetchProductById(orderItem.productId);
          return product;
        });
        const products = await Promise.all(productPromises);
        setProducts(products);
        //console.log(products);
      };
      
      fetchOrderItemProducts();
  }, []);

  

  return (
    <Container style={{ padding: '0%' }}>
        <CardGroup>
    {orderItems.map((orderItem, index) => {
    const product = products[index];

    return (
          <Card style={{ width: '40%', marginRight:'5%' }}>
            <Card.Img
              variant="top"
              src={product ? require(`/Users/Ana/Desktop/ERP/ERP/BikeStoreBackend/BikeStoreBackend${product.image}`) : ''}
              alt={product?.productName}
            />
            <Card.Body>
              <Card.Title>Porudžbina broj: {orderItem.orderId}</Card.Title>
              <Card.Text>Naziv: {product?.productName}</Card.Text>
              <Card.Text>Serijski kod: {product?.serialCode}</Card.Text>
              <Card.Text>Kolicina: {orderItem.quantity}</Card.Text>
            </Card.Body>
          </Card>
      
    );
  })}
  </CardGroup> 
</Container>
  );
  
}

export default MyOrderItems;
