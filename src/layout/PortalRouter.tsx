import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {NotificationPage} from "../notifications/pages/NotificationPage";
import {BookmarkPage} from "../activity/pages/BookmarkPage";
import {SubPage} from "../sub/pages/SubPage";
import {ActivityPage} from "../activity/pages/ActivityPage";
import {configs} from "../config";



export function PortalRouter()
 {
    return <Routes>
        <Route path={`/notifications`} element={ <NotificationPage/> }/>
        <Route path={`/activities/:type`} element={ <ActivityPage/> }/>
        <Route path={`/bookmarks/:folderId`} element={ <BookmarkPage/> }/>
        <Route path={`/sub/view`} element={ <SubPage/> }/>
        <Route path='' element={ <Navigate to={`${configs.portalRouterPrefix}/notifications`}/> }/>
    </Routes>
}