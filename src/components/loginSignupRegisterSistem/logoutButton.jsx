
//importo mi acceso a firebase
import {auth} from "../../firebase/firebaseMyConfig"
//router dom
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../../models/routes";



 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe


    export default function LogoutButton(){
        
        const navigate = useNavigate();

        function signOut(){
            auth.signOut()
                .then(()=>{
                    localStorage.clear();
                    navigate(publicRoutes.PRESENTATION_PUBLIC)
                },err => {
                    console.log(err);
                })
        }

        return (
            <div className="">
                <button className="" onClick={signOut}>Sign Out</button>
            </div>
        );
    }