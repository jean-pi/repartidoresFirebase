import { GoogleAuthProvider,signInWithPopup} from "firebase/auth"; // importado desde modules
import { auth } from "../../firebase/firebase"; // desde mi carpeta firebase
import { useNavigate } from "react-router-dom";

//css
import stylesButtonGoogle from  "../../styles/styleComponets/authProviderExternoButton.module.css";

//img
import icon_Google from "../../img/google_Icon.webp"


export default function GoogleButton(){
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider()
    async function handleClickLoginGoogle(){
        async function signInWithGoogle(googleProvider){
            try{
                const res = await signInWithPopup(auth, googleProvider);
                navigate("/app")
                
            } catch(error){
                console.log(error);
            }
        }
        await signInWithGoogle(googleProvider);
    }

    return (
        <div className={stylesButtonGoogle.containerGoogleLogin}>
            <button tabIndex={"0"} className={stylesButtonGoogle.buttonGoogleLogin} onClick={handleClickLoginGoogle}><img className={stylesButtonGoogle.logoIcon} src={icon_Google} alt="" />Continue with Google</button>
        </div>
    );
}