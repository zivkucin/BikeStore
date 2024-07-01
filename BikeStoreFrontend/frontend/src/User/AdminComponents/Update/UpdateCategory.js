import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlCategory } from '../../../endpoints';

const UpdateCategory = () => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({
    CategoryId: categoryId,
    CategoryName: '',
  });
  

  useEffect(() => {
    const fetchCategory = async () => {

      try {
        const response = await axios.get(`${urlCategory}/${categoryId}`);
        const fetchedCategory = response.data;

        // Populate the form fields with the fetched category data
        setCategory({
            CategoryId:fetchedCategory.categoryId,
          CategoryName: fetchedCategory.categoryName,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleCategoryChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('jwt');
        //const updatedCategory = { ...category, CategoryId: parseInt(categoryId) };
        const response = await axios.put(`${urlCategory}`, category, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Category updated:', response.data);
    } catch (error) {
      console.error(error);
      // Handle update error
    }
  };

  return (
    <div>
      <h2>Izmeni kategoriju</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Naziv kategorije:</label>
          <input
            type="text"
            id="categoryName"
            name="CategoryName"
            value={category.CategoryName}
            onChange={handleCategoryChange}
          />
        </div>
        <button type="submit">Azuriraj</button>
      </form>
    </div>
  );
};

export default UpdateCategory;

