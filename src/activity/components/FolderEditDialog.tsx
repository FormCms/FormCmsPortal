import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useForm} from "react-hook-form";
import {BookmarkFolder} from "../../../libs/FormCmsAdminSdk";
import {useEffect} from "react";
import {Message} from "primereact/message";

type FolderEditDialogProps = {
    visible: boolean;
    setVisible: (value: boolean) => void;
    folder: BookmarkFolder;
    updateBookmarkFolder: (id:number,bookmarkFolder: BookmarkFolder) => Promise<void>;
    errorMessage:string|undefined;
};

export function FolderEditDialog(
    {
        folder,
        visible,
        setVisible,
        updateBookmarkFolder,
        errorMessage,
    }: FolderEditDialogProps
): JSX.Element {
    const formId = "folderEditDialog";

    const {register, handleSubmit, reset} = useForm<BookmarkFolder>({
        defaultValues: {
            name: folder.name,
            description: folder.description
        }
    });

    // Reset the form each time the dialog becomes visible with new data
    useEffect(() => {
        if (visible) {
            reset({
                name: folder.name,
                description: folder.description
            });
        }
    }, [visible, folder, reset]);

    async function onSubmit  (data: BookmarkFolder)  {
        await updateBookmarkFolder(folder.id, data);
        if(!errorMessage){
            setVisible(false);
        }
    }

    const footer = (
        <>
            <Button
                label={"Cancel"}
                icon="pi pi-times"
                outlined
                type="button"
                onClick={() => setVisible(false)}
            />
            <Button
                label={"Save"}
                icon="pi pi-check"
                type="submit"
                form={formId}
            />
        </>
    );

    return (
        <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            header={"Edit Folder"}
            footer={footer}
        >
            {errorMessage && <Message severity={"error"} text={errorMessage} />}
            <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                <div className="formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            className="w-full p-inputtext p-component"
                            {...register("name")}
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="w-full p-inputtext p-component"
                            {...register("description")}
                        />
                    </div>
                </div>
            </form>
        </Dialog>
    );
}
