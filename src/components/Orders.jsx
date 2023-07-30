/* eslint-disable react/prop-types */
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import ScrollButton from './ScrollButton';

function Orders() {
   const {
      orders,
      products,
      deleteOrder,
      setIdToEdit,
      addQtyToCart,
      clearCart,
      cartItems,
   } = useContext(ShopContext);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [idToDelete, setIdToDelete] = useState(0);
   const handleDeleteModalClose = () => setShowDeleteModal(false);
   const handleDeleteModalShow = id => {
      setIdToDelete(id);
      setShowDeleteModal(true);
   };
   const navigate = useNavigate();
   const buttonRef = useRef(null);
   const handleDelete = async id => {
      await deleteOrder(id);
   };
   const countCartItems = () => {
      let count = 0;
      Object.values(cartItems).forEach(qty => {
         count += qty;
      });
      return count;
   };
   if (countCartItems() > 0) {
      clearCart();
   }

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
         {orders.length > 0 && products.length > 0 && (
            <Row>
               <Col className='table-responsive'>
                  <Table
                     striped
                     bordered
                     hover
                     className='rounded border border-2 p-4 mb-4 shadow-sm table-responsive'>
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
                                    <Table
                                       striped
                                       bordered
                                       hover
                                       className='rounded border border-2 p-4 mb-4 shadow-sm'>
                                       <thead>
                                          <tr>
                                             <th className='d-flex justify-content-start ps-2'>
                                                Item
                                             </th>
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
                                                      <td className='fw-lighter'>
                                                         <span className='d-flex justify-content-start'>
                                                            {products[id - 1].title}
                                                         </span>
                                                      </td>
                                                      <td className='td-center'>
                                                         {order.cartItems[id]}
                                                      </td>
                                                      <td className='td-center'>
                                                         $
                                                         {products[id - 1].price.toFixed(
                                                            2
                                                         )}
                                                      </td>
                                                   </tr>
                                                )
                                             );
                                          })}
                                       </tbody>
                                    </Table>
                                 </td>
                                 <td>
                                    <div className='d-flex align-items-stretch fw-bold'>
                                       ${Number(order.totalPrice).toFixed(2)}
                                    </div>
                                 </td>
                                 <td className='td-center'>
                                    <div className='vstack gap-2'>
                                       <Button
                                          className='btn-sm rounded text-center'
                                          variant='warning'
                                          type='button'
                                          onClick={() => {
                                             clearCart();
                                             setIdToEdit(order.id);
                                             let tmp = Object.values(order.cartItems);
                                             tmp.forEach((qty, id) => {
                                                addQtyToCart(id + 1, qty);
                                             });
                                             navigate('/editOrder');
                                          }}>
                                          Edit
                                       </Button>
                                       <Button
                                          className='btn-sm rounded text-center'
                                          variant='danger'
                                          type='button'
                                          onClick={() => {
                                             handleDeleteModalShow(order.id);
                                          }}>
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
         <ScrollButton buttonRef={buttonRef} />
         <Modal show={showDeleteModal} onHide={handleDeleteModalClose} centered>
            <Modal.Header closeButton>
               <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Confirm that you would like to delete order ID: {idToDelete}
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant='warning'
                  className='rounded text-center'
                  onClick={handleDeleteModalClose}>
                  Cancel
               </Button>
               <Button
                  variant='danger'
                  className='rounded text-center'
                  onClick={() => {
                     handleDelete(idToDelete);
                     handleDeleteModalClose();
                  }}>
                  Confirm
               </Button>
            </Modal.Footer>
         </Modal>
      </Container>
   );
}

export default Orders;
