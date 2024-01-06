import { Avatar } from "@/ui/design-system/avatar/avatar"
import { RiCameraFill } from "react-icons/ri"

interface Props {
    handleImageSelect: (e: React.ChangeEvent <HTMLInputElement> ) => void;
    imagePreview : string | ArrayBuffer | null;
}

export const UploadAvatar = ({handleImageSelect,imagePreview}:Props) => {
    return(
        <div className="flex items-center gap-5">
            <label className="inline-block bg-primary hover:bg-primary-400 text-white rounded px-[18px] py-[15px] text-caption-2 font-medium cursor-pointer animate">
                <div className="flex items-center gap-2">
                    <RiCameraFill/>
                    <span>Choisir un fichier</span>
                </div>
                <input type="file" className="hidden" onChange={handleImageSelect}/>
            </label>
            <Avatar size="extralarge" alt="Avatar"src={
                imagePreview ?
                 typeof imagePreview === "string"? imagePreview: String(imagePreview) :"/assets/svg/camera.svg"
                }
            />
        </div>
    )
}