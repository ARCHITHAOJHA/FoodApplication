import React from 'react';

const CarouselItem = ({ image, title }) => {
    return (
        <div className='px-2'>
            <div className='flex flex-col items-center'>
                <img
                    className='h-40 w-40 rounded-full object-cover'
                    src={image}
                    alt={title}
                />
                <p className='mt-3 text-sm font-medium tracking-wide text-gray-300'>{title}</p>
            </div>
        </div>
    );
};

export default CarouselItem;
