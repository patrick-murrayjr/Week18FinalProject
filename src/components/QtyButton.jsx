/* eslint-disable react/prop-types */
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { ShopContext } from './ShopContext';

/**
 *
 * QtyButton component
 *
 * This is the code for the QtyButton component.
 * It displays a button to add or remove an item from the cart.
 * It also displays the quantity of the item in the cart.
 *
 */
function QtyButton({ id }) {
   // the cart items, add item to cart, remove item from cart, and add quantity to cart functions from the shop context
   const { cartItems, addItemToCart, removeItemFromCart, addQtyToCart } =
      useContext(ShopContext);

   return (
      <InputGroup style={{ maxWidth: '100px', minWidth: '100px' }}>
         <Button
            size='sm'
            variant='outline-info'
            className='rounded'
            onClick={() => removeItemFromCart(id)}>
            -
         </Button>
         <Form.Control
            className='text-center fw-bold rounded'
            size='sm'
            type='input'
            value={cartItems[id]}
            onChange={e => {
               addQtyToCart(id, Number(e.target.value) - cartItems[id]);
            }}
         />
         <Button
            size='sm'
            variant='outline-info'
            className='rounded'
            onClick={() => addItemToCart(id)}>
            +
         </Button>
      </InputGroup>
   );
}

export default QtyButton;
