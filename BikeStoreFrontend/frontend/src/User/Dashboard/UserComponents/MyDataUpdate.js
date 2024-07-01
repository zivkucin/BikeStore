import { useEffect, useState } from "react";
import axios from 'axios';
import { urlUser } from "../../../endpoints";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function MyDataUpdate({user}){

    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email:''
    });
    
      if (!user) {
        return <div>Loading...</div>;
      }

    
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
      setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        userData.email=user.email;
        try {
          const response = await axios.put(`${urlUser}/my-data`,JSON.stringify(userData), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, 
              'Content-Type': 'application/json',
            },
          });
          console.log(response)
          
          window.location.reload();
        } catch (error) {
          console.log(userData);
          alert('Error updating data');
        }
      };

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                      name="firstName"
                      placeholder={user.firstName}
                      onChange={handleInputChange}
                      required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                      name="lastName"
                      placeholder={user.lastName}
                      onChange={handleInputChange}
                      required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={user.email} disabled/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control
                      name="phoneNumber"
                      placeholder={user.phoneNumber}
                      required
                      onChange={handleInputChange}/>
                    </Form.Group>
                </Row>
            <Button variant="primary" type="submit">
              Posalji
            </Button>
            </Form>
        </>
    )
}
export default MyDataUpdate;