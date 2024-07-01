import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
function MyData({user}){
    return(
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control placeholder={user.firstName} disabled/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control placeholder={user.lastName} disabled/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder={user.email} disabled/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control placeholder={user.phoneNumber || 'Nepoznato'} disabled/>
                    </Form.Group>
                </Row>
            
            </Form>
        </>
    )
}
export default MyData;