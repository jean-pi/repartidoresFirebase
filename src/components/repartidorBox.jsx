import { useState } from "react";
import React from "react";

import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox({time, repartidores}){

    
 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe

//personalizar las dependencias firebase, no nesesito tener todo en mi dependencias

//como hacer un routing
//como hacer un garp
//slacy loadign y espliting ya vine echo en nextjs?
//imports dinamicos

 
    const [isDisponible,setDisponible] = useState(true);
    // const [repartidores,setRepartidores] = useState(8);

    function handleClickOrdenar(e){
        isDisponible? setDisponible(false):setDisponible(true)
        // isDisponible? setRepartidores(repartidores - 1) : setRepartidores(repartidores + 1)
        console.log(repartidores)
    };
    

    
 //ventajas y desventajas de firebase
 //https://es.linkedin.com/pulse/cu%C3%A1les-son-las-ventajas-y-desventajas-de-usar-para-aguilar-bernabe



    return(
    <div className={`${stylesRepartidorBox.repartidorBox} ${!isDisponible? stylesRepartidorBox.repartidorBox_disabled : stylesRepartidorBox.repartidorBox_active }`}>
        <div >Repartidores disponibles: {repartidores} </div>
        <div onClick={handleClickOrdenar} className={`${stylesRepartidorBox.repartidorBoxButton} ${!isDisponible? stylesRepartidorBox.repartidorBoxButton_disabled : stylesRepartidorBox.repartidorBoxButton_active }`}> {isDisponible? "Make an order" : "Cancel order"} </div>
        <div>{time}</div>
   </div>
    );
}