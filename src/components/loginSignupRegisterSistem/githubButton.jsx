import { GithubAuthProvider,signInWithPopup} from "firebase/auth"; // importado desde modules
import { auth } from "../../firebase/firebase"; // desde mi carpeta firebase
import { useNavigate } from "react-router-dom";

//css
import stylesButtonGoogle from  "../../styles/styleComponets/authProviderExternoButton.module.css";

//img
import icon_Github from "../../img/github_icon.png"


export default function GithubButton(){

    const navigate = useNavigate();
    const githubProvider = new GithubAuthProvider();

    
        async function signInWithGithub(){
            try{
                await signInWithPopup(auth, githubProvider);
                navigate("/app")
                console.log(auth.currentUser)
                
            } catch(error){
                console.log(error);
            }
        }

    return (
        <div className={stylesButtonGoogle.containerGoogleLogin}>
            <button tabIndex={"0"} className={stylesButtonGoogle.buttonGoogleLogin} onClick={signInWithGithub}><img className={stylesButtonGoogle.logoIcon2} src={icon_Github} alt="" />Continue with Github</button>
        </div>
    );

}
