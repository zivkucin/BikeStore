import React, { useState } from 'react';
import axios from 'axios';
import { urlProducts } from '../../../endpoints';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const goBack=()=>(
    <div className='mt-5'>
        <Link to='/adminDashboard' className='text-warning'>
            Nazad na kontrolni panel
        </Link>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ProductName', product.ProductName);
    formData.append('Description', product.Description);
    formData.append('Price', product.Price);
    formData.append('StockLevel', product.StockLevel);
    formData.append('SerialCode', product.SerialCode);
    formData.append('ManufacturerId', product.ManufacturerId);
    formData.append('CategoryId', product.CategoryId);
    formData.append('file', file);
    console.log([...formData.entries()]);

    try {
        const token=localStorage.getItem('jwt');
      const response = await axios.post(`${urlProducts}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Product created:', response.data);
      
    } catch (error) {
      setError('An error occurred while uploading and creating the product.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Dodaj novi proizvod</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Naziv:</label>
          <input
            type="text"
            id="productName"
            name="ProductName"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="price">Cena:</label>
          <input
            type="number"
            id="price"
            name="Price"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="description">Opis:</label>
          <input
            type="text"
            id="description"
            name="Description"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="stockLevel">Zalihe:</label>
          <input
            type="number"
            id="stockLevel"
            name="StockLevel"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="serialCode">Serijski broj:</label>
          <input
            type="text"
            id="serialCode"
            name="SerialCode"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="manufacturerId">IdProizvodjaca:</label>
          <input
            type="number"
            id="manufacturerId"
            name="ManufacturerId"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="categoryId">IdKategorije:</label>
          <input
            type="number"
            id="categoryId"
            name="CategoryId"
            onChange={handleProductChange}
          />
        </div>
        <div>
          <label htmlFor="productImage">Slika:</label>
          <input
            type="file"
            id="productImage"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Kreiraj</button>
      </form>
      {error && <p>{error}</p>}
      {goBack()}
    </div>

  );
};

export default CreateProduct;
