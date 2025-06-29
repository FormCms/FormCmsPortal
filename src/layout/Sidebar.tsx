import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {Logo} from "./Logo";
import {useNavigate} from "react-router-dom";
import {configs} from "../config";
import {useBookmarkFolders} from "../../libs/FormCmsAdminSdk";

export function Sidebar() {
    const baseRouter  = configs.portalRouterPrefix;
    const navigate = useNavigate();
    const {data:folders} = useBookmarkFolders();

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
            separator:true,
        },
        {
            label: "Notifications",
            icon:"pi pi-bell",
            command() {
                navigate(baseRouter + "/notifications");
            }
        },
        {
            separator:true,
        },
        {
            label: "History",
            icon:"pi pi-history",
            command() {
                navigate(baseRouter + "/activities/view");
            }
        },
        {
            label: "Liked",
            icon:"pi pi-heart-fill",
            command() {
                navigate(baseRouter + "/activities/like");
            }
        },
        {
            separator:true,
        },
        {
            label:"Bookmarks",
            items: (folders??[]).map(folder=>({
                icon:"pi pi-bookmark-fill",
               label: folder.name || 'Default',
               command(){
                   navigate(baseRouter + "/bookmarks/" + folder.id);
               }
            }))
        }
    ];
    return <div className="flex justify-content-center">
        <Menu model={items} className="w-full md:w-15rem" style={{fontSize: '1.1rem'}}/>
    </div>
}