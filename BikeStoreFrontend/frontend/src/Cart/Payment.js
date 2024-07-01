import { Button, Container, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PayButton from "./PayButton";

function Payment(){
    const location=useLocation();
    const shippingInfo=location.state?.shippingInfo;
    console.log(shippingInfo);
    const cartitems=location.state?.cartitems;
    const products=location.state?.products;
    //console.log(cartitems);
    console.log(products);


    return(
        <Container>
            <h1 style={{paddingTop:'2rem'}}>Pregled porudzbine</h1>
            <Form style={{width:'25rem', paddingTop:'2rem', marginLeft:'30%'}}>
            <h2></h2>
            <br/>
            <Form.Label>Adresa za isporuku</Form.Label>
            <Form.Control type="text"  value={shippingInfo.address + ', ' + shippingInfo.zipCode + ', ' +shippingInfo.city +', '+shippingInfo.country} disabled/>
            <br />
            <Form.Label>Stavke porudzbine: </Form.Label>
            {products.map((product) => (<>
          <Form.Control
            key={product.productId}
            type="text"
            value={`${product.productName} - kolicina ${cartitems.orderitems.find((item) => item.productId === product.productId).quantity}`}
            disabled
          /><br/>
          </>
        ))}
            <Form.Label>Ukupna vrednost: </Form.Label>
            <Form.Control type="text"  value={cartitems.totalAmount} disabled/>
            <br />
            <PayButton shippingInfo={shippingInfo} cartItems={cartitems} products={products}/>
            <br/>
            </Form>

            
            
        </Container>
    )

}

export default Payment;