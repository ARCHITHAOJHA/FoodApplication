import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProfileNavigation } from './ProfileNavigation';
import { Address } from "./Address";
import { Orders } from "./Orders";
import Favorites from "./Favorites";
import UserProfile from "./UserProfile";

const Profile = () => {
  const [openSideBar] = useState(false);

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%]'>
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className='lg:w-[80%]'>
        <Routes>
          <Route path='/' element={<UserProfile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/address' element={<Address />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/favourites' element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
