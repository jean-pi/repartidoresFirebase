//router react
import { useNavigate, Link } from "react-router-dom";
//hooks
import { useState, useEffect } from "react";
//css
import stylesLogin from "../../styles/styleComponets/login.module.css";
import stylesText from "../../styles/texts.module.css";
import uiStyles from "../../styles/uiStyles.module.css";

//firebase auth con mi clave de proyecto
import { auth } from "../../firebase/firebaseMyConfig";

//firebase metodos
import { signInWithEmailAndPassword, sendEmailVerification, applyActionCode, sendPasswordResetEmail} from "firebase/auth";

//routes models
import { publicRoutes, restrictedRoutes } from "../../models/routes";



//ventajas y desventajas de firebase
    //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe


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
     * 4: too many request verification
     * 5: expired code
     */

    //estados recover password
    const [errorMessageRecoverEmail, setErrorMessageRecoverEmail] = useState("");
    const [RecoverPasswordState, setRecoverPasswordState] = useState(false)
    const [buttonLoadingRecoverPassword, setButtonLoadingRecoverPassword] = useState(false);
    const [messageRecoverEmail, setMessageRecoverEmail] = useState(false);




    // input states onchanges
    const [values, setValues] = useState({
        email: "",
        password: "",
        emailRecover:""
    });
    const changeDetector = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }




    useEffect( () => {
        
        let url = window.location.search;
        const ulrParams = new URLSearchParams(url);
        let oobCode = ulrParams.get("oobCode");

        if(oobCode){
            console.log(auth.currentUser)
            async function applyVerification (actionCode){
                try {
                    console.log(auth.currentUser);
                    await applyActionCode(auth, actionCode);
                    setMessageVerificatedEmail(0);
                } catch (error) {
                    if(error.code === "auth/invalid-action-code"){
                        setMessageVerificatedEmail(3);
                    }
                    console.log("error")
                }
            }
            applyVerification(oobCode);
        }

        
    }, []);




    const resendVerification=( async (e) =>{
        try {

            const a = await sendEmailVerification(auth.currentUser);
            setMessageVerificatedEmail(1);
            auth.signOut()
            .then(()=>{
               //cierra sesion cuando se envia en link de verificacion
            },err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error)
            if(error.code === "auth/too-many-requests"){
                setMessageVerificatedEmail(4);
            }
            if(error.code === "auth/expired-action-code"){
                setMessageVerificatedEmail(5);
            }
        }
    })


    const loginSubmit=( async (e)=>{
        e.preventDefault();
        setButtonLoading(true);
        setMessageVerificatedEmail();
        setErrorMesagge("")
        try {
            if(values.email === "") throw Error("email-empty")
            if(values.password === "") throw Error("password-empty");

            const signUser = await signInWithEmailAndPassword(auth, values.email, values.password);
            const isVerificated = signUser.user.emailVerified;

            if(isVerificated) {

                setLoginComplete(true);

                const user = auth.currentUser;

                let userLocalStorage = {
                    uid: user.uid,
                    email: user.email,
                    diplayName: user.displayName,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                  }

                localStorage.setItem("user",JSON.stringify(userLocalStorage));

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                });


                setTimeout(() => {
                    if(user.displayName){
                        navigate(restrictedRoutes.APP_RESTRICTED)
                    }
                    if(!user.displayName){
                        navigate(restrictedRoutes.REGISTARION_RESTRICTED)
                    }
                }, 700);
            }

            if(!isVerificated) {
                setLoginComplete(false);
                setMessageVerificatedEmail(2);
                console.log(auth.currentUser)
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
            }, 400);

        }
    })


    const sendRecoverPassWord = async (e) =>{
        e.preventDefault();
        setErrorMesagge("");
        setErrorMessageRecoverEmail("");
        setButtonLoadingRecoverPassword(true);
        setMessageRecoverEmail(false)
        try {
            console.log(values.emailRecover)
            await sendPasswordResetEmail(auth, values.emailRecover);
            setButtonLoadingRecoverPassword(false);
            setMessageRecoverEmail(true)
            setValues({
                email: "",
                password: "",
                emailRecover:""
            })
        } catch (error) {
            setTimeout(() => {
                console.log(error)
                setButtonLoadingRecoverPassword(false);
                if(error.code === "auth/missing-email"){
                    setErrorMessageRecoverEmail("Enter an email address.");
                }
                if(error.code === "auth/internal-error") {
                    setErrorMessageRecoverEmail("Internal error, try again later.");
                }
                if(error.code === "auth/user-not-found"){
                    setErrorMessageRecoverEmail("This user does not exist.");
                }
                if(error.code === "auth/invalid-email"){
                    setErrorMessageRecoverEmail("Invalid email address.");
                }
                if(error.code === "auth/too-many-requests"){
                    setErrorMessageRecoverEmail("Temporarily blocked. We have detected unusual activity in this account. Try again later.");
                }
                
            }, 400);
        }
    }


    const activeNonActiveRecoverPassword = () =>{
        if(RecoverPasswordState){
            setRecoverPasswordState(false);
            setMessageRecoverEmail(false);
        } else {
            setRecoverPasswordState(true)
        }
    }



    return (
        <div className={stylesLogin.containerLoginComponent}>

            {loginComplete === false && (
                <div className={stylesLogin.containerDivLoginComponent} >
                <h1 className={stylesText.text3rem}>Log in</h1>


                    {messageVerificatedEmail === 0 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Your account has been successfully verified! You can login now.</p>
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
                                <b>Error: </b>This account is still pending approval. Please verify your email by clicking on the link sent to your email, if you don't receive the link check in your spam box.
                                <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span>

                            </p>
                        </div>
                    )}
                    {messageVerificatedEmail === 3 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                            <b>Error: </b>This code has already been used or has expired
                            </p>
                        </div>
                    )}
                    {messageVerificatedEmail === 4 &&(
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                                <b>Error: </b>Too many requests. Verification email recently sent. Check your email
                            </p>
                        </div>
                    )}
                            {messageVerificatedEmail === 5 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                            <b>Error: </b>Verification link is expired.
                            <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span>
                            </p>
                        </div>
                    )}

                
                    <form className={stylesLogin.formLogin} action="" onSubmit={loginSubmit}>
                        <span className={stylesText.text070rem}>Email</span>
                        <input className={uiStyles.inputText} onChange={changeDetector} value={values.email.toLowerCase()} name="email" type="text" autoComplete="off"  placeholder="Enter your email address..." />
                        <span className={stylesText.text070rem}>Password</span>
                        <input className={uiStyles.inputText} onChange={changeDetector} autocomplete="current-password" id="current-password"  value={values.password.toLowerCase()} name="password" type="password" autoComplete="off" placeholder="Enter your password..." />
                        <p className={stylesText.textError}>{errorMessage}</p>
                        <button tabIndex={"0"} className={`${!buttonLoading? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                            <span></span>
                            Continue with email
                        </button>
                        <div className={`${stylesText.text070rem} ${stylesText.text070remCenter}`}>You do not have an account yet? <Link className={`${stylesText.text070rem} ${stylesText.text070remLink}`} to={publicRoutes.SIGNUP_PUBLIC}>Sign up</Link></div>
                        <Link tabIndex={"0"} className={`${stylesText.text070rem} ${stylesText.text070remCenter} ${stylesText.text070remLink}`} onClick={activeNonActiveRecoverPassword}>Did you forget your password? </Link>
                    </form>
   

                {RecoverPasswordState && (
                    <form className={stylesLogin.formLogin} action="" onSubmit={sendRecoverPassWord}>
                       <input className={uiStyles.inputText} onChange={changeDetector} value={values.emailRecover.toLowerCase()} name="emailRecover" type="text" autoComplete="off"  placeholder="Enter your email to recover your password..." />
                       <p className={stylesText.textError}>{errorMessageRecoverEmail}</p>
                       <button tabIndex={"0"} className={`${!buttonLoadingRecoverPassword? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                           <span></span>
                           Recover password
                       </button>
                    </form>
                )}

            {messageRecoverEmail && RecoverPasswordState && (
                <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                    <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>We send recovery link to your email,, If you don't receive the link, please check in your spam box.</p>
                </div>
            )}

                

                

            </div>
            )}


            {loginComplete === true &&(
                <div className={uiStyles.divLoading}>
                    <span></span> 
                    {auth.currentUser.displayName ? " Logining" : "Just one second"}
                </div>
            )}



        </div>
    );
}