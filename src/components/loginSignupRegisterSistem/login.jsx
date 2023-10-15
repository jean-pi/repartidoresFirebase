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
//firebase metodos 
import { signInWithEmailAndPassword, sendEmailVerification, applyActionCode } from "firebase/auth";


// COSAS QUE NO ME GUSTAN
    // El manejo del estado del usuario, deberia ser con un context?
    // La vadidacion de datos, deberia ser en servidor
    // redireccion app o registration


export default function LoginEmailPasswordForm(){

    const navigate = useNavigate();

    const [errorMessage, setErrorMesagge] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loginComplete, setLoginComplete] = useState(false);

    const [messageVerificatedEmail, setMessageVerificatedEmail] = useState();
    /**
     *  : null
     * 0: correct verification
     * 1: resend verification email
     * 2: this email is not verificate
     * 3: verification link is expired
     * 4: link de verificacion pedido muchas veces
     */

    
    const [verificationState, setVerifcationState] = useState(0);
    /**
     * 0: null
     * 1: verificado
     * 2: verificado pero no registrado
     * 3: no verificado
     */

    // input states onchanges
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






    useEffect( () => {
        const ulrParams = new URLSearchParams(window.location.search);
        let oobCode = ulrParams.get("oobCode");
        let mode = ulrParams.get("mode")
        if(mode){
            async function applyVerification (actionCode){
                try {
                    console.log("aaa")
                    console.log(auth.currentUser);
                    await applyActionCode(auth, actionCode);
                    console.log("si se envio el actio code y luego se mando un error?")
                    setMessageVerificatedEmail(0);
                } catch (error) {
                    if(error.code === "auth/invalid-action-code"){
                        setMessageVerificatedEmail(3);
                        console.log(error)
                    }
                }
            }
            applyVerification(oobCode);
        } 
    }, []);






    const resendVerification=( async (e) =>{
        try {
            const a = await sendEmailVerification(auth.currentUser);
            setMessageVerificatedEmail(1);
            
        } catch (error) {    
            console.log(error)
            if(error.code === "auth/too-many-requests"){
                setMessageVerificatedEmail(4);
            }
        }
    })





    const loginSubmit=( async (e)=>{
        e.preventDefault();
        setButtonLoading(true);
        setMessageVerificatedEmail();
        try {
            if(values.email === "") throw Error("email-empty")
            if(values.password === "") throw Error("password-empty");
            
            const signUser = await signInWithEmailAndPassword(auth, values.email, values.password); 
            const isVerificated = signUser.user.emailVerified;

            if(isVerificated) {
                setLoginComplete(true);
            }
            if(!isVerificated) {
                setLoginComplete(false);
                setMessageVerificatedEmail(2);
            }

            setButtonLoading(false);
            setErrorMesagge("")

        } catch (error) {
            setTimeout(() => {
                setButtonLoading(false);
                if(error.message === "email-empty"){
                    setErrorMesagge("Enter an email address.");
                }
                if(error.code === "auth/internal-error") {
                    setErrorMesagge("Internal error, try again later.");
                }   
                if(error.code === "auth/user-not-found"){
                    setErrorMesagge("This user does not exist.");
                }
                if(error.code === "auth/invalid-email"){
                    setErrorMesagge("Invalid email address.");
                }   
                if(error.code === "auth/too-many-requests"){
                    setErrorMesagge("Temporarily blocked. We have detected unusual activity in this account. Try again later.");
                }  
                if(error.code === "auth/wrong-password"){
                    setErrorMesagge("Invalid password. try again.");
                }
                if(error.message === "password-empty"){
                    setErrorMesagge("Enter a password.");
                }
            }, 300);

        }
    })
   
    return (
        <div className={stylesLogin.containerLoginComponent}>


            {loginComplete === false && (
                <div className={stylesLogin.containerDivLoginComponent} >
                <h1 className={stylesText.text3rem}>Log in</h1>
                <GoogleButton/> 
                {/* <GithubButton/>  */}

                <div className={uiStyles.partingLine}></div>

                    {messageVerificatedEmail === 0 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Your account has been successfully verified! You can log in now.</p>
                        </div>
                    )}
                    {messageVerificatedEmail === 1 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Verification Email Sent!</p>
                        </div>
                    )}
                    {messageVerificatedEmail === 2 &&(
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                                <b>Error: </b>This account is still pending approval. Verify your email by clicking on the link sent to your email.  
                                <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span> 
                            </p>
                        </div>
                    )}
                    {messageVerificatedEmail === 3 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                            <b>Error: </b>verification link is expired. no se poque parece que si se verifica pero igual aparece el error invalid actio code 
                            <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span> 
                            </p>
                        </div>
                    )}
                    {messageVerificatedEmail === 4 &&(
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                                <b>Error: </b>We have detected unusual activity with your account. Many verification requests. try it later.  
                            </p>
                        </div>
                    )}


                <form className={stylesLogin.formLogin} action="" onSubmit={loginSubmit}>
                    <span className={stylesText.text070rem}>Email</span>
                    <input className={uiStyles.inputText} onChange={changeDetector} value={values.email.toLowerCase()} name="email" type="text" autoComplete="off"  placeholder="Enter your email address..." />
                    <span className={stylesText.text070rem}>Password</span>
                    <input className={uiStyles.inputText} onChange={changeDetector} value={values.password.toLowerCase()} name="password" type="password" autoComplete="off" placeholder="Enter your password..." />
                    <p className={stylesText.textError}>{errorMessage}</p>
                    <button tabIndex={"0"} className={`${!buttonLoading? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                        <span></span>
                        Continue with email
                    </button>
                </form>

                <Link tabIndex={"0"} className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to="/">Did you forget your password? </Link>
                <div className={stylesText.text070rem}>Do you not already have an account? <Link className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to="/signup">Sign up</Link></div>
            </div>
            )}
            

            {loginComplete === true &&(
                <div className={stylesLogin.divLoadingLogin}>
                    <span></span> Logining...
                </div>
            )}

        </div>
    );
}