/* eslint-disable react/prop-types */

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

/**
 * Product Info component
 *
 * This is the code for the Product Info component.
 * It displays the product image, title, price, category, and description.
 *
 */
function ProductInfo(props) {
   return (
      <Modal
         size='md'
         {...props}
         aria-labelledby='contained-modal-title-vcenter'
         centered>
         <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
               {props.selectedproduct.title}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className='m-auto'>
               <Image
                  style={{ maxWidth: '50%', maxHeight: '50%' }}
                  src={props.selectedproduct.image}
                  alt={props.selectedproduct.title}
                  className='d-block mx-auto img-fluid '
                  fluid
               />
            </div>
            <p className='mt-3 p-1 fs-5'>
               <span className='fw-bold fs-5'>Price: </span>$
               {props.selectedproduct.price && props.selectedproduct.price.toFixed(2)}
            </p>
            <p>
               <span className='fw-bold fs-5'>Category: </span>
               {props.selectedproduct.category &&
                  props.selectedproduct.category.toUpperCase()}
            </p>
            <p>
               <span className='fw-bold fs-5'>Item Details: </span>
               <span className='fw-lighter fs-6'>
                  {props.selectedproduct.description}
               </span>
            </p>
         </Modal.Body>
      </Modal>
   );
}

export default ProductInfo;
