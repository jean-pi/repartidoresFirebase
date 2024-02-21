import { useEffect } from "react";


//componets
import LoginEmailPassword from "../components/loginSignupRegisterSistem/login";

//css
import stylesLoginRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"

//img
import backArrowImg from "../img/backArrowPng.png";

//router/react
import { Link } from "react-router-dom";
import { publicRoutes } from "../models/routes";

    
export default function LoginView(){


    useEffect(()=>{
    },[]);


    return(
        <div className={stylesLoginRoute.containerLogin_SignUp_RegistrationRoute}>
            <Link tabIndex={"0"} className={stylesLoginRoute.linkBack} to={publicRoutes.MAINROUTE_PUBLIC}>
                <div  className={stylesLoginRoute.divBack}>            
                    <img className={stylesLoginRoute.divBack_img} src={backArrowImg} alt="" />
                    Back
                </div>
            </Link>
            <LoginEmailPassword/> 


   
        </div>
    );
}
