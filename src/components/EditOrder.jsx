/* eslint-disable react/prop-types */
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import QtyButton from './QtyButton';
import CartForm from './CartForm';
import ScrollButton from './ScrollButton';

function EditOrder() {
   const { cartItems, cartItemsCount, products, clearCart } = useContext(ShopContext);
   const buttonRef = useRef(null);
   const navigate = useNavigate();

   return (
      <Container fluid='lg' className='mb-1 p-1'>
         <Row>
            <Col>
               <Row className='mx-3 my-2'>
                  <Button
                     variant='danger'
                     className=' rounded mx-auto mt-3'
                     onClick={() => {
                        clearCart();
                        navigate('/Orders');
                     }}>
                     Cancel
                  </Button>
               </Row>
            </Col>
         </Row>
         <Row>
            <Col>
               <CartForm form={'editOrder'} />
               {cartItemsCount === 0 && (
                  <h5 className='text-center fst-italic text-danger mt-3'>
                     Your cart is empty
                  </h5>
               )}
               {cartItemsCount > 0 && (
                  <>
                     <h4 className='text-center'>Your Cart</h4>
                     <Table
                        striped
                        bordered
                        hover
                        className='rounded border border-2 p-4 mb-4 shadow-sm table-responsive'>
                        <thead>
                           <tr>
                              <th>Item</th>
                              <th className='td-center'>Qty</th>
                              <th className='td-center'>Price</th>
                           </tr>
                        </thead>
                        <tbody>
                           {Object.keys(cartItems).map(id => {
                              id > 0;
                              return (
                                 cartItems[id] > 0 && (
                                    <tr key={id}>
                                       <td>
                                          <span className='fw-lighter'>
                                             {products[id - 1].title}
                                          </span>
                                       </td>
                                       <td className='d-flex justify-content-center'>
                                          <QtyButton id={id} />
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
                                 {Object.keys(cartItems).reduce((acc, id) => {
                                    return acc + cartItems[id];
                                 }, 0)}
                              </td>
                              <td className='td-center fw-bold'>
                                 $
                                 {Object.keys(cartItems)
                                    .reduce((acc, id) => {
                                       return (
                                          acc + cartItems[id] * products[id - 1].price
                                       );
                                    }, 0)
                                    .toFixed(2)}
                              </td>
                           </tr>
                        </tbody>
                     </Table>
                  </>
               )}
            </Col>
         </Row>
         <ScrollButton buttonRef={buttonRef} />
      </Container>
   );
}

export default EditOrder;
