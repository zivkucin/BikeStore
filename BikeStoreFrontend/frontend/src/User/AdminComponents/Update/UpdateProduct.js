import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlProducts } from '../../../endpoints';


const UpdateProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    ProductId: productId,
    ProductName: '',
    Description: '',
    Price: 0,
    StockLevel: 0,
    SerialCode: '',
    ManufacturerId: 0,
    CategoryId: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${urlProducts}/id/${productId}`);
        const fetchedProduct = response.data;
        setProduct({
            ProductId: fetchedProduct.productId,
            ProductName: fetchedProduct.productName,
            Description: fetchedProduct.description,
            Price: fetchedProduct.price,
            StockLevel: fetchedProduct.stockLevel,
            SerialCode: fetchedProduct.serialCode,
            ManufacturerId: fetchedProduct.manufacturerId,
            CategoryId: fetchedProduct.categoryId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwt');

      const response = await axios.put(`${urlProducts}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Product updated:', response.data);
    } catch (error) {
      console.error(error);
      // Handle update error
    }
  };

  return (
    <div>
      <h2>Izmeni proizvod </h2>
      {product ? (<form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Naziv:</label>
          <input
            type="text"
            id="productName"
            name="ProductName"
            value={product.ProductName}
            onChange={handleProductChange}
          />
        </div>
      <div>
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          name="Description"
          value={product.Description}
          onChange={handleProductChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          name="Price"
          value={product.Price}
          onChange={handleProductChange}
        />
      </div>
      <div>
        <label htmlFor="stockLevel">Zalihe:</label>
        <input
          type="number"
          id="stockLevel"
          name="StockLevel"
          value={product.StockLevel}
          onChange={handleProductChange}
        />
      </div>
      <div>
        <label htmlFor="serialCode">Serijski broj:</label>
        <input
          type="text"
          id="serialCode"
          name="SerialCode"
          value={product.SerialCode}
          onChange={handleProductChange}
        />
      </div>
      <div>
        <label htmlFor="manufacturerId">Proizvodjac ID:</label>
        <input
          type="number"
          id="manufacturerId"
          name="ManufacturerId"
          value={product.ManufacturerId}
          onChange={handleProductChange}
        />
      </div>
      <div>
        <label htmlFor="categoryId">Kategorija ID:</label>
        <input
          type="number"
          id="categoryId"
          name="CategoryId"
          value={product.CategoryId}
          onChange={handleProductChange}
        />
      </div>
        <button type="submit">Update</button>
      </form>) : <div>Loading</div>}
      
    </div>
  );
};

export default UpdateProduct;
