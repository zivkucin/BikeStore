import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlCategory, urlManufacturer, urlProducts, urlUser } from '../endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Card, ListGroup,Image, Row, Button } from 'react-bootstrap';
import { addItem } from '../Cart/cartHelpers';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const [category, setCategory] = useState(null);
  const [count, setCount] = useState(1);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${urlProducts}/id/${productId}`);
        setProduct(response.data);

        const manufacturerResponse = await axios.get(`${urlManufacturer}/${response.data.manufacturerId}`);
        setManufacturer(manufacturerResponse.data);

        const categoryResponse = await axios.get(`${urlCategory}/${response.data.categoryId}`);
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const orderResponse = await createOrder();
    
      const orderId = orderResponse.orderId;
      addItem(product, count, orderId, () => {
        navigate('/cart');
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const createOrder = async () => {
    const token=localStorage.getItem('jwt');
    try {
      const orderResponse = await axios.post(`${urlUser}/last_order`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return orderResponse.data;
    } catch (error) {
      throw new Error('Error creating order');
    }
  };

  const showAddToCartButton=()=>{
    const handleDecrease = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
    const handleIncrease = () => {
      if (count < product.stockLevel) {
        setCount(count + 1);
      }
    };
    return(
    <>
    <Button style={{width:'2rem', background:'red'}} onClick={handleDecrease}>-</Button>
    {count}
    <Button style={{width:'2rem', background:'red'}} onClick={handleIncrease}>+</Button>
    <Button onClick={addToCart}>Dodaj u korpu</Button>
  </>
    )
  }



  return (
    <Container style={{paddingTop:'2rem'}}>
      {product && manufacturer && category ? (
        <div>
            <h1 style={{paddingBottom:'4rem'}}>{product.productName}</h1>
            <Row style={{marginTop:'2rem', marginBottom:'2rem'}}>
            <Col sm={5}>
                <Image fluid src={product ? require(`/Users/Ana/Desktop/ERP/ERP/BikeStoreBackend/BikeStoreBackend${product.image}`) : ''}
                alt={product?.productName}></Image>
            </Col>
            <Col sm={1}/>
            <Col sm={5}>
                <Card >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Opis: {product.description}</ListGroup.Item>
                        <ListGroup.Item>Cena: {product.price} dinara</ListGroup.Item>
                        <ListGroup.Item>Serijski broj: {product.serialCode}</ListGroup.Item>
                        <ListGroup.Item>Dostupnost: <text style={{ color: getColorForStockLevel(product.stockLevel) }}>{product.stockLevel === 0? 'Nedostupno' : product.stockLevel>0 && product.stockLevel<=2 ? 'Niske zalihe' : 'Dostupno'}</text></ListGroup.Item>
                        <ListGroup.Item>Proizvodjac: {manufacturer.manufacturerName}</ListGroup.Item>
                        <ListGroup.Item>Kategorija: {category.categoryName}</ListGroup.Item>
                        {localStorage.getItem('jwt')?(
                            showAddToCartButton()
                        ): '' }
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </div>
      ) : (
        <div>Loading product details...</div>
      )}
    </Container>
  );
}
function getColorForStockLevel(stockLevel) {
    if (stockLevel === 0) {
      return 'red'; 
    } else if (stockLevel > 0 && stockLevel <= 2) {
      return 'orange';
    } else {
      return 'green'; 
    }
  }
  
export default ProductDetails;