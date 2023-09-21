import { useEffect } from "react";


import LoginEmailPassword from "../components/loginSignupRegisterSistem/login"

//css
import stylesLoginRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"

export default function LoginView(){


    useEffect(()=>{
    },[]);


    return(
        <div className={stylesLoginRoute.containerLogin_SignUp_RegistrationRoute}>
            <LoginEmailPassword/> 
        </div>
    );
}
