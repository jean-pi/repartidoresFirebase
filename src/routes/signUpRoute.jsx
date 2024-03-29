
import SignUpEmailPasswordForm from "../components/loginSignupRegisterSistem/signUp"

//css
import stylesSignUpRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"

//img
import backArrowImg from "../img/backArrowPng.png";

//router/react
import { Link } from "react-router-dom";
import { publicRoutes } from "../models/routes";

export default function LoginView(){


    return(
        <div className={stylesSignUpRoute.containerLogin_SignUp_RegistrationRoute}> 
            <Link className={stylesSignUpRoute.linkBack} to={publicRoutes.MAINROUTE_PUBLIC}>
                <div className={stylesSignUpRoute.divBack}>            
                    <img className={stylesSignUpRoute.divBack_img} src={backArrowImg} alt="" />
                    back
                </div>
            </Link>  
            <SignUpEmailPasswordForm/>
        </div>
    );
}
