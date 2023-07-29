/* eslint-disable react/prop-types */
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function ScrollButton({ buttonRef }) {
   const [scrollTop, setScrollTop] = useState(0);

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
