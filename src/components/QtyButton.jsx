/* eslint-disable react/prop-types */
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { ShopContext } from './ShopContext';

function QtyButton({ id }) {
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
