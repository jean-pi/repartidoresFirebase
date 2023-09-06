import { onAuthStateChanged } from "firebase/auth"; // importado desde modules
import { auth } from "../firebase/firebase"; // desde mi carpeta firebase
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//components
import RepartidorBox from "../components/repartidorBox";
import LogoutButton from "../components/logoutButton"


import "../styles/stylesRoutes/MyApp.css";

export default function MyApp(){

    return(
        <div className="contenedorApp">

            <div className="repartidorBoxContenedor">
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
