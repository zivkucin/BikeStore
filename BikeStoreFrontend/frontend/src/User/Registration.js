import { useState } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { urlAuth } from "../endpoints";
import { Link } from "react-router-dom";
import { validatePassword, validatePhoneNumber } from "./validateInput";

function Registration (){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber]= useState('');
  const [passwordError, setPasswordError]= useState('');
  const [numberError, setNumberError]=useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const isPasswordValid = validatePassword(event.target.value);
    setPasswordError(isPasswordValid);
  };
  const handlePhonenumberChange = (event) => {
    setPhoneNumber(event.target.value);
    const isNumberValid=validatePhoneNumber(event.target.value);
    setNumberError(isNumberValid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid === true) {
      const data = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      };
      try {
        await axios.post(`${urlAuth}/register`, data);
        console.log("success");
        resetForm();
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
      } catch (error) {
        console.error(error);
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
      }
    } else {
      alert(isPasswordValid);
    }
  };
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
            {showSuccessMessage && showSuccess()}
          {showErrorMessage && showError()}
              <h2 className="fw-bold mb-5">Registruj se</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example1">Ime</Form.Label>
                  <Form.Control
                    type="text"
                    id="form3Example1"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example2">Prezime</Form.Label>
                  <Form.Control
                    type="text"
                    id="form3Example2"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </Form.Group>


                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example3">Broj telefona</Form.Label>
                  <Form.Control
                    type="text"
                    id="form3Example3"
                    value={phoneNumber}
                    onChange={handlePhonenumberChange}
                  />
                  {numberError && <div className="text-danger">{numberError}</div>}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example4">Email adresa</Form.Label>
                  <Form.Control
                    type="email"
                    id="form3Example4"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example5">Lozinka</Form.Label>
                  <Form.Control
                    type="password"
                    id="form3Example5"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </Form.Group>

                <Button type="submit" className="btn btn-primary btn-block mb-4" >
                  Registruj se
                </Button>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section> 
  )
}

function showSuccess() {
  return (
    <div className="alert alert-info">
      Uspešno kreiran nalog. <Link to="/login">Prijavi se</Link>
    </div>
  );
}
function showError() {
  return (
    <div className="alert alert-danger">
      Nastala je greška. Pokušajte kasnije!
    </div>
  );
}

export default Registration;