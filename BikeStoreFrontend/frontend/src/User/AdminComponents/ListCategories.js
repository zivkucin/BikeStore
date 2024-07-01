import { useState, useEffect } from "react";
import axios from "axios";
import { urlCategory } from "../../endpoints";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListCategories() {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`${urlCategory}`);
          const data = response.data;
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);
    
    const deleteCategory=(categoryId) =>{
      const confirmed = window.confirm('Da li ste sigurni da zelite da obrisete kategoriju');
    
      if (confirmed) {
        const token = localStorage.getItem('jwt');
    
        axios
          .delete(`${urlCategory}/${categoryId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 204) {
              alert(`Kategorija sa ID ${categoryId} je obrisana`);
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
         {categories ? (categories.map((category) => (
           <tr key={category.categoryId}>
             <td>{category.categoryId}</td>
             <td>{category.categoryName}</td>
             <td><Link to={`/editCategory/${category.categoryId}`}>Izmeni</Link></td>
              <td ><Button onClick={()=>deleteCategory(category.categoryId)}>Obrisi</Button></td>
           </tr>
         ))) : <tr></tr>}
       </tbody>
     </Table>
    );
  }

  
  
  export default ListCategories;