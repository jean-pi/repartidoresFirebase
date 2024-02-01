
//router dom
import { Outlet, useNavigate} from "react-router-dom";
import { publicRoutes } from "../models/routes";

//hooks
import { useEffect } from "react";



export default function DetectorUrlAction() {

    const navigate = useNavigate()

    useEffect( () => {
        
        let url = window.location.search;
        const ulrParams = new URLSearchParams(url);
        let mode = ulrParams.get("mode");
        let oobCode = ulrParams.get("obbCode");
        let lang = ulrParams.get("lang");

        if(mode === "verifyEmail") navigate(`http://localhost:3000${publicRoutes.LOGIN_PUBLIC}?mode=${mode}&oobCode=${oobCode}&lang=${lang}`)
        if(mode === "resetPassword") navigate(`http://localhost:3000${publicRoutes.RECOVERPASSWORD_PUBLIC}?mode=${mode}&oobCode=${oobCode}&lang=${lang}`)

    }, []);

    return (
        <Outlet/>
    )
}
