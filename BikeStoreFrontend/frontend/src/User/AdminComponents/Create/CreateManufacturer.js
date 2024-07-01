import { useState } from "react";
import { urlManufacturer } from "../../../endpoints";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateManufacturer(){
    const[error, setError]=useState(false);
    const[success, setSuccess]=useState(false);
    const [manufacturer, setManufacturer] = useState({});

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setManufacturer({ ...manufacturer, [name]: value });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token=localStorage.getItem('jwt');

    fetch(`${urlManufacturer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(manufacturer),
    })
      .then((response) => response.json())
      .then((data)=>{
        if(data.error){
            setError(true);
        }else{
            setError('');
            setSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const showSuccess=()=>{
    if(success){
        return <h3 className="text-success">Category is created</h3>
    }
  }
  const showError=()=>{
    if(error){
        return <h3 className="text-danger">Doslo je do greske, pokusajt ponovo kasnije</h3>
    }
  }
  const goBack=()=>(
    <div className='mt-5'>
        <Link to='/adminDashboard' className='text-warning'>
            Nazad na kontrolni panel
        </Link>
    </div>
  );

  return (
<>
    
    <Form onSubmit={handleSubmit}>
        {showSuccess()}
    {showError()}
      <label>
        Naziv proizvodjaca:
        <input type="text" name="manufacturerName" onChange={handleInputChange} required/>
      </label>
      <Button type="submit">Dodaj proizvodjaca</Button>
    </Form>
    {goBack()}
    </>
  ); 
}

export default CreateManufacturer;