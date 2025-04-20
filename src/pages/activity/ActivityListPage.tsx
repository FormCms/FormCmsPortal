import {useActivityListPage, XEntity} from "../../../libs/FormCmsAdminSdk";
import {useMenuHeader} from "../../globalState";
import {classNames} from "primereact/utils";
import {Activity} from "../../../libs/FormCmsAdminSdk/activity/types/activity";
import {DataView} from 'primereact/dataview';
import {configs} from "../../config";
import {Dropdown} from "primereact/dropdown";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useState} from "react";

const Headers = {
    like: 'Liked',
    view: 'History'
}

const sortOptions = [
    {
        value: 'id:-1',
        label: 'ID Desc'
    },
    {
        value: 'updatedAt:-1',
        label: 'Updated At Desc'
    },
    {
        value: 'publishedAt:-1',
        label: 'Published At Desc'
    },
    {
        value: 'title: -1',
        label: 'Title Desc'
    },
    {
        value: 'id:1',
        label: 'ID Asc'
    },
    {
        value: 'updatedAt:1',
        label: 'Updated At Asc'
    },
    {
        value: 'publishedAt:1',
        label: 'Published At Asc'
    },
    {
        value: 'title:1',
        label: 'Title Asc'
    }
]

export function ActivityListPage({schema}: {
    schema: XEntity
}) {
    const [_, setHeader] = useMenuHeader()
    const {type, data, stateManager} = useActivityListPage(schema)
    const menuHeader = Headers[type as keyof typeof Headers];
    const [keyword, setKeyword] = useState('');
    setHeader(menuHeader);

    const itemTemplate = (activity: Activity, index: number) => {
        return (
            <div className="col-12" key={activity.id}>
                <div
                    className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', {'border-top-1 surface-border': index !== 0})}>
                    <a className={'no-style'} href={activity.url}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                             src={configs.assetURL + activity.image} alt={activity.title}/>
                    </a>
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                <a className={'no-style'} href={activity.url}>
                                    {activity.title}
                                </a>
                            </div>
                            <div className="text-xl  text-900">{activity.subtitle}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-calendar"></i>
                                    <span
                                        className="font-semibold">Published At: {activity.publishedAt.toString()}</span>
                                </span>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-calendar"></i>
                                    <span className="font-semibold">Updated At: {activity.updatedAt.toString()}</span>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items: Activity[]) => {
        if (!items || items.length === 0) return null;
        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    console.log(stateManager.state)
    const header = () => {
        return <div className="flex justify-content-bwtween gap-4">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"/>
                <InputText
                    value={keyword}
                    placeholder="Keyword Search"
                    onChange={e => setKeyword(e.target.value)}
                />
                <Button onClick={()=>stateManager.handlers.onFilter({
                    title:{
                        operator:'and',
                        constraints:[
                            {
                                matchMode:'contains',
                                value: keyword
                            }
                        ]
                    }
                })}>Search</Button>
            </IconField>

            <span>
                <span>Sort:</span>
                <Dropdown
                    options={sortOptions}
                    value={stateManager.state.multiSortMeta[0].field + ":" + stateManager.state.multiSortMeta[0].order}
                    optionLabel="label"
                    placeholder="Sort "
                    onChange={e => {
                        const [field, order] = e.value.split(":");
                        stateManager.handlers.onSort([{field, order}])
                    }}
                    className="w-full sm:w-14rem"
                />
            </span>
        </div>;
    };

    return data && <>
        <div className="card">
            <DataView
                value={data.items}
                lazy paginator
                rows={schema.defaultPageSize}
                totalRecords={data.totalRecords}
                onPage={stateManager.handlers.onPage}
                first={stateManager.state.first}

                listTemplate={listTemplate}
                header={header()}
            />
        </div>
    </>
}