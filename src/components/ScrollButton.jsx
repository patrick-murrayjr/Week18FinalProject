/* eslint-disable react/prop-types */
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

/**
 * ScrollButton component
 *
 * This is the code for the ScrollButton component.
 * It displays a button to scroll to the top of the page.
 *
 */
function ScrollButton({ buttonRef }) {
   // the scroll top state is used to determine when to display the button
   const [scrollTop, setScrollTop] = useState(0);

   // the useEffect hook is used to add an event listener to the window object
   // the event listener is used to set the scroll top state
   // the event listener is removed when the component is unmounted
   // the button is displayed when the scroll top state is greater than 100
   // and hidden when the scroll top state is less than 100

   useEffect(() => {
      const handleScroll = () => {
         setScrollTop(window.scrollY);
         if (scrollTop > 100) {
            buttonRef.current.style.display = 'block';
         } else {
            buttonRef.current.style.display = 'none';
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [scrollTop, buttonRef]);

   return (
      <Button
         ref={buttonRef}
         variant='info'
         className='p-0 mx-text-center border-0'
         onClick={() => {
            setScrollTop(0);
            document.documentElement.scrollTop = 0;
         }}
         style={{
            display: 'none',
            position: 'fixed',
            top: '5px',
            right: '5px',
            zIndex: '99',
         }}>
         <BsFillArrowUpSquareFill size={38} className='bg-white text-warning' />
      </Button>
   );
}

export default ScrollButton;
