import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound(){
    return (
        <Container style={{paddingTop:'15%', paddingBottom:'15%'}}><h2>Stranica ne postoji Vratite se na pocetnu stranicu</h2>
        <Link to='/'>Pocetna stranica</Link>
        </Container>
        
    )
}

export default NotFound;