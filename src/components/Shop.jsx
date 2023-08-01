/* eslint-disable react/prop-types */
import { useState, useContext, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProductInfo from './ProductInfo';
import ProductCard from './ProductCard';
import ScrollButton from './ScrollButton';
import { ShopContext } from './ShopContext';

/**
 * Shop component
 *
 * this is the code for the Shop page.
 * It displays a list of products.
 * It also makes use of a button to scroll to the top of the page.
 *
 * When a product is clicked, a modal is displayed with the product information.
 *
 * The products are filtered based on the search term.
 *
 * The clear cart button is disabled when the cart is empty.
 */
function Shop() {
   // the search term state is used to filter the products
   const [searchTerm, setSearchTerm] = useState('');
   const [modalShow, setModalShow] = useState(false);
   // the selected product state is used to display the product information in the modal
   const [selectedProduct, setSelectedProduct] = useState({});
   // the cart items count and products from the shop context
   const { clearCart, cartItemsCount, products } = useContext(ShopContext);
   const buttonRef = useRef(null);

   return (
      <Container fluid='lg' className='mb-5 p-5'>
         <Row>
            <Col>
               <Row className='text-center'>
                  <h2 className='text-center'>Products</h2>
                  <div className='d-grid'>
                     <Button
                        variant='outline-primary'
                        className='rounded mb-2 text-center'
                        {...(cartItemsCount === 0 && { disabled: true })}
                        onClick={() => clearCart()}>
                        Clear Cart{' '}
                        <span className='fw-bold'>
                           {cartItemsCount > 0 && `(${cartItemsCount})`}
                        </span>
                     </Button>
                  </div>
               </Row>
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
                     <span>Clear</span>
                  </Button>
               </Form>
            </Col>
         </Row>
         <Row>
            {products.length === 0 && (
               <h5 className='m-2 text-center text-warning'>Loading Products...</h5>
            )}
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
                     <ProductCard
                        setModalShow={setModalShow}
                        setSelectedProduct={setSelectedProduct}
                        product={filteredProduct}
                     />
                  </Col>
               ))}
         </Row>
         <ProductInfo
            selectedproduct={selectedProduct}
            show={modalShow}
            onHide={() => setModalShow(false)}
         />
         <ScrollButton buttonRef={buttonRef} />
      </Container>
   );
}

export default Shop;
