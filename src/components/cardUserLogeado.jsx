
//css
import cardUsercss from "../styles/styleComponets/cardUserLogeado.module.css"

//mi firebase config
import {auth} from "../firebase/firebaseMyConfig"

//funciones de firebase modules
import { deleteUser } from "firebase/auth";

//router dom
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../models/routes";


function CardUserLogeado() {

    let userDataLocal = JSON.parse(localStorage.getItem("user"));

    const currentUser = auth.currentUser;
        
    const navigate = useNavigate();

    function signOut(){
        auth.signOut()
            .then(()=>{
                console.log("signOut");
                localStorage.clear();
                navigate(publicRoutes.PRESENTATION_PUBLIC)
            },err => {
                console.log(err);
            })
    }

    function deleteAccount(){
        try {
            deleteUser(currentUser);
            localStorage.clear();
            navigate(publicRoutes.PRESENTATION_PUBLIC);
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div className={cardUsercss.cardUserContainer}>
        <img className={cardUsercss.img} src={userDataLocal.photoURL} alt="userImg" />
        <div className={cardUsercss.emailNameContainer}>
            <span className={cardUsercss.emailNameContainer_email}>{userDataLocal.email}</span>
            <span className={cardUsercss.emailNameContainer_name}>{userDataLocal.diplayName}</span>
        </div>
        <button className={cardUsercss.buttonDeleteAcount} onClick={deleteAccount}>Delete account</button>
        <button className={cardUsercss.buttonLogOut} onClick={signOut}>Log out</button>
    </div>
  )
}
export default CardUserLogeado