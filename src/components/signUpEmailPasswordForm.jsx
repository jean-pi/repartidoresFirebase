//firebase
import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification } from "firebase/auth";
//mi acceso con mi Auth
import { auth } from "../firebase/firebase";

import { useState, useRef } from "react";

import "../styles/styleComponets/loginSignUpForms.css";

export default function SignUpEmailPasswordForm(){
    
    //COMPONETES FUNCIONALES: mind its own bunisses
    // .map .filter .reduce y demas son puras CREAN UNA COPIA DEL ARREGLO 
    //cambio por referencian, las variables no tiene un nuevo valor al final de la vida del componente

    const [errorMessage, setErrorMesagge] = useState("");
    let finalScreen = useRef();


    let email ;
    let password;

    const  submitCreateUser=(async(e)=>{
        let parametroPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        e.preventDefault();
        email = e.target.email.value;
        password= e.target.password.value;
        try {
            if(email === "") throw Error("email-empty");
            if(password === "") throw Error("password-empty")
            if(!parametroPassword.test(password)) throw Error("password-weak"); 
            await createUserWithEmailAndPassword(auth,email,password);
            await sendEmailVerification(auth.currentUser);
            setErrorMesagge("");
            finalScreen.current.innerHTML = "We send a confirmation email to: " + email + "</br> Check your inbox " ;
            finalScreen.current.style.display = "flex";
        } catch (err) {
            console.log(err.message);
            if(err.message === "email-empty"){
                setErrorMesagge("Enter an email address.");
            }
            if(err.message === "password-empty"){
                setErrorMesagge("Enter a password.");
            }
            if(err.message === "password-weak"){
                setErrorMesagge("Make sure it's at least at least 8 characters including a number, a lowercase letter and a uppercase letter.");
            }
            if(err.code === "auth/invalid-email"){
                setErrorMesagge("Invalid email address.");
            }
            if(err.code === "auth/email-already-in-use") {
                setErrorMesagge("Email already in use.");
            }      
        }

    });

    return (
        <div className="containerLoginSignUpEmailPassword" >
            <form className="formLoginSignUpContainer" action="" onSubmit={(e)=>{submitCreateUser(e);}} >
                <span className="spanLoginSignUpEmail">Email</span>
                <input className="imputLoginSignUpEmail" type="text" name="email"  placeholder="Enter your email address..." />
                <span className="spanLoginSignUpEmail">Password</span>
                <input className="imputLoginSignUpEmail" type="" name="password" placeholder="Create a new password..." />
                <button className="buttonContinueWithEmail" type="submit" >Continue with email</button>
                <span className="errorMessage">{errorMessage}</span>
            </form>
            <div className="partingLine"></div>
            <div className="finalScreen" ref={finalScreen} >

            </div>
        </div>

    );
}