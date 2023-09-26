
//importo mi acceso a firebase
import {auth} from "../../firebase/firebaseMyConfig"



 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

    export default function LogoutButton(){

        let uid;

        function signOut(){
            auth.signOut()
                .then(()=>{
                    console.log("signOut");
                },err => {
                    console.log(err);
                    console.log("hubo un error al lasir d ela cuenta        ")
                })
        }

        return (
            <div className="">
                <button className="" onClick={signOut}>Sign Out</button>
            </div>
        );
    }