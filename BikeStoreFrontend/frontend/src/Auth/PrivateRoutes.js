import React, { useEffect, useState } from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { urlUser } from '../endpoints';
import { fetchUserData } from '../User/Dashboard/UserComponents/fetchUserData';

const PrivateRoutes=({children,allowedRoles, ...rest})=>{
    const location=useLocation();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRoleAllowed,setIsRoleAllowed] = useState(false);

    useEffect(() => {
      const loadUserData = async () => {
        try {
          const data = await fetchUserData(`${urlUser}`, localStorage.getItem('jwt')); // Call your fetchUserData function
          if (data) {
            setUserData(data);
            setIsRoleAllowed(allowedRoles.includes(data.userRole))
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error loading user data', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (isAuthenticated) {
        loadUserData();
      } else {
        setIsLoading(false);
      }
    }, [isAuthenticated]);

    if (isLoading) {
      
      return <div>Loading...</div>;
    }
    
    //console.log(isRoleAllowed);
    //console.log(isAuthenticated);
    if (!isAuthenticated ) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
     if (!isRoleAllowed) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
      }
    else{
      return <Outlet context={[userData]}/>;
    }
}
    


export default PrivateRoutes;