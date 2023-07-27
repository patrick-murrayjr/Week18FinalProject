import { useState, useContext } from 'react';
import { ShopContext } from './ShopContext';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CartForm() {
   const { cartItems, cartItemsCount, clearCart, orderDetails, setOrderDetails } =
      useContext(ShopContext);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [zipCode, setZipCode] = useState('');

   const handleSubmit = event => {
      console.log('Button clicked');
      event.preventDefault();
      let newOrder = {
         firstName: firstName,
         lastName: lastName,
         phoneNumber: phoneNumber,
         email: email,
         address: address,
         city: city,
         zipCode: zipCode,
         items: cartItems,
      };
      setOrderDetails(newOrder);
      clearCart();
      resetForm();
      navigate('/Confirmation');
   };

   const navigate = useNavigate();

   // const printOrderDetails = order => {
   //    console.log(order);
   // };
   const validForm = () => {
      if (
         firstName &&
         lastName &&
         phoneNumber &&
         validEmail(email) &&
         address &&
         city &&
         zipCode
      ) {
         return true;
      }
      return false;
   };

   const validEmail = email => {
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
                     <h4 className='text-center mb-3'>Shipping Information</h4>
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
                        {!validEmail(email) ? (
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
                        {(cartItemsCount === 0 || !validForm()) && (
                           <Button
                              className='rounded text-center'
                              variant='warning'
                              type='button'
                              disabled={true}>
                              Complete Purchase
                           </Button>
                        )}
                        {cartItemsCount > 0 && validForm() && (
                           <Button
                              className='rounded text-center'
                              variant='warning'
                              type='button'
                              onClick={handleSubmit}>
                              Complete Purchase
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
