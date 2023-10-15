//firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
//mi acceso con mi Auth
import { auth } from "../../firebase/firebaseMyConfig";
//states
import React, { useState, useRef } from "react";
//router/react
import { Link } from "react-router-dom";
//css
import stylesSignUp from "../../styles/styleComponets/signUp.module.css";
import stylesText from "../../styles/texts.module.css";
import uiStyles from "../../styles/uiStyles.module.css";
//my component
import GoogleButton from "../loginSignupRegisterSistem/googleButton";
import GithubButton from "../loginSignupRegisterSistem/githubButton";

export default function SignUpEmailPasswordForm(){
    
    //COMPONETES FUNCIONALES: mind its own bunisses
    // .map .filter .reduce y demas son puras CREAN UNA COPIA DEL ARREGLO 
    //cambio por referencian, las variables no tiene un nuevo valor al final de la vida del componente

    const [errorMessage, setErrorMesagge] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isRegistrer, setIsRegistrer] = useState(false);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputsOnchange = (e) =>{
        const {name, value}= e.target;
        setValues({
            ...values,
            [name] : value,
        });
    }




 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

    // let parametroPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;



    const submitCreateUser=(async(e)=>{
        e.preventDefault();
        setButtonLoading(true);
        setIsRegistrer(false);
        try {

            if(values.email === "") throw Error("email-empty");
            if(values.password === "") throw Error("password-empty")
            // if(!parametroPassword.test(values.password)) throw Error(errors.passwordWeak.codeErr); 
            
            await createUserWithEmailAndPassword(auth,values.email,values.password);
            await sendEmailVerification(auth.currentUser);
            setErrorMesagge("");
            setButtonLoading(false);
            setIsRegistrer(true);
            setValues({
                email: "",
                password: "",
            });

        } catch (err) {
            setTimeout(() => {     
                setButtonLoading(false);
                setIsRegistrer(false)
                if(err.code === "auth/internal-error") {
                    setErrorMesagge("Internal error try again later");
                }  
                if(err.code === "auth/email-already-in-use") {
                    setErrorMesagge("Email already in use.");
                }  
                if(err.message === "email-empty"){
                    setErrorMesagge("Enter an email address.");
                }
                if(err.message === "password-empty"){
                    setErrorMesagge("Enter a password.");
                }
                if(err.code === "auth/weak-password"){
                    setErrorMesagge("Make sure it's at least at least 6 characters.");
                }
                if(err.code === "auth/invalid-email"){
                    setErrorMesagge("Invalid email address.");
                }    
            }, 500); 
        }   
        
    });

    return (
        <div className={stylesSignUp.containerLoginSignUpEmailPassword} >
                <h1 className={stylesText.text3rem}>Sign up</h1>
                <form className={stylesSignUp.formLoginSignUpContainer} action="" onSubmit={submitCreateUser} >

                    <span className={stylesText.text070rem}>Email</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.email.toLowerCase()} type="text" name="email" autoComplete="off"  placeholder="Enter your email address..." />
                    <span className={stylesText.text070rem}>Password</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.password} type="password" name="password" autoComplete="off" placeholder="Create a new password..." />
                    <span className={stylesText.text070rem}>Confirm password</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.password} type="password" name="password" autoComplete="off" placeholder="Confirm your new password..." />
                    <button tabIndex={"0"} className={`${!buttonLoading? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                        <span></span>
                        Continue with email
                    </button>
                    <span className={stylesText.textError}>{errorMessage}</span>
                    {isRegistrer &&(
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>User registered. Verify your email by clicking on the link sent to your email. If you don't receive the link, please check in your spam box.</p>
                        </div>
                        )
                    }
                </form>
                <div className={uiStyles.partingLine}></div>
                <GoogleButton/> 
                {/* <GithubButton/>  */}
                <div className={stylesText.text070rem}>Do you already have an account? <Link className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to="/login">Login now</Link></div>
        </div>
    );
}