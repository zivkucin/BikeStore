import { useState, useEffect } from "react";
import { urlCategory, urlManufacturer, urlProducts } from "../../endpoints";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";



function ListProducts(){
    const [products, setProducts] = useState([]);
    const [manufacturer, setManufacturer] = useState(null);
  const [category, setCategory] = useState(null);
  const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [sortOrder, setSortOrder] = useState('asc');
    

  const fetchProducts = async (activePage) => {
    try {
      const response = await axios.get(`${urlProducts}/${activePage}`);
      setProducts(response.data.products); 
      const manufacturerResponse = await axios.get(`${urlManufacturer}`);
      setManufacturer(manufacturerResponse.data);

      const categoryResponse = await axios.get(`${urlCategory}`);
      setCategory(categoryResponse.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    }
    useEffect(() => {
        fetchProducts(activePage);
      }, [activePage]);

      const handlePageClick = (pageNumber) => {
        setActivePage(pageNumber);
      };

      let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    const sortProducts = () => {
        const sortedProducts = [...products];
    
        sortedProducts.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.productId - b.productId;
          } else {
            return b.productId - a.productId;
          }
        });
    
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      };

    return(
        <>
         <Table striped>
        <thead>
          <tr>
                <th>Id{''}<button onClick={sortProducts}>
                Sort {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            
            </th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Zalihe</th>
            <th>Serijski broj</th>
            <th>Proizvodjac</th>
            <th>Kategorija</th>
            <th>Izmeni</th>
            <th>Obrisi</th>
          </tr>
        </thead>
        <tbody>
          {products && manufacturer && category ? (products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stockLevel}</td>
              <td>{product.serialCode}</td>
              <td>{manufacturer.find((m) => m.manufacturerId === product.manufacturerId)?.manufacturerName}</td>
              <td>{category.find((c) => c.categoryId === product.categoryId)?.categoryName}</td>
              <td><Link to={`/editProduct/${product.productId}`}>Izmeni</Link></td>
              <td ><Button onClick={()=>deleteProduct(product.productId)}>Obrisi</Button></td>
            </tr>
          ))) : <tr></tr>}
        </tbody>
      </Table>
      <Pagination>{paginationItems}</Pagination>
      </>
    )

}

function deleteProduct(productId) {
  const confirmed = window.confirm('Da li ste sigurni da zelite da obrisete proizvod');

  if (confirmed) {
    const token = localStorage.getItem('jwt');

     axios
      .delete(`${urlProducts}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          alert(`Proizvod sa ID ${productId} je obrisan`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default ListProducts;