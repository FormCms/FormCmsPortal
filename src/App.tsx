import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import './App.css';
import {configs} from "./config";
import axios from "axios";
import {AuthRouter, setAuthApiBaseUrl, useUserInfo} from "../libs/FormCmsAdminSdk";
import {LoginPage} from "./auth/LoginPage";
import {RegisterPage} from "./auth/RegisterPage";
import {Layout} from "./layout/Layout";
import React from "react";
import {setActivityBaseUrl} from "../libs/FormCmsAdminSdk/activity/config";
import {Route, Routes} from "react-router-dom";

setActivityBaseUrl(configs.apiURL);
setAuthApiBaseUrl(configs.apiURL);
axios.defaults.withCredentials = true;

export default function App() {
    const {data} = useUserInfo();
    const AuthRouterComponent = () => (
        <AuthRouter
            baseRouter={configs.portalRouterPrefix +"/auth"}
            LoginPage={LoginPage}
            RegisterPage={RegisterPage}
        />
    );
    return data
        ? <> <Layout/> </>
        : <Routes>
            <Route path={`${configs.portalRouterPrefix}/auth/*`} element={<AuthRouterComponent/>}/>
            <Route path="*" element={<AuthRouterComponent/>}/>
        </Routes>
}