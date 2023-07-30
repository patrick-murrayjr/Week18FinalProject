/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { ShopContext } from './ShopContext';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CartForm({ form }) {
   const {
      cartItems,
      cartItemsCount,
      clearCart,
      setOrderDetails,
      products,
      createNewOrder,
      idToEdit,
      editOrder,
      orders,
   } = useContext(ShopContext);

   const [orderToEdit] = orders.filter(order => order.id === idToEdit);
   const {
      firstName: firstNameToEdit,
      lastName: lastNameToEdit,
      phoneNumber: phoneNumberToEdit,
      email: emailToEdit,
      address: addressToEdit,
      city: cityToEdit,
      zipCode: zipCodeToEdit,
   } = orderToEdit || {};
   const [firstName, setFirstName] = useState(
      form === 'editOrder' ? firstNameToEdit : ''
   );
   const [lastName, setLastName] = useState(form === 'editOrder' ? lastNameToEdit : '');
   const [phoneNumber, setPhoneNumber] = useState(
      form === 'editOrder' ? phoneNumberToEdit : ''
   );
   const [email, setEmail] = useState(form === 'editOrder' ? emailToEdit : '');
   const [address, setAddress] = useState(form === 'editOrder' ? addressToEdit : '');
   const [city, setCity] = useState(form === 'editOrder' ? cityToEdit : '');
   const [zipCode, setZipCode] = useState(form === 'editOrder' ? zipCodeToEdit : '');

   const handleSubmit = event => {
      event.preventDefault();
      let newOrder = {
         firstName: firstName,
         lastName: lastName,
         phoneNumber: phoneNumber,
         email: email,
         address: address,
         city: city,
         zipCode: zipCode,
         cartItems: cartItems,
         totalPrice: Object.keys(cartItems)
            .reduce((acc, id) => {
               return (
                  acc +
                  parseFloat(
                     (cartItems[id] * parseFloat(products[id - 1].price)).toFixed(2)
                  )
               );
            }, 0)
            .toFixed(2),
      };

      if (form === 'editOrder') {
         editOrder(newOrder, idToEdit);
      }
      if (form === 'newOrder') {
         createNewOrder(newOrder);
      }

      setOrderDetails(newOrder);
      clearCart();
      resetForm();
      form === 'newOrder' && navigate('/Confirmation');
      form === 'editOrder' && navigate('/Orders');
   };

   const navigate = useNavigate();

   const isValidForm = () => {
      if (
         firstName &&
         lastName &&
         phoneNumber &&
         isValidEmail(email) &&
         address &&
         city &&
         zipCode
      ) {
         return true;
      }
      return false;
   };

   const isValidEmail = email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const resetForm = () => {
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setAddress('');
      setCity('');
      setZipCode('');
   };
   return (
      <Container fluid='lg' className='my-3 '>
         <Col>
            <Form className='rounded border border-2 p-4 shadow-sm'>
               <Row>
                  <Col xs={12} md={12}>
                     {form === 'newOrder' && (
                        <h4 className='text-center mb-3'>Shipping Information</h4>
                     )}
                     {form === 'editOrder' && (
                        <h4 className='text-center mb-3'>
                           Edit information for Order ID: {idToEdit}
                        </h4>
                     )}
                  </Col>
               </Row>
               <Row>
                  <Col xs={12} md={6}>
                     <Form.Group className='mb-3' controlId='formFirstName'>
                        {firstName === '' ? (
                           <Form.Label className='text-danger'>
                              First Name is Required
                           </Form.Label>
                        ) : (
                           <Form.Label>First Name</Form.Label>
                        )}
                        <Form.Control
                           className=' rounded shadow-sm'
                           type='text'
                           placeholder='Enter first name'
                           value={firstName}
                           onChange={e => setFirstName(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                     <Form.Group className='mb-3' controlId='FormLastName'>
                        {lastName === '' ? (
                           <Form.Label className='text-danger'>
                              Last Name is Required
                           </Form.Label>
                        ) : (
                           <Form.Label>Last Name</Form.Label>
                        )}
                        <Form.Control
                           className='rounded shadow-sm'
                           type='text'
                           placeholder='Enter last name'
                           value={lastName}
                           onChange={e => setLastName(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col xs={12} md={6}>
                     <Form.Group className='mb-3' controlId='formPhoneNumber'>
                        {phoneNumber === '' ? (
                           <Form.Label className='text-danger'>
                              Phone Number is required
                           </Form.Label>
                        ) : (
                           <Form.Label>Phone Number</Form.Label>
                        )}

                        <Form.Control
                           className='rounded shadow-sm'
                           type='text'
                           placeholder='Enter phone number'
                           value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                     <Form.Group className='mb-3' controlId='formEmail'>
                        {!isValidEmail(email) ? (
                           <Form.Label className='text-danger'>
                              Email must be in the format name@domain.com
                           </Form.Label>
                        ) : (
                           <Form.Label>Email</Form.Label>
                        )}
                        <Form.Control
                           className='rounded shadow-sm'
                           type='email'
                           placeholder='Enter email'
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col xs={12} md={6}>
                     <Form.Group className='mb-3' controlId='formAddress'>
                        {address === '' ? (
                           <Form.Label className='text-danger'>
                              Address is Required
                           </Form.Label>
                        ) : (
                           <Form.Label>Address</Form.Label>
                        )}

                        <Form.Control
                           className='rounded shadow-sm'
                           type='text'
                           placeholder='Enter address'
                           value={address}
                           onChange={e => setAddress(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
                  <Col xs={8} md={4}>
                     <Form.Group className='mb-3' controlId='formCity'>
                        {city === '' ? (
                           <Form.Label className='text-danger'>
                              City is Required
                           </Form.Label>
                        ) : (
                           <Form.Label>City</Form.Label>
                        )}

                        <Form.Control
                           className='rounded shadow-sm'
                           type='text'
                           placeholder='Enter city'
                           value={city}
                           onChange={e => setCity(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
                  <Col xs={4} md={2}>
                     <Form.Group className='mb-3' controlId='formZipCode'>
                        {zipCode === '' ? (
                           <Form.Label className='text-danger'>
                              Zip is required
                           </Form.Label>
                        ) : (
                           <Form.Label>Zip Code</Form.Label>
                        )}
                        <Form.Control
                           className='rounded shadow-sm'
                           type='text'
                           placeholder='Zip'
                           value={zipCode}
                           onChange={e => setZipCode(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col xs={12} md={12}>
                     <Row className='mx-1 my-2'>
                        {(cartItemsCount === 0 || !isValidForm()) && (
                           <Button
                              className='rounded text-center'
                              variant='warning'
                              type='button'
                              disabled={true}>
                              {form === 'newOrder' && <>Complete Purchase</>}
                              {form === 'editOrder' && <>Save Changes</>}
                           </Button>
                        )}
                        {cartItemsCount > 0 && isValidForm() && (
                           <Button
                              className='rounded text-center'
                              variant='warning'
                              type='button'
                              onClick={handleSubmit}>
                              {form === 'newOrder' && <>Complete Purchase</>}
                              {form === 'editOrder' && <>Save Changes</>}
                           </Button>
                        )}
                     </Row>
                  </Col>
               </Row>
            </Form>
         </Col>
      </Container>
   );
}

export default CartForm;
