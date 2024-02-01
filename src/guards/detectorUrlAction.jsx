
//router dom
import { Navigate, Outlet, useNavigate} from "react-router-dom";
import { publicRoutes } from "../models/routes";

//hooks
import { useEffect } from "react";



export default function DetectorUrlAction() {

    // const navigate = useNavigate()

    // useEffect( () => {
        
    //     let url = window.location.search;
    //     const ulrParams = new URLSearchParams(url);
    //     let mode = ulrParams.get("mode");
    //     let oobCode = ulrParams.get("obbCode");
    //     let lang = ulrParams.get("lang");

    //     if(mode === "verifyEmail") navigate(`${publicRoutes.LOGIN_PUBLIC}?mode=${mode}&oobCode=${oobCode}&lang=${lang}`)
    //     if(mode === "resetPassword") navigate(`${publicRoutes.RECOVERPASSWORD_PUBLIC}?mode=${mode}&oobCode=${oobCode}&lang=${lang}`)

    // }, []);

           
    let url = window.location.search;
    const ulrParams = new URLSearchParams(url);
    let mode = ulrParams.get("mode");
    let oobCode = ulrParams.get("oobCode");
    let apiKey= ulrParams.get("apiKey");
    let lang = ulrParams.get("lang");

    let urlSiguiente = mode === "verifyEmail"
    ? `${publicRoutes.LOGIN_PUBLIC}?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}` 
    : `${publicRoutes.RECOVERPASSWORD_PUBLIC}?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`;

    return mode? <Navigate replace to={urlSiguiente} /> : <Outlet/>
}
