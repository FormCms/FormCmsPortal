import {Route, Routes} from "react-router-dom";
import {configs} from "../config";
import {AccountRouter, PortalRouter} from "../../libs/FormCmsAdminSdk";
import {ActivityPage} from "../activity/pages/ActivityPage";
import {BookmarkPage} from "../activity/pages/BookmarkPage";
import React from "react";
import {ChangePasswordPage} from "../auth/ChangePasswordPage";

export function AppRouter() {
    return <Routes>
        <Route path={`${configs.portalRouterPrefix}/*`} element={
            <PortalRouter
                baseRouter={configs.portalRouterPrefix}
                ActivityListPage={ActivityPage}
                BookmarkPage={BookmarkPage}
            />
        }/>
        <Route path={`${configs.authRouterPrefix}/*`} element={
            <AccountRouter
                baseRouter={configs.authRouterPrefix}
                ChangePasswordPage={ChangePasswordPage}/>
        }/>
    </Routes>
}