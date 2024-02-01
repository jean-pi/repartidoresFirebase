
//firebase
import { verifyPasswordResetCode, confirmPasswordReset, applyActionCode } from "firebase/auth";

//firebase my config
import { Auth } from "firebase/auth";

//css
import stylesLogin from "../../styles/styleComponets/login.module.css";
import stylesText from "../../styles/texts.module.css";
import uiStyles from "../../styles/uiStyles.module.css";

//router react
import { useNavigate, Link } from "react-router-dom";

//hooks
import { useState, useEffect } from "react";
import { publicRoutes } from "../../models/routes";
import { auth } from "../../firebase/firebaseMyConfig";


function RecoverPassword() {

    const [buttonLoading, setButtonLoading] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [messageLinkState, setMessageLinkState] = useState("0");

    /*
        0 = initial
        1 = codigo expired
        2 = codigo already used
    */

      // input states onchanges
      const [values, setValues] = useState({
        password: "",
        confirmPassword: ""
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

            async function applyVerification (){
                try {
                    await verifyPasswordResetCode(auth, oobCode);
                } catch (error) {
                    if(error.code === "auth/expired-action-code") setMessageLinkState("1");
                    if(error.code === "auth/invalid-action-code") setMessageLinkState("2");
                }
            }

            applyVerification()


    }, []);


    let url = window.location.search;
    const ulrParams = new URLSearchParams(url);
    let oobCode = ulrParams.get("oobCode");


    async function resetPassword(e) {
        e.preventDefault();
        setButtonLoading(true)
        try {
            await confirmPasswordReset(auth, oobCode, values.password);
            setResetComplete(true);
            setButtonLoading(false);
            setValues({
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            setButtonLoading(false)
            setResetComplete(false);
            console.log(error)
            if(error.code === "auth/internal-error") setErrorMessage("Internal error");
            if(error.code === "auth/user-not-found") setErrorMessage("User not found");
            if(error.code === "auth/weak-password") setErrorMessage("weak password, the password must have at least six digits");
            if(error.code === "auth/expired-action-code") setMessageLinkState("1");
            if(error.code === "auth/invalid-action-code") setMessageLinkState("2");
        }
    }


  return (
    <div className={stylesLogin.containerDivLoginComponent} >

        {messageLinkState === "1" &&(
            <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                    <b>Error: </b>this link has expired.
                </p>
            </div>
        )}

        {messageLinkState === "2" &&(
            <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_red}` }>
                <p className={`${stylesText.text070rem} ${stylesText.text070rem_red}`}>
                    <b>Error: </b>This link has already been used or was modified.
                </p>
            </div>
        )}

        <form className={stylesLogin.formLogin} action="" onSubmit={resetPassword}>
            <span className={stylesText.text070rem}>Type a new password</span>
            <input className={uiStyles.inputText} onChange={changeDetector} value={values.password.toLowerCase()} name="password" type="password" autoComplete="off"  placeholder="Enter a new password..." />
            <span className={stylesText.text070rem}>Confirm password</span>
            <input className={uiStyles.inputText} onChange={changeDetector} value={values.confirmPassword.toLowerCase()} name="confirmPassword" type="password" autoComplete="off" placeholder="Confirm you new password..." />
            <p className={stylesText.textError}>{errorMessage}</p>
            <button tabIndex={"0"} className={`${!buttonLoading? uiStyles.buttonSubmit1 : uiStyles.buttonSubmit1_loading}`} type="submit" >
                <span></span>
                Reset password
            </button>
        </form>
            
        {resetComplete && (
            <div className={ `${uiStyles.retroalimentacionDiv} ${uiStyles.retroalimentacionDiv_green}` }>
            <p className={`${stylesText.text070rem} ${stylesText.text070rem_green}`}>Your password was successfully changed, you can log in now.
            &nbsp;<Link className={`${stylesText.text070rem} ${stylesText.text070remCenter} ${stylesText.text070remCenter_green}`} to={publicRoutes.LOGIN_PUBLIC}>Click here to login.</Link></p>
            </div>
        )}


    </div>
  )
}

export default RecoverPassword