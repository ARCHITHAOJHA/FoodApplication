import React, { lazy, Suspense } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../components/Home/Home"));
const RestaurantDetails = lazy(() => import("../components/Restaurant/RestaurantDetails"));
const Cart = lazy(() => import("../components/Cart/Cart"));
const Profile = lazy(() => import("../components/Profile/profile"));
const Auth = lazy(() => import("../components/Auth/Auth").then((m) => ({ default: m.Auth })));
const PaymentSuccess = lazy(() => import("../components/PaymentSuccess/PaymentSuccess").then((m) => ({ default: m.PaymentSuccess })));

export const CustomerRouter = () => {
    const auth = useSelector((store) => store.auth);
    const isAuthenticated = Boolean(auth.user || auth.jwt || localStorage.getItem("jwt"));

    return (
        <div>
            <Navbar />
            <Suspense fallback={<div className='p-4 text-sm text-gray-400'>Loading page...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account/login' element={<Home />} />
                    <Route path='/account/register' element={<Home />} />
                    <Route path='/account/:register' element={<Home />} />
                    <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                    <Route path='/cart' element={isAuthenticated ? <Cart /> : <Navigate to='/account/login' replace />} />
                    <Route path='/my-profile/*' element={<Profile />} />
                    <Route path='/payment/success/:id' element={<PaymentSuccess />} />
                    <Route path='*' element={<Home />} />
                </Routes>
                <Auth />
            </Suspense>
        </div>
    );
};
