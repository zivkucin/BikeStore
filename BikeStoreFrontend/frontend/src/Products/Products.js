import { useState } from "react";
import ProductFilter from "./ProductFilter";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import ProductGrid from "./ProductGrid";
function Products(){
    const [filteredCategory, setFilteredCategory] = useState('');
    const [filteredManufacturer, setFilteredManufacturer] = useState('');
    const [searchContent, setSearchContent] = useState('');
    const [search, setSearch]=useState('');


  const handleFilter = (category, manufacturer) => {
    setFilteredCategory(category);
    setFilteredManufacturer(manufacturer);
  }
  const handleSearch = () => {
    setSearch(searchContent);
  };

  const handleChange = (event) => {
    setSearchContent(event.target.value);
  };

    return(
        <Container fluid >
            <Row>
            <Col xs lg='3' style={{padding:'3%', }}>
            <ProductFilter onFilter={handleFilter}/>
            </Col>
            <Col xs lg='8' style={{paddingTop:'2%'}}>
                <Form style={{paddingBottom:'2%'}} className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Pretraga"
                    className="me-2"
                    aria-label="Search"
                    value={searchContent}
                    onChange={handleChange}
                    />
                    <Button variant="outline-success" onClick={handleSearch}>Pretraga</Button>
                </Form>
                <ProductGrid  categoryId={filteredCategory} manufacturerId={filteredManufacturer} search={search}/>
            </Col>
            </Row>
            
        </Container>
        
    )
}

export default Products;