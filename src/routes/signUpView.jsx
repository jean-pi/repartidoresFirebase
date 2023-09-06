//router dom
import { Link } from "react-router-dom";


import LoginGoogleButton from "../components/loginGoogleButton";
import SignUpEmailPasswordForm from "../components/signUpEmailPasswordForm"

//css
import "../styles/stylesRoutes/loginSignUpViews.css"

export default function LoginView(){


    return(
        <div className="contenedorGeneralLoginSignUp">
            <h1 className="text3rem">Sign up</h1>
            <div className="contenedorFormLoginSignUp">
                <SignUpEmailPasswordForm/>
                <LoginGoogleButton/> 
            </div>
            <div className="loginNow">Do you already have an account? <Link className="loginNowLink" to="/login">Login now</Link></div>
        </div>
    );
}
