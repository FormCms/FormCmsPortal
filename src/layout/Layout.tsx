import {Sidebar} from "./Sidebar";
import {TopBar} from "./TopBar";
import {Route, Routes} from "react-router-dom";
import {configs} from "../config";
import {PortalRouter} from "../../libs/FormCmsAdminSdk/activity/PortalRouter";
import {ActivityListPage} from "../pages/activity/ActivityListPage";
import React from "react";

export function Layout() {
    return <div className="flex">
        <Sidebar />
        <div style={{paddingLeft: '1rem', paddingRight: '1rem', width: '100%'}}>
            <TopBar/>
            <Routes>
                <Route path={`${configs.portalRouterPrefix}/*`} element={
                    <PortalRouter baseRouter={configs.portalRouterPrefix} ActivityListPage={ActivityListPage}/>
                }/>
            </Routes>
        </div>
    </div>
}