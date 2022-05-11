import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig";


const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuthentication;