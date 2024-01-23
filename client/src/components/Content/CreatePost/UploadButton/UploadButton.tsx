import { Dispatch, FC, SetStateAction } from "react";
import { File } from "../../../../interfaces/File";
import { Upload, Button } from "antd";
import style from "../CreatePost.module.scss";

const UploadButton: FC<{
    icon: string;
    label: string;
    setFileList: Dispatch<SetStateAction<File[]>>;
}> = ({ icon, label, setFileList }) => (

    <Upload
        beforeUpload={(file) => {
            return new Promise((resolve, reject) => {
                if (file.size > 2) {
                    reject("Rejected");
                } else {
                    resolve("Success");
                }
            });
        }}
        onChange={(response) => {
            if (response.file.status !== "uploading") {
                setFileList(response.fileList);
            }
            if (response.file.status === "done") {
                console.log(response.file);
            } else if (response.file.status === "error") {
                console.log(`${response.file.name} file upload failed.`);
            }
        }}
    >
        <div className={style.btnDiv}>
            <Button className={style.button}>
                <img src={icon} className={style.icon} alt="/" />
                <p>{label}</p>
            </Button>
        </div>
    </Upload>
    
);

export default UploadButton;
