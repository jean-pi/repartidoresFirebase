

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/styleComponets/loginSignUpForms.css";

export default function LoginEmailPasswordForm(){

    const navigate = useNavigate();

    useEffect(()=>{

    },[]);





    const loginSubmit=((e)=>{
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        console.log(email, password)
        //en react la mayoria de las veces al obtener datos de un formulario es mejor guardarlos en un ESTADO
        // porque posiblemente quiere trabajar con estos datos
        //ahora solo quiero obtenerlos para mandarselos a google
    })
   
    return (
        <div className="containerLoginSignUpEmailPassword">
            <div className="partingLine"></div>
            <form className="imputLoginSignUpContainer" action="" onSubmit={loginSubmit}>
                <span className="spanLoginSignUpEmail">Email</span>
                <input className="imputLoginSignUpEmail" type="text" name="email"  placeholder="Enter your email address..." />
                <span className="spanLoginSignUpEmail">Password</span>
                <input className="imputLoginSignUpEmail" type="password" name="password" placeholder="Enter your password..." />
                <button className="buttonContinueWithEmail" type="submit" >Continue with email</button>
                <a href="" className="ForgotPasswordLoginEmail">Forgot password?</a>
            </form>

        </div>
    );
}