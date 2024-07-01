import { useState, useEffect } from 'react';
import axios from 'axios';
import { urlCategory, urlManufacturer } from '../endpoints';
import { Button, Form } from 'react-bootstrap';

const ProductFilter = ({onFilter}) => {
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');

  useEffect(() => {
    // Fetch categories and manufacturers from the backend
    axios.get(`${urlCategory}`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get(`${urlManufacturer}`)
      .then(response => setManufacturers(response.data))
      .catch(error => console.error('Error fetching manufacturers:', error));
  }, []);


  const handleFilter = () => {
    onFilter(selectedCategory, selectedManufacturer);
    
  };
  const resetFilter = () => {
    setSelectedCategory('');
    setSelectedManufacturer('');
    onFilter('', '');
    
  };

  return (
    <Form>
      <div key='checkbox' className="mb-3">
        <Form.Label>Kategorije:</Form.Label>
        {categories.map(category => (
          <Form.Check      
            key={category.categoryId}
            type="checkbox"
            id={`category-checkbox-${category.categoryId}`}
            label={category.categoryName}
            value={category.categoryId}
            checked={selectedCategory === category.categoryId}
            onChange={()=>setSelectedCategory(category.categoryId)}
          />
        ))}
      </div>

      <div key='checkbox2' className="mb-3">
        <Form.Label>Proizvodjaci:</Form.Label>
        {manufacturers.map(manufacturer => (
          <Form.Check
            key={manufacturer.manufacturerId}
            type="checkbox"
            id={`manufacturer-checkbox-${manufacturer.manufacturerId}`}
            label={manufacturer.manufacturerName}
            value={manufacturer.manuifacturerId}
            checked={selectedManufacturer ===  manufacturer.manufacturerId}
            onChange={()=>setSelectedManufacturer(manufacturer.manufacturerId)}
            
          />
        ))}
      </div>

      <Button style={{marginBottom:'2rem'}} type="button" onClick={handleFilter}>
        Primeni Filter
      </Button>
      <Button type="button" onClick={resetFilter}>
        Resetuj Filter
      </Button>
    </Form>
  );
};

export default ProductFilter;