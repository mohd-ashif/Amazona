
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = ({ products }) => {  
    return (   
        <Carousel pause='hover' interval={3000} style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='mb-4'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link className='text-decoration-none' to={`/product/${product.slug}`}>
                        <div className='d-flex justify-content-end align-items-center'>
                            <Image src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`} style={{ height: '550px', width: '1150px', maxWidth: '50%', objectFit: 'cover' }} alt={product.name} fluid />
                            <p className='mx-1 text-light text-center d-none d-lg-block mt-5 ml-3'>{product.description}</p>
                        </div>
                        <Carousel.Caption style={{ width: '100%', background: 'rgba(0, 0, 0, 0.5)' }} className='position-absolute start-0 bottom-0 end-0'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
