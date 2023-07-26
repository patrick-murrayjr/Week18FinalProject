import { Container, Row, Col } from 'react-bootstrap';

function Orders() {
   return (
      <Container fluid='lg' className='mb-5 p-5'>
         <Row>
            <Col>
               <div className='fs-2 mx-auto'>
                  <h2 className='text-center'>Orders</h2>
               </div>
            </Col>
         </Row>
      </Container>
   );
}

export default Orders;
