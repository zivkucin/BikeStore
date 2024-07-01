import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { urlShipping } from "../endpoints";
import { Button, Form} from "react-bootstrap";
import PayButton from "./PayButton";

function ShippingInfo(){
    const { orderId } = useParams();
    const [shippingInfo, setShippingInfo]= useState(null);
    const location=useLocation();
    const order=location.state?.order;
    const products=location.state?.products;


    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        /*const token = localStorage.getItem('jwt');
    
        axios
        .post(`${urlShipping}`, shippingInfo, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            console.log('Shipping info created successfully');
          })
          .catch((error) => {
            // Handle error, such as displaying an error message or logging the error
            console.error('Error creating shipping info:', error);
          });*/


      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo((prevShippingInfo) => ({
          ...prevShippingInfo,
          [name]: value
        }));
      };

      function areFieldsEmpty() {
        if (!shippingInfo) {
          return true; 
        }
      
        for (const key in shippingInfo) {
          if (!shippingInfo[key] || shippingInfo[key].trim() === '') {
            return true;
          }
        }
      
        return Object.keys(shippingInfo).length !== 4; 
      }
      
      //console.log(order);
      //console.log(products);
      return (
        <>
        <Form style={{width:'25rem', paddingTop:'5rem', marginLeft:'30%'}} >
            <h1>Informacije za slanje</h1>
            <br/>
          <Form.Control type="text" name="address" placeholder="Adresa" onChange={handleChange} required/>
            <br />
            <Form.Control type="text" name="city" placeholder="Grad" onChange={handleChange} required/>
            <br />
            <Form.Control type="text" name="country" placeholder="Drzava" onChange={handleChange} required/>
            <br />
            <Form.Control type="text" name="zipCode" placeholder="Postanski broj" onChange={handleChange} required/>
            <br />
    
            <Link to={'/payment'} state={{cartitems:order, products:products, shippingInfo:shippingInfo }}><Button  disabled={areFieldsEmpty()}>Naplata</Button><br></br></Link>        
      
        </Form>
        <br/>
        </>
      );
}

export default ShippingInfo;