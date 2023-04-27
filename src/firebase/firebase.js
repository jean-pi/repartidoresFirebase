import { initializeApp } from "firebase/app"; 

// servicios y sus funciones a usar
import {getAuth} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, getDoc, doc, query, where, setDoc, deleteDoc } from "firebase/firestore"; // funciones para CRUD basico
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY ,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROYECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUKECKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID ,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// incio firebase/ paso mi config
export const app = initializeApp(firebaseConfig);

// paso mi "llave" app
export const auth = getAuth(app);
const dbFirestore = getFirestore(app);
const analytics = getAnalytics(app);

