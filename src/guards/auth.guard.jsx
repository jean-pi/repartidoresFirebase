import {Navigate, Outlet} from "react-router-dom";
import { publicRoutes } from "../models/routes";


export const authGuard = () =>{
    const dataUserLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log("zz")
    return dataUserLocalStorage? <Outlet/> : <Navigate replace to={publicRoutes.LOGIN_PUBLIC}/>
};


export default authGuard;   