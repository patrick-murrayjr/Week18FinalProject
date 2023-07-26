import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import CartCounter from './CartCounter';

function Navigation() {
   return (
      <>
         <Navbar className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
            <Container className='container-fluid'>
               <Navbar.Brand className='fs-2 fw-bold text-warning'>
                  Online Store
               </Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse className='justify-content-end'>
                  <NavLink to='/' className='fs-5 ms-2 nav-item '>
                     Shop
                  </NavLink>
                  <NavLink to='/orders' className='fs-5 ms-3 nav-item '>
                     Orders
                  </NavLink>
                  <NavLink to='/cart' className=' ms-3 nav-item '>
                     <CartCounter />
                  </NavLink>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
}

export default Navigation;
