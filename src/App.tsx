import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import './App.css';
import {configs} from "./config";
import axios from "axios";
import {setAuthApiBaseUrl, useUserInfo} from "../libs/FormCmsAdminSdk";
import {Layout} from "./layout/Layout";
import React from "react";
import {setActivityBaseUrl} from "../libs/FormCmsAdminSdk";
import {LoginLayout} from "./auth/LoginLayout";
import {setNotificationBaseUrl} from "../libs/FormCmsAdminSdk/notifications/config";

setActivityBaseUrl(configs.apiURL);
setAuthApiBaseUrl(configs.apiURL);
setNotificationBaseUrl(configs.apiURL);
axios.defaults.withCredentials = true;

export default function App() {
    const {data} = useUserInfo();
    return data ? <Layout/> : <LoginLayout/>
}