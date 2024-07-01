import { useState, useEffect } from "react";
import { urlPayment } from "../../endpoints";
import { Table } from "react-bootstrap";
import axios from "axios";


function ListPayments(){
    const [payments, setPayments]=useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
          try {
            const token = localStorage.getItem("jwt");
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${urlPayment}`, { headers });
            setPayments(response.data);
          } catch (error) {
            console.error('Error fetching payments:', error);
            setPayments([]); 
          }
        };
      
        fetchPayments();
      }, []);

      return (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Porudzbine</th>
                <th>Datum uplate</th>
                <th>Iznos uplate</th>
                <th>Stripe Id</th>
              </tr>
            </thead>
            <tbody>
              {payments ?(
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                    <td>{payment.paymentId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.stripeTransactionId}</td>
                </tr>
            
              ))): ""
            }
            </tbody>
          </Table>
        </>
      );
}
export default ListPayments;
