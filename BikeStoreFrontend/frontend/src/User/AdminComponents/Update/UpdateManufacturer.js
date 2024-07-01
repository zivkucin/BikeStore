import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlManufacturer } from '../../../endpoints';

const UpdateManufacturer = () => {
  const { manufacturerId } = useParams();

  const [manufacturer, setManufacturer] = useState({
    ManufacturerId: manufacturerId,
    ManufacturerName: '',
  });
  

  useEffect(() => {
    const fetchManufact = async () => {

      try {
        const response = await axios.get(`${urlManufacturer}/${manufacturerId}`);
        const fetchedManuf = response.data;

        setManufacturer({
            ManufacturerId:fetchedManuf.manufacturerId,
          ManufacturerName: fetchedManuf.manufacturerName,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchManufact();
  }, [manufacturerId]);

  const handleChange = (e) => {
    setManufacturer({ ...manufacturer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.put(`${urlManufacturer}`, manufacturer, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('manufacturer updated:', response.data);
    } catch (error) {
      console.error(error);
      // Handle update error
    }
  };

  return (
    <div>
      <h2>Izmeni proizvodjaca</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="manufacturerName">Naziv proizvodjaca:</label>
          <input
            type="text"
            id="manufacturerName"
            name="ManufacturerName"
            value={manufacturer.ManufacturerName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Azuriraj</button>
      </form>
    </div>
  );
};

export default UpdateManufacturer;
