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
import { signInWithEmailAndPassword, sendEmailVerification, applyActionCode } from "firebase/auth";



export default function LoginEmailPasswordForm(){

    const navigate = useNavigate();

    const [errorMessage, setErrorMesagge] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loginComplete, setLoginComplete] = useState(false);

    //verification states
    // const [messagUserIsNotVerificated, setMessagUserIsNotVerificated] = useState(false);
    // const [resendVerificated, setResendVerificated] = useState(false);
    // const [correctVerification, setCorrectVerification] = useState(false);

    const [verificationState, setVerifcationState] = useState(0);
    /**
     * 0: si verificado
     * 1: no verifcado
     * 2: resend link de verificacion
     * 3: verificado por primera vez
     */

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


    useEffect( () => {
        const ulrParams = new URLSearchParams(window.location.search);
        let oobCode = ulrParams.get("oobCode");
        let mode = ulrParams.get("mode")
        if(mode === "verifyEmail"){
            async function applyVerification (actionCode){
                try {
                    await applyActionCode(auth, actionCode);
                    setVerifcationState(3) //verificado por primera vez
                } catch (error) {
                    console.log(error)
                }
            }
            applyVerification(oobCode);
        } 
      }, []);



    const resendVerification=( async (e) =>{
        try {
            await sendEmailVerification(auth.currentUser);
            setVerifcationState(2) //resend link de verificacion
        } catch (error) {    
        }
    })


    const loginSubmit=( async (e)=>{
        e.preventDefault();
        setButtonLoading(true);
        setVerifcationState(0) //esta verificado: solo para resetear vista
        try {
            if(values.email === "") throw Error("email-empty")
            if(values.password === "") throw Error("password-empty");
            
            const signUser = await signInWithEmailAndPassword(auth, values.email, values.password); 
            const isVerificated = signUser.user.emailVerified;

            if(isVerificated === true) {
                setLoginComplete(true);
                setErrorMesagge("");
                setVerifcationState(0) //esta verificado
                buttonLoading(false)
            }
            if(isVerificated === false) {
                setVerifcationState(1) // no verificado
                setButtonLoading(false);
                setErrorMesagge("")
            }

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
   
    return (
        <div className={stylesLogin.containerLoginComponent}>
            <div className={`${stylesLogin.containerDivLoginComponent} ${loginComplete? stylesLogin.containerDivLoginComponent_disable : "" }`} >
                <h1 className={stylesText.text3rem}>Log in</h1>
                <GoogleButton/> 
                {/* <GithubButton/>  */}
                <div className={uiStyles.partingLine}></div>
                <form className={stylesLogin.formLogin} action="" onSubmit={loginSubmit}>


                    {verificationState === 1 &&(
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                                <b>Error: </b>This account is still pending approval. Verify your email by clicking on the link sent to your email.  
                                <span className={`${stylesText.text070rem} ${stylesText.text070remStriking}`} onClick={resendVerification}> <br />Resend verification link.</span> 
                            </p>
                        </div>
                    )}

                    {verificationState === 3 && (
                        <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
                            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Your account has been successfully verified! You can log in now.</p>
                        </div>
                    )}

                    {verificationState === 2 && (
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
                <div className={stylesLogin.divLoadingLogin}>
                    <span></span> Logining...
                </div>
            )}

        </div>
    );
}