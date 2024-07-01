import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlUser } from '../../../endpoints';
import { CardGroup, Col, Card, ListGroup, Container} from 'react-bootstrap';

function MyShippingInfo({user}){
    const [shippingInfo, setShippingInfo] = useState(null);

    useEffect(() => {
        const fetchShippingInfo = async () => {
          try {
            const response = await axios.get(`${urlUser}/shipping`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
              }
            });
            const data = response.data;
            setShippingInfo(data);
            //console.log(shippingInfo);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchShippingInfo();
      }, []);

      return (
        <Container style={{ padding: '0%' }}>
          {shippingInfo ? (
            <CardGroup>
            <Col sm={6}>
              {shippingInfo.map((shipping) => (
                <Card style={{ width: '18rem' }} key={shipping.shippingId}>
                  <Card.Header>Identifikacioni broj: {shipping.shippingId}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Drzava: {shipping.country}</ListGroup.Item>
                    <ListGroup.Item>Grad: {shipping.city}</ListGroup.Item>
                    <ListGroup.Item>Postanski kod: {shipping.zipCode} </ListGroup.Item>
                    <ListGroup.Item>Adresa: {shipping.address} </ListGroup.Item>
                    {shipping.orders.length > 0 ? (
                    <ListGroup.Item>Porudzbine broj: {shipping.orders.map(order => order.orderId).join(' , ')}</ListGroup.Item>
                    ) : (
                    <ListGroup.Item>Nema porudzbina</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              ))}
            </Col>
          </CardGroup>
          ) : (
            <p>Loading shipping information...</p>
          )}
        </Container>
      );
}

export default MyShippingInfo;