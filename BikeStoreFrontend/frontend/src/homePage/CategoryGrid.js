import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urlCategory } from '../endpoints';
import {Link} from 'react-router-dom';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    axios.get(`${urlCategory}`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  
return (
    <div className="container mb-8 pt-8">
      <div className='row justify-content-md-center'>
        {categories.map(category => (
          <div key={category.categoryId} className="text-center col col-lg-4">
            <img
              src='./13DD5798-1A0B-478A-A3B6-5ED9E733DBD6_1_201_a-removebg-preview.png'
              alt={category.categoryName}
              className="img-thumbnail rounded"
              style={{ width: '60%' }}
            />
            <h3 className="category-title" style={{color:'black'}}>{category.categoryName}</h3>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/products" className="btn btn-danger btn-lg mt-4">Pogledajte celokupnu ponudu</Link>
      </div>
    </div>
  );
}

export default CategoryGrid;
