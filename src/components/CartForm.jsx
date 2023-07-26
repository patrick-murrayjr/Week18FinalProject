import { useState, useContext } from 'react';
import { ShopContext } from './ShopContext';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

function CartForm() {
   const [validated, setValidated] = useState(false);
   const { cartItems, cartItemsCount, products } = useContext(ShopContext);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [zipCode, setZipCode] = useState('');

   const handleSubmit = event => {
      handleValidation(event);
      console.log('Button clicked');
      event.preventDefault();
      console.log(
         firstName,
         lastName,
         phoneNumber,
         email,
         address,
         city,
         zipCode,
         cartItemsCount
      );
   };
   const handleValidation = event => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
      setValidated(true);
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
                              Phone Number is Required
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
                        {email === '' ? (
                           <Form.Label className='text-danger'>
                              Email is Required
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
                              Zip is Required
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
                        {(cartItemsCount === 0 ||
                           !firstName ||
                           !lastName ||
                           !phoneNumber ||
                           !email ||
                           !address ||
                           !city ||
                           !zipCode) && (
                           <Button
                              className='rounded text-center'
                              variant='warning'
                              type='button'
                              disabled={true}>
                              Complete Purchase
                           </Button>
                        )}
                        {cartItemsCount > 0 &&
                           firstName &&
                           lastName &&
                           phoneNumber &&
                           email &&
                           address &&
                           city &&
                           zipCode && (
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
