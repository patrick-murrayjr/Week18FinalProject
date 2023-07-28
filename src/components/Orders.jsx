/* eslint-disable react/prop-types */
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ShopContext } from './ShopContext';

function Orders() {
   const {
      orders,
      products,
      setOrders,
      cartItems,
      cartItemsCount,
      clearCart,
      setOrderDetails,
   } = useContext(ShopContext);
   console.log(products);
   // console.log(orders);
   // console.log(orders.length);
   // console.log(orders.cartItems);
   return (
      <Container fluid='lg' className='mb-5 p-5'>
         <Row>
            <Col>
               <div className='fs-2 mx-auto'>
                  <h2 className='text-center'>Orders</h2>
               </div>
            </Col>
         </Row>
         {orders.length === 0 && (
            <h5 className='text-center fst-italic text-danger mt-3'>
               There are no orders to display
            </h5>
         )}
         {orders.length > 0 && (
            <Row>
               <Col>
                  <Table
                     striped
                     bordered
                     hover
                     className='rounded border border-2 p-4 mb-4 shadow-sm'>
                     <thead>
                        <tr>
                           <th className='td-center'>Order ID</th>
                           <th>Shipping Details</th>
                           <th className='td-center'>Order Details</th>
                           <th className='td-center'>Total</th>
                           <th className='td-center'> Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {orders.map(order => {
                           return (
                              <tr key={order.id}>
                                 <td className='td-center'>{order.id}</td>
                                 <td>
                                    <p className='fw-lighter'>
                                       <span className='fw-bold'>Name: </span>
                                       {`${order.firstName} ${order.lastName}`}
                                    </p>
                                    <p className='fw-lighter'>
                                       <span className='fw-bold'>Email: </span>
                                       {order.email}
                                    </p>
                                    <p className='fw-lighter'>
                                       <span className='fw-bold'>Phone: </span>
                                       {order.phoneNumber}
                                    </p>
                                    <p className='fw-lighter'>
                                       <span className='fw-bold'>Address: </span>
                                       {`${order.address} ${order.city} ${order.zipCode}`}
                                    </p>
                                 </td>
                                 <td className='td-center'>
                                    TEMP
                                    <Table
                                       striped
                                       bordered
                                       hover
                                       className='rounded border border-2 p-4 mb-4 shadow-sm'>
                                       <thead>
                                          <tr>
                                             <th>Item</th>
                                             <th className='td-center'>Qty</th>
                                             <th className='td-center'>Price</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {Object.keys(order.cartItems).map(id => {
                                             id > 0;
                                             return (
                                                order.cartItems[id] > 0 && (
                                                   <tr key={id}>
                                                      <td>
                                                         <span className='fw-lighter'>
                                                            {products[order[id] - 1]}
                                                         </span>
                                                      </td>
                                                      <td className='d-flex justify-content-center'>
                                                         {order.cartItems[id]}
                                                      </td>
                                                      <td className='td-center'>
                                                         $ TEMP
                                                      </td>
                                                   </tr>
                                                )
                                             );
                                          })}
                                          {/*
                                          <tr>
                                             <td className='fw-bold'>Total</td>
                                             <td className='td-center fw-bold '>
                                                {Object.keys(order.items).reduce(
                                                   (acc, id) => {
                                                      return acc + order.items[id];
                                                   },
                                                   0
                                                )}
                                             </td>
                                             <td className='td-center fw-bold'>
                                                $
                                                {Object.keys(order.items)

                                                   .reduce((acc, id) => {
                                                      return (
                                                         acc +
                                                         order.items[id] *
                                                            order.products[id - 1].price
                                                      );
                                                   }, 0)
                                                   .toFixed(2)}
                                             </td>
                                                </tr>*/}
                                       </tbody>
                                    </Table>
                                 </td>
                                 <td className='td-center'>
                                    ${order.totalPrice.toFixed(2)}
                                 </td>
                                 <td className='td-center'>
                                    <div className='vstack gap-2'>
                                       <Button
                                          className='btn-sm rounded text-center'
                                          variant='warning'
                                          type='button'>
                                          Edit
                                       </Button>
                                       <Button
                                          className='btn-sm rounded text-center'
                                          variant='danger'
                                          type='button'>
                                          Delete
                                       </Button>
                                    </div>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </Table>
               </Col>
            </Row>
         )}
      </Container>
   );
}

export default Orders;
