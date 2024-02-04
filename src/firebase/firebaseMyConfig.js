import { initializeApp } from "firebase/app"; 

import {getAuth} from "firebase/auth"; 
// usar los varios metodos de auth que ofrece firebase

import { getStorage } from "firebase/storage";

import { getFirestore, collection, getDocs, addDoc, getDoc, doc, query, where, setDoc, deleteDoc } from "firebase/firestore"; 
// funciones para CRUD basico
// getFirestore , una de las bases de datos que ofrese Firebase
// Firestore es una base de datos NoSQL flexible, escalable y en la nube

import { getAnalytics } from "firebase/analytics";
 // data ilimitada de como se comportan mis usuarios


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY ,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROYECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUKECKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID ,
  measurementId: process.env.REACT_APP_MEASUREMENTID
  // protejo mis credenciales en .env , archivo de variables de entorno
};

// incio firebase/ paso mi config / import initializeApp al inicio
export const app = initializeApp(firebaseConfig);


// paso mi "llave" app
export const auth = getAuth(app);
export const storage = getStorage(app);
const dbFirestore = getFirestore(app);
const analytics = getAnalytics(app);




// npm i firebase: se descargan todas las dependencias otra opcion seria pegar e codigo html que te da firenase cuando creas un proyecto

