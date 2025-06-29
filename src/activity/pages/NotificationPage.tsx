import {useMenuHeader} from "../../globalState";
import {classNames} from "primereact/utils";
import {configs} from "../../config";
import {keywordFilters, utcStrToDatetimeStr,Notification,useNotificationPage} from "../../../libs/FormCmsAdminSdk";
import {DataView} from "primereact/dataview";
import {SearchHeader} from "../components/SearchHeader";

const Labels = {
    Header: 'Notification',
    notificationLabel: {
        comment: 'commented',
        like: 'liked'
    }
}

export function NotificationPage() {
    const [_, setHeader] = useMenuHeader()
    setHeader(Labels.Header);
    const {notificationResponse, stateManager, orderFields, searchField} = useNotificationPage();

    function handleSort(field: string, order: 1 | -1) {
        stateManager.handlers.onSort([{field, order}]);
    }

    function handleSearch(field: string, keyword: string) {
        stateManager.handlers.onFilter(keywordFilters(field, keyword));
    }

    function listTemplate(items: any[]) {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;

        function itemTemplate(item: Notification, index: number) {
            const txt = Labels.notificationLabel[item.actionType as keyof typeof Labels.notificationLabel];
            return <div className="col-12" key={item.id}>
                <a className={'no-style'} href={item.url}>
                    <div style={{paddingTop: "1.5em", paddingBottom: "1.5em"}}
                         className={classNames('flex flex-column xl:flex-row xl:align-items-start gap-4', {'border-top-1 surface-border': index !== 0})}>
                        <img
                            className="w-9 sm:w-5rem xl:w-5rem shadow-2 block xl:block mx-auto border-round"
                            style={{height: '5rem', objectFit: 'cover'}}
                            src={configs.assetURL + item.sender?.avatarUrl}
                            alt={item.sender?.name}
                        />

                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                            style={{minHeight: '5rem'}}
                        >
                            <div className="flex py-2 flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-xl text-900">
                                    <span style={{fontWeight: 'bold'}}>{item.sender?.name}</span>
                                    <span style={{fontFamily: 'Courier New, Courier, monospace'}}> {txt} your {item.messageType}</span>
                                    <span className={"px-2"}>{item.message}</span>
                                </div>
                                <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-calendar"></i>
                                    <span
                                        className="font-semibold">{txt} At: {utcStrToDatetimeStr(item.createdAt)}</span>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        }
    }
    return notificationResponse && <div className="card">
        <DataView
            value={notificationResponse.items}
            lazy paginator
            rows={stateManager.state.rows}
            totalRecords={notificationResponse.totalRecords}
            onPage={stateManager.handlers.onPage}
            first={stateManager.state.first}
            listTemplate={listTemplate}
            header={<div className="flex justify-content-bwtween gap-4">
                <SearchHeader
                    searchField={searchField}
                    sortFields={orderFields('Action','Message Type','Sent At')}
                    sort={stateManager.state.multiSortMeta[0]}
                    onSearch={handleSearch}
                    onSort={handleSort}
                />
            </div>}
        />
    </div>
}