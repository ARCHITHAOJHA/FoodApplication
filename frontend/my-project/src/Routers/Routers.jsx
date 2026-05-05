import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoute } from "./AdminRouters";
import { CustomerRouter } from "./CustomRouter";

const Routers = () => {
    return (
        <Routes>
            <Route path='/admin/restaurant/*' element={<AdminRoute />} />
            <Route path='/*' element={<CustomerRouter />} />
        </Routes>
    );
};

export default Routers;
