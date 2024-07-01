import { useEffect, useState } from 'react';
import {Pagination, Card, ListGroup, Col, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import { urlProducts } from '../endpoints';
import { Link } from 'react-router-dom';


function ProductGrid({categoryId, manufacturerId, search}) {
    const [activePage, setActivePage] = useState(1);
    const [products, setProducts]=useState([]);
    const [totalPages, setTotalPages] = useState();
    
  
    const handlePageClick = (pageNumber) => {
      setActivePage(pageNumber);
      // Perform any additional logic or data fetching based on the selected page
      // ...
    };
    useEffect(() => {
      if (categoryId !== null || manufacturerId !== null || search !== null) {
        setActivePage(1); 
      }
    }, [categoryId, manufacturerId, search]);

    useEffect(() => {
        const getPageData = async () => {
          try {
            const response = await axios.get(`${urlProducts}/${activePage}`, {
              params: {
                categoryId: categoryId,
                manufacturerId: manufacturerId,
                search: search
              }
            });
            // Process the response data
            setProducts(response.data.products);
            setTotalPages(response.data.pages);
          } catch (error) {
            // Handle error
            console.error('Error fetching page data:', error);
            // Handle the error as per your requirement
          }
        };
    
        getPageData();
      }, [categoryId, manufacturerId, activePage, search]);

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
  
    return (
      <div>
        <CardGroup>
        {products ? (
            products.map(product => (
            <div key={product.productId}>
              <Card style={{ width: '18rem', marginRight:'1rem', marginBottom:'1rem', height: '97%'  }}>
                <Card.Img variant="top" 
                src={product ? require(`/Users/Ana/Desktop/ERP/ERP/BikeStoreBackend/BikeStoreBackend${product.image}`) : ''}
                alt={product?.productName} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                  {product.description.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Serijski broj: {product.serialCode}</ListGroup.Item>
                  <ListGroup.Item>Cena: {product.price} dinara</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link as={Link} to={`/products/id/${product.productId}`}>Vise informacija</Card.Link>
                </Card.Body>
              </Card>
            </div>
            
            ))
          ) : (
      <div>Ni jedan proizvod ne zadovoljava kriterijume</div>
    )}
    </CardGroup>
        <br />
        <Pagination>{paginationItems}</Pagination>
      </div>
    );
  }

export default ProductGrid;