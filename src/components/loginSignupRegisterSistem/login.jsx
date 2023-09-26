//router react
import { useNavigate, Link } from "react-router-dom";
//hooks
import { useState, useEffect } from "react";
//css
import stylesLogin from "../../styles/styleComponets/login.module.css";
import stylesText from "../../styles/texts.module.css";
import uiStyles from "../../styles/uiStyles.module.css";
//my componets
import GoogleButton from "../loginSignupRegisterSistem/googleButton";
import GithubButton from "../loginSignupRegisterSistem/githubButton";
//firebase auth con mi clave de proyecto
import { auth } from "../../firebase/firebaseMyConfig";
//firebase 
import { signInWithEmailAndPassword, sendEmailVerification, updateProfile, applyActionCode } from "firebase/auth";
import { wait } from "@testing-library/user-event/dist/utils";



export default function LoginEmailPasswordForm(){

    const navigate = useNavigate();

    const [errorMessage, setErrorMesagge] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loginComplete, setLoginComplete] = useState(false);

    //verification states
    const [messagUserIsNotVerificated, setMessagUserIsNotVerificated] = useState(false);
    const [resendVerificated, setResendVerificated] = useState(false);
    const [correctVerification, setCorrectVerification] = useState(false);

    // input states
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const changeDetector = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

 const errors = {
        internalError: {
            codeErr: "auth/internal-error",
            messagErr: "Internal error, try again later."
        },
        invalidEmail: {
            codeErr: "auth/invalid-email",
            messagErr: "Invalid email address."
        },
        emailEmpty: {
            codeErr:"email-empty",
            messagErr: "Enter an email address."
        } ,
        wrongPassword: {
            codeErr: "auth/wrong-password",
            messagErr: "Invalid password. try again."
        },
        passwordEmpty: {
            codeErr: "password-empty",
            messagErr: "Enter a password."
        },
        userNoFound: {
            codeErr: "auth/user-not-found",
            messagErr: "This user does not exist."
        },
        tooManyRequests: {
            codeErr: "auth/too-many-requests",
            messagErr: "Temporarily blocked. We have detected unusual activity in this account. Try again later."
        }
    }




    useEffect( () => {
        const ulrVar = window.location.search;
        const ulrParams = new URLSearchParams(ulrVar);
        let oobCode = ulrParams.get("oobCode");
        if(oobCode){
            setCorrectVerification(true);
            applyActionCode(auth, oobCode);
        } 
      }, []);


    let actionCodeSettings = {
        url: 'http://localhost:3000/login', // URL personalizada para redirigir después de la verificación
        handleCodeInApp: false, // Abrir el enlace en la aplicación en lugar de en un navegador
    };

    const resendVerification=( async (e) =>{
        try {
            console.log("bb")
            const a = await sendEmailVerification(auth.currentUser, actionCodeSettings);
            setMessagUserIsNotVerificated(false);
            setResendVerificated(true);
            console.log(a)
        } catch (error) {
            
        }

    })

    const loginSubmit=( async (e)=>{
        e.preventDefault();
        setButtonLoading(true);
        try {
            if(values.email === "") throw Error(errors.emailEmpty.codeErr)
            if(values.password === "") throw Error(errors.passwordEmpty.codeErr);
            
            const signUser = await signInWithEmailAndPassword(auth, values.email, values.password); 
            const isVerificated = signUser.user.emailVerified;
            console.log(isVerificated)
            console.log(auth.currentUser)

            if(isVerificated === true) {
                setLoginComplete(true);
                setErrorMesagge("");
            }
            if(isVerificated === false) {
                setMessagUserIsNotVerificated(true);
                setButtonLoading(false);
                setErrorMesagge("")
            }

    
        } catch (error) {
            console.log(error)
            setMessagUserIsNotVerificated(false);
            setTimeout(() => {
                setButtonLoading(false);
                if(error.message === errors.emailEmpty.codeErr){
                    setErrorMesagge(errors.emailEmpty.messagErr);
                }
                if(error.code === errors.internalError.codeErr) {
                    setErrorMesagge(errors.internalError.errorMessage);
                }   
                if(error.code === errors.userNoFound.codeErr){
                    setErrorMesagge(errors.userNoFound.messagErr);
                }
                if(error.code === errors.invalidEmail.codeErr){
                    setErrorMesagge(errors.invalidEmail.messagErr);
                }   
                if(error.code === errors.tooManyRequests.codeErr){
                    setErrorMesagge(errors.tooManyRequests.messagErr);
                }  
                if(error.code === errors.wrongPassword.codeErr){
                    setErrorMesagge(errors.wrongPassword.messagErr);
                }
                if(error.message === errors.passwordEmpty.codeErr){
                    setErrorMesagge(errors.passwordEmpty.messagErr);
                }
            }, 400);

        }
    })
   
    return (
        <div className={stylesLogin.containerLoginComponent}>
            <div className={`${stylesLogin.containerDivLoginComponent} ${loginComplete? stylesLogin.containerDivLoginComponent_disable : "" }`} >
                <h1 className={stylesText.text3rem}>Log in</h1>
                <GoogleButton/> 
                {/* <GithubButton/>  */}
                <div className={uiStyles.partingLine}></div>
                <form className={stylesLogin.formLogin} action="" onSubmit={loginSubmit}>


                    {messagUserIsNotVerificated && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                                <b>Error: </b>Your account is still pending approval. Verify your email by clicking on the link sent to your email.  
                                <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span> 
                            </p>
                        </div>
                    )}

                    {correctVerification && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Your account has been successfully verified! You can log in now.</p>
                        </div>
                    )}

                    {resendVerificated && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Verification Email Sent!</p>
                        </div>
                    )}

                    <span className={stylesText.text070rem}>Email</span>
                    <input className={uiStyles.inputText} onChange={changeDetector} value={values.email.toLowerCase()} name="email" type="text" autoComplete="off"  placeholder="Enter your email address..." />
                    <span className={stylesText.text070rem}>Password</span>
                    <input className={uiStyles.inputText} onChange={changeDetector} value={values.password} name="password" type="password" autoComplete="off" placeholder="Enter your password..." />
                    <p className={stylesText.textError}>{errorMessage}</p>
                    <button tabIndex={"0"} className={`${!buttonLoading? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                        <span></span>
                        Continue with email
                    </button>
                </form>
                <Link tabIndex={"0"} className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to="/">Did you forget your password? </Link>
                <div className={stylesText.text070rem}>Do you not already have an account? <Link className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to="/signup">Sign up</Link></div>
            </div>

            {loginComplete &&(
            <div className={stylesLogin.containerDivLoadingLogin} >
                <div className={stylesLogin.divLoadingLogin}>
                    <span></span> Logining...
                </div>
            </div>
            )}

        </div>
    );
}