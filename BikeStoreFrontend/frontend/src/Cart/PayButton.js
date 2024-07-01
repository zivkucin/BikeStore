import { Button } from "react-bootstrap";
import { urlStripe } from "../endpoints";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

function PayButton({cartItems,products, shippingInfo}){

    const [userData]=useOutletContext();
    console.log(cartItems);
    console.log(products);

    const totalItems = cartItems.orderitems.reduce((total, item) => total + item.quantity, 0);
    console.log(totalItems);

    const handlePayment = async () => {
        // Extract order item data and adjust unitAmount if needed
        const orderItems = cartItems.orderitems.map((item) => {
          
          const product = products.find((p) => p.productId === item.productId);
          const unitAmount = totalItems>=2 ? product.price * 0.85 : product.price;
          const unitPrice=parseInt(unitAmount*100);
          return {
            Name: product.productName,
            UnitAmount:unitPrice,
            Quantity: item.quantity,
          };
        });
        

        const requestBody={
            orderItems,
            orderId: cartItems.orderId,
            address: shippingInfo.address,
            city:shippingInfo.city,
            zipCode:shippingInfo.zipCode,
            country:shippingInfo.country,
        }

        //console.log(orderItems);
        console.log(JSON.stringify(requestBody))

        try {
            console.log('nesto se desava')
           
            const response = await fetch(`${urlStripe}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(requestBody),
                
              });
              const url = await response.text();
              console.log(url);
              window.location.href = url;
                          
          } catch (error) {
            console.log(error);
            return(
                <div className="danger">
                    <h1>Doslo je do greske</h1>
                </div>
            );
          }
        }


    return(
        <>
            <Button onClick={handlePayment} >Plati</Button>
        </>
    )
}

export default PayButton;