import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListProducts from "./AdminComponents/ListProducts";
import { Button } from "react-bootstrap";
import ListCategories from "./AdminComponents/ListCategories";
import ListManufacturers from "./AdminComponents/ListManufacturers";
import ListOrders from "./AdminComponents/ListOrders";
import ListPayments from "./AdminComponents/ListPayments";
import ListUsers from "./AdminComponents/ListUsers";

function AdminDashboard(){

    const [user]=useOutletContext();

    return (
        <Tabs
          defaultActiveKey="proizvodi"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="proizvodi" title="Proizvodi">
            <Link to='/newProduct'>Dodaj novi proizvod</Link>
            <ListProducts/>
          </Tab>
          <Tab eventKey="kategorije" title="Kategorije">
            <Link to='/newCategory'>Dodaj novu kategoriju</Link>
            <ListCategories/>
          </Tab>
          <Tab eventKey="proizvodjaci" title="Proizvodjaci">
            <Link to='/newManufacturer'>Dodaj Novog proizvodjaca</Link>
            <ListManufacturers/>
          </Tab>
          <Tab eventKey="porudzbine" title="Porudzbine" >
            <ListOrders/>
          </Tab>
          <Tab eventKey="uplate" title="Uplate" >
            <ListPayments />
          </Tab>
          <Tab eventKey="korisnici" title="Korisnici" >
            <ListUsers/>
          </Tab>
        </Tabs>
      );

}

export default AdminDashboard;