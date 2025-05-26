import {Image} from "primereact/image";
import {Button} from "primereact/button";
import {useState} from "react";
import {useSetAvatarPage} from "../../libs/FormCmsAdminSdk/auth/pages/useSetAvatarPage";
import {Message} from "primereact/message";
import {useMenuHeader} from "../globalState";

export function SetAvatarPage() {
    const [_, setHeader] = useMenuHeader()
    setHeader("Set Avatar");

    const {user, saveAvatar, error} = useSetAvatarPage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(user?.avatarUrl || "");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        await saveAvatar(selectedFile);
    };

    return (
        <>
            {error && <Message severity="error">{error}</Message>}
            <div style={{maxWidth: "400px", margin: "0 auto", padding: "20px"}}>
                <Image
                    src={previewUrl}
                    alt="Profile avatar"
                    width="150"
                    height="150"
                    style={{borderRadius: "50%", marginBottom: "20px"}}
                    preview
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{marginBottom: "20px", display: "block"}}
                />

                <Button
                    label="Save"
                    onClick={handleSave}
                    style={{width: "100%"}}
                />
            </div>
        </>
    );
}
