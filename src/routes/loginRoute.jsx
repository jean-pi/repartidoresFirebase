import { useEffect } from "react";


//componets
import LoginEmailPassword from "../components/loginSignupRegisterSistem/login";

//css
import stylesLoginRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"

//img
import backArrowImg from "../img/backArrowPng.png";

//router/react
import { Link } from "react-router-dom";

export default function LoginView(){


    useEffect(()=>{
    },[]);


    return(
        <div className={stylesLoginRoute.containerLogin_SignUp_RegistrationRoute}>
            <Link className={stylesLoginRoute.linkBack} to="/presentacion">
                <div className={stylesLoginRoute.divBack}>            
                    <img className={stylesLoginRoute.divBack_img} src={backArrowImg} alt="" />
                    Back
                </div>
            </Link>
            <LoginEmailPassword/> 
        </div>
    );
}
