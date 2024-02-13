import {Navigate, Outlet} from "react-router-dom";
import { publicRoutes } from "../models/routes";


export const AuthGuard = () =>{
    const dataUserLocalStorage = JSON.parse(localStorage.getItem("user"));
    return dataUserLocalStorage? <Outlet/> : <Navigate replace to={publicRoutes.LOGIN_PUBLIC}/>
};


export default AuthGuard;   