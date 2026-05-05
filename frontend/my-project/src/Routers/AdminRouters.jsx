import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = lazy(() => import("../AdminComponent/Admin/Admin").then((m) => ({ default: m.Admin })));

export const AdminRoute = () => {
    const auth = useSelector((store) => store.auth);
    const jwt = auth.jwt || localStorage.getItem("jwt");

    if (!jwt) {
        return <Navigate to='/account/login' replace />;
    }

    if (!auth.user) {
        return <div className='p-4 text-sm text-gray-400'>Loading profile...</div>;
    }

    if (auth.user.role !== "ROLE_RESTAURANT_OWNER") {
        return <Navigate to='/' replace />;
    }

   return (
        <Suspense fallback={<div className='p-4 text-sm text-gray-400'>Loading admin...</div>}>
            <Routes>
                <Route path='/*' element={<Admin />} />
            </Routes>
        </Suspense>
    );
};
