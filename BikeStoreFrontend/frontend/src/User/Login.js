import { useState, useContext } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { urlAuth, urlUser } from "../endpoints";
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../AuthContext/authContext";
import { fetchUserData } from "./Dashboard/UserComponents/fetchUserData";

function Login (){
  const authContext=useContext(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
      const data = {
        email,
        password,
      };
      try {
        const response = await axios.post(`${urlAuth}/login`, data);
        localStorage.setItem('jwt',response.data);
        //localStorage.setItem('role', user.userRole); // store token in local storage
        console.log('success');
        resetForm();
        //authContext.setRole();
        authContext.setIsAuthenticated(true);
        //redirectUser(localStorage.getItem('isAuthenticated'),localStorage.getItem('role'));
        //window.location.reload();
        navigate('/userDashboard');
      } catch (error) {
        console.error(error);
        alert("Došlo je do greške, pokušajte ponovo.");
      }
    
  };

  if(authContext.isAuthenticated){
    return <div style={{height:'30rem', textAlign:'center', paddingTop:'12rem'}}>
      <h1>Vec ste ulogovani</h1>
      <Link to='/products' style={{color:'red'}}><h2>Pogledajte ponudu</h2></Link>
    </div>
  }

  return (
    <section className="text-center">
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2021/09/01/23/40/bicycles-6592413_960_720.jpg')",
          height: '300px',
        }}
      ></div>

      <Card className="mx-4 mx-md-4 shadow-5-strong" style={{ marginTop: '-100px'}}>
        <Card.Body className="py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4">
              <h2 className="fw-bold mb-5">Prijavi se</h2>
              <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example1">Email adresa</Form.Label>
                  <Form.Control
                    type="email"
                    id="form3Example1"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example2">Lozinka</Form.Label>
                  <Form.Control
                    type="password"
                    id="form3Example2"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn btn-primary btn-block mb-4" >
                  Prijavi se
                </Button>
                <Link to="/register" className="btn-link">Nemate nalog? Registrujte se!</Link>

              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section> 
  );
};


export default Login;