import { Timestamp } from "firebase/firestore";

export interface UserInterface {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified : boolean;
    phoneNumber: string | null;
    photoURL: string | null;
    userDocument?: UserDocument;
}
export interface UserDocument {
    uid: string;
    email: string;
    what_is_your_prom: string
    creation_date: Timestamp
    //..
}