import { useState, useEffect } from "react";
import axios from "axios";
import {  urlManufacturer } from "../../endpoints";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);
  
    useEffect(() => {
      const fetchManufacturers = async () => {
        try {
          const response = await axios.get(`${urlManufacturer}`);
          const data = response.data;
          setManufacturers(data);
        } catch (error) {
          console.error("Error fetching manufacturers:", error);
        }
      };
  
      fetchManufacturers();
    }, []);

    const deleteManufacturer=(manufacturerId)=>{
      const confirmed = window.confirm('Da li ste sigurni da zelite da obrisete proizvodjaca?');
    
      if (confirmed) {
        const token = localStorage.getItem('jwt');
    
        axios
          .delete(`${urlManufacturer}/${manufacturerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 204) {
              alert(`Proizvodjac sa ID ${manufacturerId} je obrisan`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  
    return (
        <Table striped>
       <thead>
         <tr>
            <th>Id</th>
           <th>Naziv</th>
           <th>Izmeni</th>
            <th>Obrisi</th>
         </tr>
       </thead>
       <tbody>
         {manufacturers ? (manufacturers.map((manufacturer) => (
           <tr key={manufacturer.manufacturerId}>
             <td>{manufacturer.manufacturerId}</td>
             <td>{manufacturer.manufacturerName}</td>
             <td><Link to={`/editManufacturer/${manufacturer.manufacturerId}`}>Izmeni</Link></td>
              <td ><Button onClick={()=>deleteManufacturer(manufacturer.manufacturerId)}>Obrisi</Button></td>
           </tr>
         ))) : <tr></tr>}
       </tbody>
     </Table>
    );
  }
  

  export default ListManufacturers;

  