import {Route, Routes} from "react-router-dom";
import {configs} from "../config";
import {ProfileRouter} from "../../libs/FormCmsAdminSdk";
import React from "react";
import {ChangePasswordPage} from "../profile/ChangePasswordPage";
import {SetAvatarPage} from "../profile/SetAvatarPage";
import {PortalRouter} from "./PortalRouter";

export function AppRouter() {
    return <Routes>
        <Route path={`${configs.portalRouterPrefix}/*`} element={
            <PortalRouter />
        }/>

        <Route path={`${configs.portalRouterPrefix}/profile/*`} element={
            <ProfileRouter
                baseRouter={configs.portalRouterPrefix + "/profile"}
                ChangePasswordPage={ChangePasswordPage}
                SetAvatarPage={SetAvatarPage}
            />
        }/>
    </Routes>
}