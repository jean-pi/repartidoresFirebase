import { useState } from "react";
import React from "react";

import "../styles/styleComponets/repartidorBox.css"

export default function RepartidorBox(){

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


    return(
    <div className="repartidorBox">
        <div className="repartidorBox-estado">Repartidores disponibles: {repartidores} </div>
        <div onClick={isDisponible? handleClickOrdenar : handleClickCancelarOrden} className="repartidorBox-button">Ordenar</div>
   </div>
    );
}