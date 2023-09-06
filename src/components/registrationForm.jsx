
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


//css
import "../styles/styleComponets/registrationForm.css";
//img
import emptyAvatar from "../img/empty-avatar.png";

export default function RegistrationForm(){

    const navigate = useNavigate();

    const inputName=(e)=>{
        let name = e.target.value;
        console.log(name);
        //minimo un caracter uno max 10 
        //acepta todo tipo de caracter supongo
    }
    const inputBirth=(e)=>{
        let birth = e.target.value;
        console.log(birth)
    }



    return (
        <div className="registrationFormContainer">
            <h1 className="h1">Welcome</h1>
            <h3 className="h3">First things first, tell us a bit about yourself.</h3>
            <form className="registrationForm" tabIndex={0} action="">
                <img tabIndex={"0"} className="inputImage" role="button" src={emptyAvatar} alt="" />
                <div tabIndex={"0"} className="buttonAddFoto" role="button">add a photo</div>
                <span className="Span">What should we call you?</span>
                <input className="inputText" type="text" name="alias" onChange={inputName} autocomplete="off" placeholder="e.g. Ada Lovelace, Ada, AL" />
                <span className="Span">What about your date of birth?</span>
                <input className="inputText" type="date" name="date" onChange={inputBirth}  />
                <button className="buttonSubmit" type="submit" disabled>Continue</button>
                <p className="textoSecundario">Didn't intend to create a new account?</p>
                <Link tabIndex={"0"} className="link" >Sign in whith another email</Link>
            </form>
        </div>
    );
}