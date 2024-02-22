import { Link } from "react-router-dom";

//css
import styleslandingRoute from "../styles/stylesRoutes/landingRoute.module.css"
import stylesText from "../styles/texts.module.css"
import { publicRoutes } from "../models/routes";
import { useEffect } from "react";

export default function LandingView(){

return (

        <div className={styleslandingRoute.landingRouteContainer}>

        
        <div className={styleslandingRoute.buttonsLoginContainer}>
            <Link tabIndex={"1"}  to={publicRoutes.LOGIN_PUBLIC} className={`${styleslandingRoute.button} ${styleslandingRoute.login}`}>Log in</Link>
            <Link tabIndex={"1"}  to={publicRoutes.SIGNUP_PUBLIC} className={`${styleslandingRoute.button} ${styleslandingRoute.signup}`}>Sign up</Link>
        </div>


    </div>

    
);

}