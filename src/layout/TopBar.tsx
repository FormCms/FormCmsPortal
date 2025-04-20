import {Menubar} from "primereact/menubar";
import React from "react";
import {UserAvatar} from "./UserAvatar";
import {useMenuHeader} from "../globalState";

export function TopBar() {
    const [header, _] = useMenuHeader();
    const start = <h3>{header}</h3>
    return  <Menubar start={start} end={<UserAvatar/>}/>
}