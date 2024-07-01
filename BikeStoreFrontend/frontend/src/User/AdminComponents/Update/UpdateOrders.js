import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlOrder } from '../../../endpoints';

const UpdateOrders = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState({
    OrderId: orderId,
    UserId: '',
    OrderDate:'',
    Status:0,
    ShippingId:'',
    TotalAmount:'',
  });
  

  useEffect(() => {
    const fetchOrder = async () => {

      try {
        const token=localStorage.getItem('jwt');
        const response = await axios.get(`${urlOrder}/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const fetchedOrder = response.data;
        console.log(fetchedOrder);

        setOrder({
            OrderId: fetchedOrder.orderId,
            UserId: fetchedOrder.userId,
            OrderDate:fetchedOrder.orderDate,
            Status:fetchedOrder.status,
            ShippingId:fetchedOrder.shippingId,
            TotalAmount:fetchedOrder.totalAmount,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleOrderStatusChange = (e) => {
    const selectedStatus = parseInt(e.target.value);
    
    setOrder({ ...order, Status:selectedStatus  });
    console.log(order)
  };

  console.log(order);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.put(`${urlOrder}`, order, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('order updated:', response.data);
    } catch (error) {
      console.error(error);
      // Handle update error
    }
  };
  const orderStatusLabels = {
    0: 'Obrada',
    1: 'Isporuka',
    2: 'Završeno',
    3: 'Odbijeno',
    4: 'U_procesu',
  };

  return (
    <div>
      <h2>Izmeni porudzbinu</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="orderId">id porudzbine:</label>
          <input
            type="text"
            id="orderId"
            name="OrderId"
            value={order.OrderId}
            readOnly
          />
        </div>
      <div>
          <label htmlFor="userId">id korisnika:</label>
          <input
            type="text"
            id="userId"
            name="UserId"
            value={order.UserId}
            readOnly
          />
        </div>
      <div>
          <label htmlFor="orderDate">Datum porudzbine:</label>
          <input
            type="date"
            id="orderDate"
            name="OrderDate"
            value={order.OrderDate}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="status">Status porudžbine:</label>
          <select
            id="status"
            name="Status"
            value={order.Status}
            onChange={handleOrderStatusChange}
          >
            <option value="">Odaberi status</option>
            <option value={0}>Obrada</option>
            <option value={1}>Isporuka</option>
            <option value={2}>Završeno</option>
            <option value={3}>Odbijeno</option>
            <option value={4}>U_procesu</option>
          </select>
        </div>
        <div>
          <label htmlFor="shippingId">id adrese:</label>
          <input
            type="text"
            id="shippingId"
            name="ShippingId"
            value={order.ShippingId}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="totalAmount">Ukupan iznos:</label>
          <input
            type="number"
            id="totalAmount"
            name="TotalAmount"
            value={order.TotalAmount}
            readOnly
          />
        </div>
        <button type="submit">Azuriraj</button>
      </form>
    </div>
  );
};

export default UpdateOrders;