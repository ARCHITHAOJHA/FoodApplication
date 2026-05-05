import React from "react";
import { Chip, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const CartItem = () => {
  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>
        <img className='w-[5rem] h-[5rem] object-cover' src='https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg' alt='' />
        <div className='flex items-center justify-between lg:w-[70%]'>
          <div className='space-y-1 lg:space-y-3 w-full'>
            <p>Biryani</p>
            <div className='flex justify-between items-center'>
              <IconButton><RemoveCircleOutlineIcon /></IconButton>
              <IconButton><AddCircleOutlineIcon /></IconButton>
            </div>
          </div>
          <p>Rs.1756</p>
        </div>
      </div>
      <div className='pt-3 space-x-2'>
        {[1, 1, 1].map((_, index) => <Chip key={index} label='bread' />)}
      </div>
    </div>
  );
};
