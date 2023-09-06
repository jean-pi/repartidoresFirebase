//router dom
import { Link } from "react-router-dom";

import RegistrationForm from "../components/registrationForm";

//css
import "../styles/stylesRoutes/registrationView.css";


export default function RegistrationView(){


    return(
        <div className="containerResgistrationView">
            <RegistrationForm/>
        </div>
    );
}
