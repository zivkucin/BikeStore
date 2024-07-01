import Form from 'react-bootstrap/Form';
import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { validatePassword } from '../../validateInput';
import axios from 'axios';
import { urlUser } from '../../../endpoints';

function UpdatePassword(){

    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError]= useState('');

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        const isPasswordValid = validatePassword(event.target.value);
        setPasswordError(isPasswordValid);
    };
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };
    const resetForm=()=>{
        setNewPassword('');
        setOldPassword('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const passwordUpdate = {
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
    
        try {
          const response = await axios.patch(`${urlUser}/my-data/password`, passwordUpdate, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json',
            },
          });
    
          resetForm();
          console.log(response.data); // Handle the response data as needed
          
          
        } catch (error) {
          console.error(error);
          alert("Doslo je do greske pokusajte ponovo")
        }
      };

    return(
    <>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
            <Form.Label htmlFor="form3Example5">Stara Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    id="form3Example5"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    required
                  />
                  
        </Form.Group>
        <Form.Group className="mb-4">
                  <Form.Label htmlFor="form3Example6">Nova Lozinka</Form.Label>
                  <Form.Control
                    type="password"
                    id="form3Example6"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </Form.Group>
    
        <Button type="submit" className="btn btn-primary btn-justify" >
                  Promeni lozinku
        </Button>
    </Form>
      
    </>
    )
}

export default UpdatePassword;