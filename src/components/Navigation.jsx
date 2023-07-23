import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartCounter from './CartCounter';

function Navigation() {
   return (
      <>
         <Navbar className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
            <Container className='container-fluid'>
               <Navbar.Brand className='fs-3 fw-bold'>Online Store</Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse className='justify-content-end'>
                  <Link to='/' className='fs-5 ms-2 nav-item text-light'>
                     Shop
                  </Link>
                  <Link to='/orders' className='fs-5 ms-3 nav-item text-light'>
                     Orders
                  </Link>
                  <Link to='/cart' className=' ms-3 nav-item text-light'>
                     <CartCounter />
                  </Link>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
}

export default Navigation;
