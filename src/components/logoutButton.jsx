
//importo mi acceso a firebase
import {auth} from "../firebase/firebase"


//importo las funciones promesas de fierebase
import {revokeRefreshTokens} from "firebase/auth"
import {Timestamp, getUser} from "firebase/firestore"
 

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