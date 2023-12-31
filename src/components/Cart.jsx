/* eslint-disable react/prop-types */
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import { ShopContext } from './ShopContext';
import QtyButton from './QtyButton';
import CartForm from './CartForm';
import ScrollButton from './ScrollButton';

/**
 * Cart component
 *
 *  This is the code for the Shoppping Cart page.
 *  It displays a form to enter the customer information.
 *  It then displays an itemized list of the items in the cart with the total.
 *  It also makes use of a button to scroll to the top of the page.
 *
 *  After the form is submitted, the user is redirected to the Order Confirmation page.
 *
 */
function Cart() {
   // Get the cart items, cart items count, and products from the shop context
   const { cartItems, cartItemsCount, products } = useContext(ShopContext);

   // Create a reference to the scroll button
   const buttonRef = useRef(null);

   return (
      <Container fluid='lg' className='mb-1 p-1'>
         <Row>
            <Col>
               <CartForm form={'newOrder'} />
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

export default Cart;
