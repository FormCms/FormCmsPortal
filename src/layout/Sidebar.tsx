import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {Logo} from "./Logo";
import {useNavigate} from "react-router-dom";
import {configs} from "../config";

export function Sidebar() {
    const baseRouter  = configs.portalRouterPrefix;
    const navigate = useNavigate();
    let items : MenuItem[] = [
        {
            template: () => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-2 py-2">
                        <Logo/> Form CMS
                    </span>
                )
            }
        },
        {
            label: "History",
            icon:"pi pi-history",
            command() {
                navigate(baseRouter + "/view");
            }
        },
        {
            label: "Liked",
            icon:"pi pi-heart-fill",
            command() {
                navigate(baseRouter + "/like");
            }
        },
    ];
    return <div className="flex justify-content-center">
        <Menu model={items} className="w-full md:w-15rem" style={{fontSize: '1.1rem'}}/>
    </div>
}