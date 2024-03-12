import { useAuth } from "@/context/authUserContext";
import { ImageProject } from "@/ui/design-system/image-project/image-project";
import clsx from "clsx";

interface Props {
    handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string | ArrayBuffer | null;
    uploadProgress: number;
    isLoading: boolean;
    variant?: "primary" | "outline";
}

export const UploadImages = ({
    handleImageSelect,
    imagePreview,
    uploadProgress,
    isLoading,
    variant = "primary"
}: Props) => {
    const { authUser } = useAuth();

    const uploadProgressBarStyle = `fixed top-0 left-0 w-full h-1 bg-secondary animate ${uploadProgress > 0 ? "" : "hidden"}`;

    return (
        <div className="flex items-center gap-5">
            <div className={uploadProgressBarStyle} style={{ width: `${uploadProgress}%` }} />

            <label className={clsx(
                isLoading ? "cursor-not-allowed" : "cursor-pointer",
                variant === "primary" && "bg-primary hover:bg-primary-400 text-white",
                variant === "outline" && "bg-white hover:bg-secondary border border-gray-700 text-gray-800",
                "inline-block rounded px-[18px] py-[15px] text-caption-2 font-medium animate"
            )}>
                <div className="flex items-center gap-2">
                    <ImageProject src="" alt="" />
                    
                    {imagePreview && <img src={typeof imagePreview === "string" ? imagePreview : String(imagePreview)} alt="Aperçu" />}


                </div>

                <input
                    type="file"
                    disabled={isLoading}
                    className="hidden"
                    onChange={handleImageSelect}
                />
            </label>

            <div>
                {isLoading ? <div>Chargement...</div> : null}
                {uploadProgress > 0 ? <div>Progression du téléchargement : {uploadProgress}%</div> : null}

            </div>
        </div>
    );
};
