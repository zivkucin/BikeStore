import { useState } from "react";
import { urlCategory } from "../../../endpoints";
import { Link } from "react-router-dom";

function CreateCategory(){

    const [category, setCategory] = useState({});

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token=localStorage.getItem('jwt');

    fetch(`${urlCategory}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
  const goBack=()=>(
    <div className='mt-5'>
        <Link to='/adminDashboard' className='text-warning'>
            Nazad na kontrolni panel
        </Link>
    </div>
  );


  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input type="text" name="categoryName" onChange={handleInputChange} />
      </label>
      <button type="submit">Create Category</button>
    </form>
    {goBack()}
    </>
  ); 
}

export default CreateCategory;