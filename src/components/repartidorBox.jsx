import { useState, useEffect } from "react";
import React from "react";

import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox({time, repartidores}){

 
 
    const [isDisponible,setDisponible] = useState(true);


    function handleClickOrdenar(e){
        isDisponible? setDisponible(false):setDisponible(true)
        console.log(repartidores)
    };

    useEffect( () => {
        if(repartidores === 0 ) setDisponible(false)
        console.log(repartidores)
        console.log(isDisponible)
    }, []);
    




    return(
    <div className={`${stylesRepartidorBox.repartidorBox} ${!isDisponible? stylesRepartidorBox.repartidorBox_disabled : stylesRepartidorBox.repartidorBox_active }`}>
        <div >Repartidores disponibles: {repartidores} </div>
        <div onClick={handleClickOrdenar} className={`${stylesRepartidorBox.repartidorBoxButton} ${!isDisponible? stylesRepartidorBox.repartidorBoxButton_disabled : stylesRepartidorBox.repartidorBoxButton_active }`}> {isDisponible? "Make an order" : "Cancel order"} </div>
        <div>{time}</div>
   </div>
    );
}