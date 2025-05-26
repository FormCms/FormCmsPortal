import {AuthRouter} from "../../libs/FormCmsAdminSdk";
import {configs} from "../config";
import {LoginPage} from "./LoginPage";
import {RegisterPage} from "./RegisterPage";
import {Route, Routes} from "react-router-dom";
import React from "react";

export const LoginLayout = () => {
    const Router = ()=><AuthRouter
        baseRouter={configs.portalRouterPrefix + "/auth"}
        LoginPage={LoginPage}
        RegisterPage={RegisterPage}
    />
    return  <Routes>
        <Route path={`${configs.portalRouterPrefix}/auth/*`} element={<Router/>}/>
        <Route path="*" element={<Router/>}/>
    </Routes>
}