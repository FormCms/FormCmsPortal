import {Sidebar} from "./Sidebar";
import {TopBar} from "./TopBar";
import React from "react";
import {AppRouter} from "./AppRouters";

export function Layout() {
    return <div className="flex">
        <Sidebar />
        <div style={{paddingLeft: '1rem', paddingRight: '1rem', width: '100%'}}>
            <TopBar/>
            <AppRouter/>
        </div>
    </div>
}