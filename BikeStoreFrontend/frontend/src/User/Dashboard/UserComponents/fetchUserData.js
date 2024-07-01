import axios from "axios";

export const fetchUserData= async(urlUser, jwt)=>{
    try {
        const response = await axios.get(`${urlUser}/my-data`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        return response.data;
      } catch (error) {
        throw new Error('Error loading data');
      }
};