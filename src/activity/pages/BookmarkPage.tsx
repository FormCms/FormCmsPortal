import {useMenuHeader} from "../../globalState";
import {DataView} from "primereact/dataview";
import {itemListTemplate} from "../components/listTemplate";
import {SearchHeader} from "../components/SearchHeader";
import {keywordFilters, useBookmarkListPage} from "../../../libs/FormCmsAdminSdk";
import {Button} from "primereact/button";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {Message} from "primereact/message";
import {useState} from "react";
import {FolderEditDialog} from "../components/FolderEditDialog";
import {useNavigate} from "react-router-dom";
import {configs} from "../../config";

export function BookmarkPage() {
    const {
        folder,
        bookmarkResponse,
        stateManager,
        updateBookmarkFolder,
        deleteBookmarkFolder,
        deleteBookmark,
        errorMessage,
        searchField,
        orderFields,
    } = useBookmarkListPage();

    const [_, setHeader] = useMenuHeader()
    setHeader(folder?.name || 'Default');
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);
    const navigate = useNavigate();



    function handleSearch(field: string, keyword: string) {
        stateManager.handlers.onFilter(keywordFilters(field, keyword));
    }

    function handleSort(field: string, order: 1 | -1) {
        stateManager.handlers.onSort([{field, order}]);
    }

    function handleDeleteFolder() {
        confirmDialog({
            icon: 'pi pi-exclamation-triangle',
            header: "Confirm",
            message: "Are you sure to delete this bookmark folder",
            accept: async ()=> {
                await deleteBookmarkFolder(folder!.id)
                if (!errorMessage){
                    navigate(configs.portalRouterPrefix + "/bookmarks/0");
                }
            }
        });
    }

    function listTemplate(items: any[]) {
        return itemListTemplate('Bookmarked At', items, async  item => await deleteBookmark(item.id));
    }

    return <>
        <ConfirmDialog/>
        {
            folder && <FolderEditDialog
                errorMessage={errorMessage}
                updateBookmarkFolder={updateBookmarkFolder}
                folder={folder}
                visible={editDialogVisible}
                setVisible={setEditDialogVisible}
            />
        }
        {
            errorMessage && <Message severity={'error'} text={errorMessage}/>
        }
        {
            bookmarkResponse && <div className="card">
                <DataView
                    value={bookmarkResponse.items}
                    lazy paginator
                    rows={stateManager.state.rows}
                    totalRecords={bookmarkResponse.totalRecords}
                    onPage={stateManager.handlers.onPage}
                    first={stateManager.state.first}
                    listTemplate={listTemplate}
                    header={
                        <div className="flex justify-content-bwtween gap-4">
                            <SearchHeader
                                searchField={searchField}
                                sortFields={orderFields('Published At', 'Bookmarked At')}
                                sort={stateManager.state.multiSortMeta[0]}
                                onSearch={handleSearch}
                                onSort={handleSort}
                            />
                            {
                                folder && folder.id > 0 && <>
                                    <Button icon={'pi pi-pencil'} outlined label={'Edit Folder'}
                                            onClick={() => setEditDialogVisible(true)}
                                            className={'p-button'}/>
                                    <Button icon={'pi pi-trash'} outlined label={'Delete Folder'}
                                            onClick={handleDeleteFolder}
                                            className={'p-button'} severity={'danger'}/>
                                </>
                            }
                        </div>
                    }
                />
            </div>
        }
    </>
}