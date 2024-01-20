

//components
import RepartidorBox from "../components/repartidorBox";
import LogoutButton from "../components/loginSignupRegisterSistem/logoutButton"

//css
import stylesMyApp from "../styles/stylesRoutes/MyApp.module.css";
import { auth } from "../firebase/firebaseMyConfig";


export default function MyApp(){
    console.log(auth.currentUser)
    return(
        <div className={stylesMyApp.contenedorApp}>

            <div className={stylesMyApp.repartidorBoxContenedor}>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
            </div>
            
            <br /><LogoutButton/><br />
            
            {/* {`uid = ${user.uid}`} <br />
            {`displayName = ${user.displayName}`} <br />
            {`email = ${user.email}`} <br />
            {`verified? = ${user.emailVerified}`} <br />
            {`photoURL = ${user.photoURL}`} <br />
            {`provider data = ${user.providerData}`} <br /> */}
            
            

        </div>
    );
}
