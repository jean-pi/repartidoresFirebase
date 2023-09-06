import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"; // importado desde modules
import { auth } from "../firebase/firebase"; // desde mi carpeta firebase
import { useNavigate } from "react-router-dom";

//css
import "../styles/styleComponets/loginGoogleButton.css";

//img
import google_icon from "../img/google_Icon.webp"




export default function LoginGoogleButton(){

    const navigate = useNavigate();

    async function handleClickLoginGoogle(){
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);

        async function signInWithGoogle(googleProvider){
            try{
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
                navigate("/app")
            } catch(error){
                console.log(error);
            }
        }
        // no trates de entender este codigo a profundidad ahora 
    }

    return (
        <div className="containerGoogleLogin">
            <button className="buttonGoogleLogin" onClick={handleClickLoginGoogle}><img className="logoIcon" src={google_icon} alt="" />Continue with Google</button>
        </div>
    );
}