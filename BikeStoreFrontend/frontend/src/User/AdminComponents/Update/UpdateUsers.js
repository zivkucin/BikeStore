import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlOrder, urlUser } from '../../../endpoints';

const UpdateUsers = () => {
  const { userId } = useParams();

  const [user, setUser] = useState({
    UserId: '',
    FirstName:'',
    LastName:'',
    Email:'',
    PhoneNumber:'',
    UserRole:0
  });
  

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const token=localStorage.getItem('jwt');
        const response = await axios.get(`${urlUser}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const fetchedUser = response.data;

        setUser({
            UserId: fetchedUser.userId,
            FirstName:fetchedUser.firstName,
            UserRole:fetchedUser.userRole,
            LastName:fetchedUser.lastName,
            Email:fetchedUser.email,
            PhoneNumber:fetchedUser.phoneNumber,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleRoleChange = (e) => {
    const selectedRole = parseInt(e.target.value);
    
    setUser({ ...user, UserRole:selectedRole  });
    console.log(user)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.put(`${urlUser}`, user, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User updated:', response.data);
    } catch (error) {
      console.error(error);
      // Handle update error
    }
  };

  return (
    <div>
      <h2>Izmeni korisnika</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="userId">id korisnika:</label>
          <input
            type="text"
            id="userId"
            name="UserId"
            value={user.UserId}
            readOnly
          />
        </div>
      <div>
          <label htmlFor="firstName">Ime:</label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            value={user.FirstName}
            readOnly
          />
        </div>
      <div>
          <label htmlFor="lastName">Prezime:</label>
          <input
            type="text"
            id="lastName"
            name="LastName"
            value={user.LastName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Broj telefona:</label>
          <input
            type="text"
            id="phoneNumber"
            name="PhoneNumber"
            value={user.PhoneNumber}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="userRole">Uloga:</label>
          <select
            id="userRole"
            name="UserRole"
            value={user.UserRole}
            onChange={handleRoleChange}
          >
            <option value="">Odaberi ulogu</option>
            <option value={0}>Kupac</option>
            <option value={1}>Admin</option>
          </select>
        </div>
        <button type="submit">Azuriraj</button>
      </form>
    </div>
  );
};

export default UpdateUsers;