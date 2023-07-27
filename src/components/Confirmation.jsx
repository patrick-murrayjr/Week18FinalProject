import { Container, Col, Row, Table, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ShopContext } from './ShopContext';
import { useNavigate } from 'react-router-dom';

function Confirmation() {
   const { products, orderDetails } = useContext(ShopContext);
   const navigate = useNavigate();
   console.log(orderDetails);
   return (
      <Container fluid='lg' className='mb-1 p-1'>
         <Row className='mt-2'>
            <Col sm={12} md={8}>
               <h4 className='text-center mb-4'>
                  Your Order has been placed successfully.
               </h4>
            </Col>
            <Col sm={12} md={4}>
               <div className='d-flex justify-content-center mb-3'>
                  <Button
                     variant='warning'
                     className='rounded mx-auto text-center'
                     onClick={() => navigate('/')}>
                     Continue Shopping
                  </Button>
               </div>
            </Col>
         </Row>
         <Row>
            <Col>
               <Row>
                  <Col>
                     <h4 className='text-center'>Shipping Details</h4>
                  </Col>
               </Row>
               <Row className='border border-2 rounded p-4 shadow-sm'>
                  <p className='fw-lighter'>
                     <span className='fw-bold'>Name: </span>
                     {`${orderDetails.firstName} ${orderDetails.lastName}`}
                  </p>
                  <p className='fw-lighter'>
                     <span className='fw-bold'>Email: </span>
                     {orderDetails.email}
                  </p>
                  <p className='fw-lighter'>
                     <span className='fw-bold'>Phone: </span>
                     {orderDetails.phoneNumber}
                  </p>
                  <p className='fw-lighter'>
                     <span className='fw-bold'>Address: </span>
                     {`${orderDetails.address} ${orderDetails.city} ${orderDetails.zipCode}`}
                  </p>
               </Row>
            </Col>
         </Row>

         <Row>
            <Col>
               <h4 className='text-center mt-3'>Your Order</h4>
               <Table
                  striped
                  bordered
                  hover
                  className='rounded border border-2 p-4 shadow-sm'>
                  <thead>
                     <tr>
                        <th>Item</th>
                        <th className='td-center'>Qty</th>
                        <th className='td-center'>Price</th>
                     </tr>
                  </thead>
                  <tbody>
                     {orderDetails &&
                        Object.keys(orderDetails.items).map(id => {
                           id > 0;
                           return (
                              orderDetails.items[id] > 0 && (
                                 <tr key={id}>
                                    <td>
                                       <span className='fw-lighter'>
                                          {products[id - 1].title}
                                       </span>
                                    </td>
                                    <td className='d-flex justify-content-center'>
                                       {orderDetails.items[id]}
                                    </td>
                                    <td className='td-center'>
                                       ${products[id - 1].price.toFixed(2)}
                                    </td>
                                 </tr>
                              )
                           );
                        })}
                     <tr>
                        <td className='fw-bold'>Total</td>
                        <td className='td-center fw-bold '>
                           {Object.keys(orderDetails.items).reduce((acc, id) => {
                              return acc + orderDetails.items[id];
                           }, 0)}
                        </td>
                        <td className='td-center fw-bold'>
                           $
                           {orderDetails &&
                              Object.keys(orderDetails.items)
                                 .reduce((acc, id) => {
                                    return (
                                       acc +
                                       orderDetails.items[id] * products[id - 1].price
                                    );
                                 }, 0)
                                 .toFixed(2)}
                        </td>
                     </tr>
                  </tbody>
               </Table>
            </Col>
         </Row>
      </Container>
   );
}

export default Confirmation;
