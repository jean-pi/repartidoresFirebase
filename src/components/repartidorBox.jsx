import { useState } from "react";
import React from "react";

import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox(){

    
 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

//personalizar las dependencias firebase, no nesesito tener todo en mi dependencias

//como hacer un routing
//como hacer un garp
//slacy loadign y espliting ya vine echo en nextjs?
//imports dinamicos

 
    const [isDisponible,setDisponible] = useState(true);
    const [repartidores,setRepartidores] = useState(8);

    function handleClickOrdenar(e){
        setDisponible(false);
        setRepartidores(repartidores - 1);
        e.target.textContent = "Cancelar";
        e.target.parentElement.style = "background-color: rgb(105, 241, 105)";

        console.log("se ejecuto handleOrdenar");
        console.log(isDisponible);
    };
    function handleClickCancelarOrden(e){
        setDisponible(true);
        let repartidoresActuales = repartidores + 1;
        setRepartidores(repartidoresActuales);
        e.target.textContent = "Ordenar";
        e.target.parentElement.style  = "background-color: rgb(255, 255, 255);";

        console.log("se ejecuto handleCancelar");
        console.log(isDisponible);
    };

    
 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe



    return(
    <div className={stylesRepartidorBox.repartidorBox}>
        <div className={stylesRepartidorBox.repartidorBoxEstado}>Repartidores disponibles: {repartidores} </div>
        <div onClick={isDisponible? handleClickOrdenar : handleClickCancelarOrden} className={stylesRepartidorBox.repartidorBoxButton}>Ordenar</div>
   </div>
    );
}