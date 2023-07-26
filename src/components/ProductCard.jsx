/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Card, Button, Image, ButtonGroup } from 'react-bootstrap';
import { ShopContext } from './ShopContext';

const ProductCard = ({ setModalShow, setSelectedProduct, product }) => {
   const { id, title, price, image } = product;
   const { cartItems, addItemToCart, removeItemFromCart, clearItem } =
      useContext(ShopContext);
   const cartItemAmount = cartItems[id];

   return (
      <Card className='h-100 p-3 rounded shadow-sm bg-white'>
         <div
            style={{ width: '16rem', height: '18rem' }}
            className='d-flex justify-content-around m-auto'>
            <Image
               style={{ maxWidth: '100%', maxHeight: '100%' }}
               src={image}
               alt={title}
               title={title}
               className='m-auto p-3'
               fluid
               onClick={() => {
                  setModalShow(true);
                  setSelectedProduct(product);
               }}
            />
         </div>
         <Card.Body>
            <Card.Text className='fw-bold fs-4'>${price.toFixed(2)}</Card.Text>
            <Card.Text className='mt-3'>{title}</Card.Text>
         </Card.Body>
         {cartItemAmount > 0 && (
            <ButtonGroup>
               <Button
                  variant='outline-primary'
                  className='rounded mb-2'
                  onClick={() => clearItem(id)}>
                  Clear Items
               </Button>
               <Button
                  variant='outline-primary'
                  className='rounded mb-2'
                  onClick={() => addItemToCart(id)}>
                  Add Item
                  <span className='fw-bold'>
                     {cartItemAmount > 0 && `(${cartItemAmount})`}
                  </span>
               </Button>
               <Button
                  variant='outline-primary'
                  className='rounded mb-2'
                  onClick={() => removeItemFromCart(id)}>
                  Remove Item
               </Button>
            </ButtonGroup>
         )}
         {cartItemAmount === 0 && (
            <Button
               variant='outline-primary'
               className='rounded mb-2'
               onClick={() => addItemToCart(id)}>
               Add to Cart
            </Button>
         )}
         <Button
            variant='outline-secondary'
            className='rounded btn'
            onClick={() => {
               setModalShow(true);
               setSelectedProduct(product);
            }}>
            Product Info
         </Button>
      </Card>
   );
};

export default ProductCard;
