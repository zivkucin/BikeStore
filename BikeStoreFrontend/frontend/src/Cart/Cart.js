import  { useEffect, useState } from 'react';
import { urlProducts, urlUser } from '../endpoints';
import axios from 'axios';
import { Button, Card, CardGroup, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [order, setOrder] = useState(null);
    const[products, setProducts]=useState(null);
  
    useEffect(() => {
  const fetchOrderInProgress = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${urlUser}/last_order`, null, config);
      setOrder(response.data);
      const productIds = response.data.orderitems.map((item) => item.productId);
      const encodedIds = productIds.map((id) => encodeURIComponent(id));
      const productsResponse = await axios.get(`${urlProducts}/ids/${encodedIds.join('%2C')}`, config);
      setProducts(productsResponse.data);
    } catch (error) {
        console.log('korpa je parazna');
      console.error('Error fetching order in progress:', error);
    }
  };

  fetchOrderInProgress();
}, []);


const deleteOrderItem = (orderItemId) => {
    const token = localStorage.getItem('jwt'); // Replace with your actual token
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    axios
      .delete(`${urlUser}/orderitems/${orderItemId}`, { headers })
      .then((response) => {
        console.log('Order item deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        
        console.error('Error deleting order item:', error);
      });
  };


    if (!order) {
        return <div>Loading...</div>;
      }
      console.log(order.orderitems);
      const totalItems = order.orderitems.reduce((total, item) => total + item.quantity, 0);
      
      
    return(
<Container style={{paddingLeft:'10%', marginTop:'5%'}}>
    <h1>Korpa</h1>
        <CardGroup>
    {products ? (
      products.map((product, index) => (
        <div key={product.productId}>
          <Card style={{ width: '18rem', marginRight: '1rem', marginBottom: '1rem', height: '97%' }}>
            <Card.Img
              variant="top"
              src={product ? require(`/Users/Ana/Desktop/ERP/ERP/BikeStoreBackend/BikeStoreBackend${product.image}`) : ''}
              alt={product?.productName}
            />
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>
                {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Serijski broj: {product.serialCode}</ListGroup.Item>
              <ListGroup.Item>Cena: {product.price} dinara</ListGroup.Item>
              <ListGroup.Item>Kolicina: {order.orderitems[index].quantity}</ListGroup.Item>
            </ListGroup>
            <Button variant="danger" onClick={() => deleteOrderItem(order.orderitems[index].orderItemId)}>Ukloni</Button>
          </Card>
          
        </div>
      ))
    ) : (
      <div style={{marginBottom:'19%'}} >Korpa je prazna</div>
    )}
  </CardGroup>
  {totalItems>0?(<ListGroup style={{width:'25rem'}}>
    <ListGroup.Item><h2>Ukupna kolicina:</h2> {totalItems}</ListGroup.Item>
      <ListGroup.Item><h2>Ukupan iznos:</h2>{order.totalAmount} dinara</ListGroup.Item>
      <ListGroup.Item><h2>Nastavi ka naplati :</h2><Link to={`/shippingInfo/${order.orderId}`} state={{order: order, products:products}}>Informacije za slanje</Link></ListGroup.Item>
    </ListGroup>):''}
  
    
  </Container>
        
    )  
};


export default Cart;