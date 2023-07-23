/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ProductInfo from './ProductInfo';

function Shop({ products }) {
   const [searchTerm, setSearchTerm] = useState('');
   const [modalShow, setModalShow] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState({});
   return (
      <Container fluid='lg' className='mb-5 p-5'>
         <Row>
            <Col>
               <h2 className='text-center'>Products</h2>
               <Form className='d-flex'>
                  <Form.Control
                     type='search'
                     value={searchTerm}
                     placeholder='Search'
                     className='me-2'
                     aria-label='Search'
                     onChange={event => {
                        setSearchTerm(event.target.value);
                     }}
                  />
                  <Button
                     variant='outline-primary'
                     className='rounded ms-2'
                     onClick={() => {
                        setSearchTerm('');
                     }}>
                     Clear
                  </Button>
               </Form>
            </Col>
         </Row>
         <Row>
            {products
               .filter(product => {
                  return (
                     product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     product.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                     product.category.toLowerCase().includes(searchTerm.toLowerCase())
                  );
               })
               .map(filteredProduct => (
                  <Col key={filteredProduct.id} className='mt-4'>
                     <Card className='h-100 p-3 rounded shadow-sm bg-white'>
                        <div
                           style={{ width: '16rem', height: '18rem' }}
                           className='d-flex justify-content-around m-auto'>
                           <Image
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                              src={filteredProduct.image}
                              alt={filteredProduct.title}
                              className='m-auto p-3'
                              fluid
                              onClick={() => {
                                 setModalShow(true);
                                 setSelectedProduct(filteredProduct);
                              }}
                           />
                        </div>
                        <Card.Body>
                           <Card.Text className='fw-bold fs-4'>
                              ${filteredProduct.price.toFixed(2)}
                           </Card.Text>
                           <Card.Text className='mt-3'>{filteredProduct.title}</Card.Text>
                        </Card.Body>
                        <Button variant='outline-primary' className='rounded mb-2'>
                           Add to Cart
                        </Button>
                        <Button
                           variant='outline-secondary'
                           className='rounded btn'
                           onClick={() => {
                              setModalShow(true);
                              setSelectedProduct(filteredProduct);
                           }}>
                           Product Info
                        </Button>
                     </Card>
                  </Col>
               ))}
         </Row>
         <ProductInfo
            selectedproduct={selectedProduct}
            show={modalShow}
            onHide={() => setModalShow(false)}
         />
      </Container>
   );
}

export default Shop;
