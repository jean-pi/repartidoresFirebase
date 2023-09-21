
import SignUpEmailPasswordForm from "../components/loginSignupRegisterSistem/signUp"

//css
import stylesSignUpRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"

export default function LoginView(){


    return(
        <div className={stylesSignUpRoute.containerLogin_SignUp_RegistrationRoute}>   
                <SignUpEmailPasswordForm/>
        </div>
    );
}
