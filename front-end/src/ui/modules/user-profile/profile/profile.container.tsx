import { useAuth } from "@/context/authUserContext";
import { ProfileView } from "./profile-view";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFieldsType } from "@/types/forms";
import { useEffect, useState } from "react";
import { firestoreUpdateDocument } from "@/api/firestore";
import { toast } from "react-toastify";
import { StorageReference, UploadTask, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase-config";
import { updateUserIdenticationData } from "@/api/authentication";

export const ProfileContainer = () => {
  const { authUser, reloadAuthUserData } = useAuth();
  const { value: isLoading, setValue: setLoading } = useToggle();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);


  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
    setError,
    watch,
  } = useForm<UserProfileFormFieldsType>();

  const {displayName, expertise, biography, linkedin, github} = 
    authUser.userDocument;

    useEffect(() => {
      const fieldsToUpdate : (
          |"displayName"
          |"expertise"
          |"biography"
          |"linkedin"
          |"github"
      )[] = ["displayName","expertise","biography","linkedin","github"];

        for (const field of fieldsToUpdate) {
          setValue(field,authUser.userDocument[field])
        }

    },[])

    console.log('watch()', watch())

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; //e= evenement
  
      if (file) {
        setSelectedImage(file);
  
        const reader = new FileReader();
        reader.onload = (e) => {
          let imgDataUrl: string | ArrayBuffer | null = null;
          if (e.target) {
            imgDataUrl = e.target.result;
          }
          setImagePreview(imgDataUrl);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleImageUpload = () => {
      let storageRef: StorageReference;
      let uploadTask: UploadTask;
  
      if (selectedImage !== null) {
        setLoading(true);
        storageRef = ref(
          storage,
          `users-media/${authUser.uid}/avatar/avatar-${authUser.uid}`
        );
        uploadTask = uploadBytesResumable(storageRef, selectedImage);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //barre de chargement de l upload
            setUploadProgress(progress);
          },
          (error) => {
            setLoading(false);
            toast.error("Une erreur inconnue est survenue");
            setUploadProgress(0)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                updateUserAvatar(downloadURL);
                setSelectedImage(null)
                setTimeout(()=>{
                  setUploadProgress(0)
                },1000)
              }
            )
          }
        );
      }
    };

    const updateUserAvatar = async (photoURL : string) => {
      const body = {
        photoURL: photoURL,
      }
      await updateUserIdenticationData(authUser.uid, body)
      const {error} = await firestoreUpdateDocument(
        "users",
        authUser.uid,
        body
      );
      if ( error) {
        setLoading(false);
        toast.error(error.message);
        return
      }
      reloadAuthUserData()
      setLoading(false)
    };

  const handleUpdateUserDocument = async (
    formData: UserProfileFormFieldsType
  ) => {
    setLoading(true);
    

    const {error} = await firestoreUpdateDocument(
      "users",
      authUser.uid,
      formData
    );
    if (error){
      setLoading(false);
      toast.error(error.message);
      return;
    }
    toast.success("Ton profil a été mis à jour avec succès")
    setLoading(false);

  };

  const onSubmit: SubmitHandler<UserProfileFormFieldsType> = async (
    formData
  ) => {
    if (selectedImage) {
      handleImageUpload();
    }

    if (formData.linkedin && !formData.linkedin.includes("linkedin.com/")) {
      setError("linkedin",{
        type:"manual",
        message: "Cet Url ne correspond pas à un profil Linkedin",
      })
      return;
    }

    if (formData.github && !formData.github.includes("github.com/")) {
      setError("github",{
        type:"manual",
        message: "Cet Url ne correspond pas à un profil Github",
      })
      return;
    }

    if(
      displayName !== formData.displayName ||
      expertise !== formData.expertise ||
      biography !== formData.biography ||
      linkedin !== formData.linkedin ||
      github !== formData.github
    ) {

      if (displayName !== formData.displayName || authUser.displayName !== formData.displayName){
        const body = {
          displayName: formData.displayName,
        };

        const {error} = await updateUserIdenticationData(
          authUser.uid,
          body
        );

        if ( error) {
          setLoading(false);
          toast.error(error.message);
          return
        }
        reloadAuthUserData()
      }

      for (const key in formData){
        if (
          formData.hasOwnProperty(key) &&
          formData[key as keyof UserProfileFormFieldsType] === undefined
        ){
          delete formData[key as keyof UserProfileFormFieldsType]
        }
        //efface la clé (linkedin, github, biography, etc..) de formData si elle renvoie undefined
      }
      
      console.log(formData);
      handleUpdateUserDocument(formData);    
      return;
    }
   
  };

  console.log("authUser", authUser);

  return (
    <ProfileView
    imagePreview ={imagePreview}
    uploadProgress ={uploadProgress}
    handleImageSelect ={handleImageSelect}
      form={{
        errors,
        control,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
      }}
    />
  );
};
