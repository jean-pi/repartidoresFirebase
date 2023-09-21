import RegistrationForm from "../components/loginSignupRegisterSistem/registration";

//css
import stylesRegistrationRoute from  "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css";


export default function RegistrationView(){


    return(
        <div className={stylesRegistrationRoute.containerLogin_SignUp_RegistrationRoute}>
            <RegistrationForm/>
        </div>
    );
}
