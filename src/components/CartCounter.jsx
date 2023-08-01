import { useContext } from 'react';
import { ShopContext } from './ShopContext';
import { FaShoppingCart } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

/**
 * CartCounter component
 *
 * This is the code for the Cart Counter component
 * It displays the number of items in the cart
 * It functions as a link to open the cart page
 */
function CartCounter() {
   // Update the cart items count in the header
   const { cartItemsCount } = useContext(ShopContext);

   return (
      <Button variant='dark' style={{ position: 'relative' }}>
         <FaShoppingCart size={38} className='text-tertiary' />
         {cartItemsCount > 0 && (
            <Badge
               pill
               bg='warning'
               text='dark'
               className='rounded-circle border border-light border-2'
               style={{ position: 'absolute', top: '0px', right: '5px' }}>
               <span className='fs-6'>{cartItemsCount > 0 && `${cartItemsCount}`}</span>
            </Badge>
         )}
      </Button>
   );
}

export default CartCounter;
