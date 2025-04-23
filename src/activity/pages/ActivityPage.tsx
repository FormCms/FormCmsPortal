import {Activity, keywordFilters, useActivityListPage} from "../../../libs/FormCmsAdminSdk";
import {useMenuHeader} from "../../globalState";
import {DataView} from 'primereact/dataview';
import {itemListTemplate} from "../components/listTemplate";
import {SearchHeader} from "../components/SearchHeader";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Message} from "primereact/message";

const Labels = {
    like: {
        Header: 'Liked',
        EngagedAtLabel: "Liked At"
    },
    view: {
        Header: 'History',
        EngagedAtLabel: "Viewed At"
    }
}

export function ActivityPage() {
    const [_, setHeader] = useMenuHeader()
    const {type, activityResponse, stateManager, deleteActivity, errorMessage} = useActivityListPage()
    const label = Labels[type as keyof typeof Labels];
    const menuHeader = label.Header;

    setHeader(menuHeader);

    function handleSort(field: string, order: 1 | -1) {
        stateManager.handlers.onSort([{field, order}]);
    }

    function handleSearch(field: string, keyword: string) {
        stateManager.handlers.onFilter(keywordFilters(field, keyword));
    }

    function listTemplate(item: Activity[]) {
        return itemListTemplate(label.EngagedAtLabel, item, async item => await deleteActivity(item.id));
    }

    return <>
        <ConfirmDialog/>
        {
            errorMessage && <Message severity={'error'} text={errorMessage}/>
        }
        {
            activityResponse && <div className="card">
                <DataView
                    value={activityResponse.items}
                    lazy paginator
                    rows={stateManager.state.rows}
                    totalRecords={activityResponse.totalRecords}
                    onPage={stateManager.handlers.onPage}
                    first={stateManager.state.first}
                    listTemplate={listTemplate}
                    header={<div className="flex justify-content-bwtween gap-4">
                        <SearchHeader
                            engagedAtLabel={label.EngagedAtLabel}
                            sort={stateManager.state.multiSortMeta[0]}
                            onSearch={handleSearch}
                            onSort={handleSort}
                        />
                    </div>}
                />
            </div>
        }
    </>
}