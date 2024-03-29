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
    what_is_your_prom: string;
    creation_date: Timestamp;
    onboardingIsCompleted: boolean;
    displayName : string;
    expertise : string;
    biography : string;
    photoURL : string | null;
    linkedin : string;
    github : string;
    
    
    
}

// export interface UserProjects {
//     projects: Project[];
// }
export interface Project {
    projectName: string;
    stackProject: string;
    photoURLs:string[];
  }
 export interface ProjectWithId extends Project {
    id: string;
    
  }