import { useState, useEffect } from "react";


//firestore desde modules
import { doc, updateDoc } from "firebase/firestore";


//mi config firestore
import { dbFirestore } from "../firebase/firebaseMyConfig";

//css
import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox({time, repartidoresSpecific, repartidoresTotales, arrayIndiceInDb}){

 
 
    const [isDisponible,setDisponible] = useState(true);



    const docRepartidoresRef = doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo");
    
    async function handleClickOrdenar(e){


        if(isDisponible === true){
            setDisponible(false)
            console.log("2")
        } else{
            setDisponible(true)
            console.log("1")
        }
        console.log(isDisponible)
        
        isDisponible 
            ? repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific - 1  ) 
            : repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific + 1  )


        try {
            await updateDoc(docRepartidoresRef, {
                repartidores: repartidoresTotales,
            });
            console.log(isDisponible)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect( () => {
        if(repartidoresSpecific === 0) setDisponible(false)
    }, [repartidoresTotales]);


    return(
    <div className={`${stylesRepartidorBox.repartidorBox} ${!isDisponible? stylesRepartidorBox.repartidorBox_disabled : stylesRepartidorBox.repartidorBox_active }`}>
        <div >Repartidores disponibles: {repartidoresSpecific} </div>
        <div onClick={handleClickOrdenar} className={`${stylesRepartidorBox.repartidorBoxButton} ${!isDisponible? stylesRepartidorBox.repartidorBoxButton_disabled : stylesRepartidorBox.repartidorBoxButton_active }`}> {isDisponible? "Make an order" : "Cancel order"} </div>
        <div>{time}</div>
   </div>
    );
}