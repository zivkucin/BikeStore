import { Button, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
function Unauthorized(){
    const navigate=useNavigate();
    return (
        <Container fluid style={{marginTop: '13%', marginBottom:'12.6%', paddingLeft:'30%'}}>
            <h1>Nemate dozvoljen pristup!!!</h1>
            <Button onClick={()=>navigate(-1)}>Vratite se nazad</Button>
        </Container>
    );
}

export default Unauthorized