import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { urlOrder, urlShipping } from "../../endpoints";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [shippingInfo, setShippingInfo]= useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwt"); 
        const headers =  { Authorization: `Bearer ${token}` }; 
        const response = await axios.get(`${urlOrder}`, { headers });
        const shipingResponse= await axios.get(`${urlShipping}`, {headers});
        setOrders(response.data);
        setShippingInfo(shipingResponse.data);
      } catch (error) {
        console.error('Error fetching :', error);
      }
    };

    fetchOrders();
  }, []);

  const getAddressByShippingId = (shippingId) => {
    const shipping = shippingInfo.find((info) => info.shippingId === shippingId);
    if (shipping) {
      const { address, city, zipCode, country } = shipping;
      return `${address}, ${city}, ${zipCode}, ${country}`;
    }
    return "";
  };
  

  const orderStatusLabels = {
    0: 'Obrada',
    1: 'Isporuka',
    2: 'Završeno',
    3: 'Odbijeno',
    4: 'U_procesu',
  };
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum porudzbine</th>
            <th>Iznos porudzbine</th>
            <th>Status porudzbine</th>
            <th>Id uplate</th>
            <th>Adresa</th>
            <th>idProizvoda(kolicina)</th>
            <th>Izmeni</th>
            <th>Obrisi</th>
          </tr>
        </thead>
        <tbody>
          {orders && shippingInfo ?(
          orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.orderDate}</td>
              <td>{order.totalAmount}</td>
              <td>{orderStatusLabels[order.status]}</td>
            <td>{order.payments.map((payment) => (
            <div key={payment.paymentId}>Id: {payment.paymentId}, StripeId: {payment.stripeTransactionId}</div>
          ))}</td>
              <td>{getAddressByShippingId(order.shippingId)}</td>
              <td>
            {order.orderitems.map((item) => (
              <div key={item.orderItemId}>
                ProizvodId: {item.productId}, Kolicina: {item.quantity}
              </div>
            ))}
          </td>
          <td><Link to={`/editOrder/${order.orderId}`}>Izmeni</Link></td>
          <td><Button onClick={()=>deleteOrder(order.orderId)}>Obrisi</Button></td>
    </tr>
        
          ))): ""
        }
        </tbody>
      </Table>
    </>
  );
}

function deleteOrder(orderId){
  const confirmed = window.confirm('Da li ste sigurni da zelite da obrisete porudzbinu');

  if (confirmed) {
    const token = localStorage.getItem('jwt');

    axios
      .delete(`${urlOrder}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          alert(`Porudzbina sa ID ${orderId} je obrisan`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

}



export default ListOrders;