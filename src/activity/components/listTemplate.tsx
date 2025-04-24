import {classNames} from "primereact/utils";
import {configs} from "../../config";
import {Button} from "primereact/button";
import {toDatetimeStr} from "../../../libs/FormCmsAdminSdk";
import {utcStrToDatetimeStr} from "../../../libs/FormCmsAdminSdk/types/formatter";

type Item = {
    id: number,
    url: string,
    image: string,
    title: string,
    subtitle: string,
    publishedAt: Date
    updatedAt: Date
}

export  const itemListTemplate = (engagedAtLabel :string,items: Item[], onDelete:(item:Item)=>void) => {
    if (!items || items.length === 0) return null;
    let list = items.map((product, index) => {
        return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;

    function itemTemplate  (item: Item, index: number)  {
        console.log({item});
        return (
            <div className="col-12" key={item.id}>
                <div style={{paddingTop:"1.5em", paddingBottom:"1.5em"}}
                     className={classNames('flex flex-column xl:flex-row xl:align-items-start gap-4', {'border-top-1 surface-border': index !== 0})}>
                    <a className={'no-style'} href={item.url}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                             src={configs.assetURL + item.image} alt={item.title}/>
                    </a>
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                <a className={'no-style'} href={item.url}>
                                    {item.title}
                                </a>
                            </div>
                            <div className="text-xl  text-900">{item.subtitle}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-calendar"></i>
                                    <span
                                        className="font-semibold">Published At: {utcStrToDatetimeStr(item.publishedAt)}</span>
                                </span>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-calendar"></i>
                                    <span className="font-semibold">{engagedAtLabel}: {utcStrToDatetimeStr(item.updatedAt) }</span>
                                </span>

                            </div>
                        </div>
                    </div>
                    <Button icon={'pi pi-trash'} rounded outlined severity={'danger'} onClick={() => onDelete(item)}/>
                </div>
            </div>
        );
    }
};