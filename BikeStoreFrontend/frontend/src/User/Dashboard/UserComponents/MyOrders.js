import  {useState, useEffect} from 'react';
import { urlUser } from "../../../endpoints";
import MyOrderItems from './MyOrderItems.js';
import { CardGroup, Tab, Tabs, Col, Card, ListGroup, Container} from 'react-bootstrap';

function MyOrders({user}){
    const [orders, setOrders] = useState([]);
    const[orderItems, setOrderItems]=useState([]);
    const [activeTab, setActiveTab] = useState("moje-porudzbine");
    const [showOrderItemsTab, setShowOrderItemsTab] = useState(false);

    const [clickedOnLink, setClickedOnLink] = useState(false);

    useEffect(() => {
        // Function to fetch orders
        const fetchOrders = async () => {
          try {
            const response = await fetch(`${urlUser}/orders`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
            });
            const data = await response.json();
            setOrders(data);
            console.log(data);
      
            const orderItems = data.flatMap(order => order.orderitems);
            setOrderItems(orderItems);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
      
        fetchOrders();
      }, []);
    
      //console.log(orderItems);
      const orderStatusLabels = {
        0: 'Obrada',
        1: 'Isporuka',
        2: 'Završeno',
        3: 'Odbijeno',
      };

const showOrderItems = (orderId) => {
  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order.orderId === orderId ? { ...order, showOrderItems: true } : order
    )
  );
  setShowOrderItemsTab(true);
  setActiveTab("stavke-porudzbine");
  setClickedOnLink(true);
};

return (
  <Container style={{ padding: '0%' }}>
    {orders.length > 0 ? (
      <Tabs
        defaultActiveKey="moje-porudzbine"
        activeKey={clickedOnLink ? "stavke-porudzbine" : activeTab}
        id="fill-tab-example"
        className="mb-3"
        fill
        onSelect={(tab) => {
          setActiveTab(tab);
          setClickedOnLink(false);
        }}
      >
        <Tab eventKey="moje-porudzbine" title="Moje Porudzbine">
          <CardGroup>
            <Col sm={6}>
              {orders.map((order) => (
                <Card style={{ width: '18rem' }} key={order.orderId}>
                  <Card.Header>Broj porudžbine: {order.orderId}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Datum porudžbine: {order.orderDate}</ListGroup.Item>
                    <ListGroup.Item>Status: {orderStatusLabels[order.status]}</ListGroup.Item>
                    <ListGroup.Item>Iznos: {order.totalAmount} dinara</ListGroup.Item>
                    <ListGroup.Item>
                      <Card.Link href="#" onClick={() => showOrderItems(order.orderId)}>
                        Stavke porudžbine
                      </Card.Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              ))}
            </Col>
          </CardGroup>
        </Tab>
        <Tab eventKey="stavke-porudzbine" title="Stavke Porudzbine">
          {showOrderItemsTab && clickedOnLink ? (
            <MyOrderItems orderItems={orderItems} />
          ) :(<h3>Niste izabrali porudžbinu</h3>) }
        </Tab>
      </Tabs>
    ) : (
      <h2>Niste do sada imali porudžbina</h2>
    )}
  </Container>
);
}

export default MyOrders;