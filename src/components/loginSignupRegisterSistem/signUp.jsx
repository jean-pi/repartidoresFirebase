//firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
//mi acceso con mi Auth
import { auth } from "../../firebase/firebase";
//states
import React, { useState, useRef } from "react";
//router/react
import { Link } from "react-router-dom";
//css
import stylesSignUp from "../../styles/styleComponets/signUp.module.css";
import stylesText from "../../styles/texts.module.css"
import uiStyles from "../../styles/uiStyles.module.css"

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
    })

    
    const inputsOnchange = (e) =>{
        const {name, value}= e.target;
        setValues({
            ...values,
            [name] : value,
        })
    }


    const errors = {
        emailEmpty: {
            codeErr:"email-empty",
            messagErr: "Enter an email address."
        } ,
        passwordEmpty: {
            codeErr: "password-empty",
            messagErr: "Enter a password."
        },
        passwordWeak: {
            codeErr: "auth/weak-password",
            messagErr: "Make sure it's at least at least 6 characters."
        },
        invalidEmail: {
            codeErr: "auth/invalid-email",
            messagErr: "Invalid email address."
        },
        emailAlreadyInUse: {
            codeErr: "auth/email-already-in-use",
            messagErr: "Email already in use."
        },
        internalError: {
            codeErr: "auth/internal-error",
            messagErr: "Internal error try again later"
        }
    }

 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

    // let parametroPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    const submitCreateUser=(async(e)=>{
        e.preventDefault();

        setButtonLoading(true);
        
        try {

            if(values.email === "") throw Error(errors.emailEmpty.codeErr);
            if(values.password === "") throw Error(errors.passwordEmpty.codeErr)
            // if(!parametroPassword.test(values.password)) throw Error(errors.passwordWeak.codeErr); 
            
            await createUserWithEmailAndPassword(auth,values.email,values.password);
            setErrorMesagge("");
            await sendEmailVerification(auth.currentUser);

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

                if(err.code === errors.internalError.codeErr) {
                    setErrorMesagge(errors.internalError.errorMessage);
                }  
                if(err.code === errors.emailAlreadyInUse.codeErr) {
                    setErrorMesagge(errors.emailAlreadyInUse.messagErr);
                }  
                if(err.message === errors.emailEmpty.codeErr){
                    setErrorMesagge(errors.emailEmpty.messagErr);
                }
                if(err.message === errors.passwordEmpty.codeErr){
                    setErrorMesagge(errors.passwordEmpty.messagErr);
                }
                if(err.code === errors.passwordWeak.codeErr){
                    setErrorMesagge(errors.passwordWeak.messagErr);
                }
                if(err.code === errors.invalidEmail.codeErr){
                    setErrorMesagge(errors.invalidEmail.messagErr);
                }    
            }, 500);
            
        }   


        
    });

    return (
        <div className={stylesSignUp.containerLoginSignUpEmailPassword} >
            <div className={stylesSignUp.containerDivLoginSignUpEmailPassword}>
                <h1 className={stylesText.text3rem}>Sign up</h1>
                <form className={stylesSignUp.formLoginSignUpContainer} action="" onSubmit={submitCreateUser} >

               

                    <span className={stylesText.text070rem}>Email</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.email.toLowerCase()} type="text" name="email" autoComplete="off"  placeholder="Enter your email address..." />
                    <span className={stylesText.text070rem}>Password</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.password} type="password" name="password" autoComplete="off" placeholder="Create a new password..." />
                    {/* <span className={stylesText.text070rem}>Confirm password</span>
                    <input className={uiStyles.inputText} onChange={inputsOnchange} value={values.password} type="password" name="password" autoComplete="off" placeholder="Create a new password..." /> */}
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
            
      


        </div>
    );
}