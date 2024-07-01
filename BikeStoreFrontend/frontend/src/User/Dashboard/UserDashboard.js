import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import MyData from './UserComponents/MyData';
import MyDataUpdate from './UserComponents/MyDataUpdate';
import UpdatePassword from './UserComponents/UpdatePassword';
import MyOrders from './UserComponents/MyOrders';
import MyShippingInfo from './UserComponents/MyShippingInfo';
import { useEffect, useState } from 'react';
import { fetchUserData } from './UserComponents/fetchUserData';
import { urlUser } from '../../endpoints';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function UserDashboard(){

  const [user]=useOutletContext();
  const navigate=useNavigate();
  
  /*useEffect(() => {
    const fetchData = async () => {
      try {
          const jwt = localStorage.getItem('jwt');
          const data = await fetchUserData(urlUser, jwt);
          setUser(data);
          return data;
          }
          catch (error) {
            alert(error.message);
          }
    };
    fetchData();
  }, []);
*/

  const tabs = [
    { title: 'Moji podaci', component: <MyData user={user} /> },
    { title: 'Ažuriraj podatke', component: <MyDataUpdate user={user}/> },
    { title: 'Ažuriraj lozinku', component: <UpdatePassword /> },
    { title: 'Moje porudžbine', component: <MyOrders user={user}/> },
    { title: 'Moje adrese za isporuku', component: <MyShippingInfo user={user}/> }
  ];

    const renderTabPanes = () => {
        return tabs.map((tab, index) => (
          <Tab.Pane key={index} eventKey={`tab-${index}`}>
            <h1>{tab.title}</h1>
            {tab.component}
          </Tab.Pane>
        ));
      };

      const renderNavLinks = () => {
        return tabs.map((tab, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={`tab-${index}`}>{tab.title}</Nav.Link>
          </Nav.Item>
        ));
      };
      

  
    return (
    <div style={{ margin: '4% 4% 4% 10%' }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="tab-0">
        <Row>
          <Col sm={4}><h1>Dobrodošli!</h1></Col>
          {user.userRole===1?(
            <Col sm={4}><Button onClick={()=>navigate('/adminDashboard')}> Admin Panel</Button></Col>
          ):''}
          
        
        </Row>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {renderNavLinks()}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {renderTabPanes()}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );

}

export default UserDashboard;