import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {configs} from "../config";
import {Avatar} from "primereact/avatar";
import {Menu} from "primereact/menu";
import {useUserInfo, useUserProfileMenu} from "../../libs/FormCmsAdminSdk";

export function UserAvatar(){
    const menu = useRef<any>(null);
    const {data: userAccessInfo} = useUserInfo();
    const menus = useUserProfileMenu(configs.authRouterPrefix);
    const navigate = useNavigate();
    const menuItems = menus.map((item) => {
        return {
            ...item,
            command: item.command ? item.command : () => navigate(item.link),
        };
    })

    function handleToggle(event: any) {
        menu?.current?.toggle(event);
    }

    return (
        <div className="flex align-items-center gap-2">
            <Avatar onClick={handleToggle} icon="pi pi-user" size="normal"
                    style={{backgroundColor: '#2196F3', color: '#ffffff'}} shape="circle"/>
            <Menu model={menuItems} popup ref={menu}/>
            <span onClick={handleToggle} style={{cursor: 'pointer'}}>{userAccessInfo?.email.split('@')[0]}</span>
        </div>
    );
}