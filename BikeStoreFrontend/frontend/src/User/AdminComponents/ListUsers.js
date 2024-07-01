import { useState, useEffect } from "react";
import { urlUser } from "../../endpoints";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";


function ListUsers(){
    const [users, setUsers]=useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem("jwt");
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${urlUser}`, { headers });
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching payments:', error); 
          }
        };
      
        fetchUsers();
      }, []);

      const userLabel = {
        0: 'Kupac',
        1: 'Admin',
      };

      return (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Email</th>
                <th>Broj telefona</th>
                <th>Uloga</th>
                <th>Izmeni</th>
                <th>Obrisi</th>
              </tr>
            </thead>
            <tbody>
              {users ?(
              users.map((user) => (
                <tr key={user.userId}>
                    <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{userLabel[user.userRole]}</td>
                  <td><Link to={`/editUser/${user.userId}`}>Izmeni</Link></td>
                  <td><Button onClick={()=>deleteUser(user.userId)}>Obrisi</Button></td>
                </tr>
            
              ))): ""
            }
            </tbody>
          </Table>
        </>
      );
}
function deleteUser(userId){
  const confirmed = window.confirm('Da li ste sigurni da zelite da obrisete korisnika');

  if (confirmed) {
    const token = localStorage.getItem('jwt');

    axios
      .delete(`${urlUser}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          alert(`Korisnik sa ID ${userId} je obrisan`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

export default ListUsers;
