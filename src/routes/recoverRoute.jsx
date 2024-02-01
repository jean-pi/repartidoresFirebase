
//componets
import RecoverPassword from "../components/loginSignupRegisterSistem/recoverPassword"

//css
import stylesLoginRoute from "../styles/stylesRoutes/login_SignUp_RegistrationRoute.module.css"



export default function RecoverRouter() {
  return (
    <div className={stylesLoginRoute.containerLogin_SignUp_RegistrationRoute}>
      <RecoverPassword/>
    </div>
  ) 
}
