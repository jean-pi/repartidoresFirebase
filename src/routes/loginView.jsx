import { useEffect } from "react";


import LoginGoogleButton from "../components/loginGoogleButton";
import LoginEmailPassword from "../components/loginEmailPasswordForm"

//css
import "../styles/stylesRoutes/loginSignUpViews.css"


export default function LoginView(){


    useEffect(()=>{
    },[]);


    return(
        <div className="contenedorGeneralLoginSignUp">
            <h1 className="text3rem">Log in</h1>
            <div className="contenedorFormLogin">
                <LoginGoogleButton/> 
                <LoginEmailPassword/> 
            </div>
        </div>
    );
}
