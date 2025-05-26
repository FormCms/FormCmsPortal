import {Route, Routes} from "react-router-dom";
import {configs} from "../config";
import {ProfileRouter, PortalRouter} from "../../libs/FormCmsAdminSdk";
import {ActivityPage} from "../activity/pages/ActivityPage";
import {BookmarkPage} from "../activity/pages/BookmarkPage";
import React from "react";
import {ChangePasswordPage} from "../profile/ChangePasswordPage";
import {SetAvatarPage} from "../profile/SetAvatarPage";

export function AppRouter() {
    return <Routes>
        <Route path={`${configs.portalRouterPrefix}/*`} element={
            <PortalRouter
                baseRouter={configs.portalRouterPrefix}
                ActivityListPage={ActivityPage}
                BookmarkPage={BookmarkPage}
            />
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