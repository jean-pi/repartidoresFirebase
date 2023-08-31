import { onAuthStateChanged } from "firebase/auth"; // importado desde modules
import { auth } from "../firebase/firebase"; // desde mi carpeta firebase
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import RepartidorBox from "../components/repartidorBox";

import "../styles/mainApp.css";

export default function MainApp(){





    return(
        <div className="contenedorMainApp">

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
            
        </div>
    );
}
