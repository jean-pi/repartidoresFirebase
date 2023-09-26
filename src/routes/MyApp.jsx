

//components
import RepartidorBox from "../components/repartidorBox";
import LogoutButton from "../components/loginSignupRegisterSistem/logoutButton"

//css
import stylesMyApp from "../styles/stylesRoutes/MyApp.module.css";

export default function MyApp(){
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
            
            <LogoutButton/>

        </div>
    );
}
