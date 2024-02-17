import { useState, useEffect } from "react";


//firestore desde modules
import { doc, updateDoc } from "firebase/firestore";


//mi config firestore
import { dbFirestore } from "../firebase/firebaseMyConfig";

//css
import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox({time, repartidoresSpecific, repartidoresTotales, arrayIndiceInDb}){

 
 
    const [isDisponible,setDisponible] = useState(true);


    function z(){
        let array = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
        
        let arrayCopy = [...array]

        let arrayNew;
        console.log(arrayNew = arrayCopy.splice(0, 1, "a") )
    }


    z()

    const docRepartidoresRef = doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo");
    
    async function handleClickOrdenar(e){
        try {
            await updateDoc(docRepartidoresRef, {
                repartidores: repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific + 1  )
            });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect( () => {
        repartidoresSpecific === 0? setDisponible(false) : setDisponible(true)
    }, [repartidoresTotales]);


    return(
    <div className={`${stylesRepartidorBox.repartidorBox} ${!isDisponible? stylesRepartidorBox.repartidorBox_disabled : stylesRepartidorBox.repartidorBox_active }`}>
        <div >Repartidores disponibles: {repartidoresSpecific} </div>
        <div onClick={handleClickOrdenar} className={`${stylesRepartidorBox.repartidorBoxButton} ${!isDisponible? stylesRepartidorBox.repartidorBoxButton_disabled : stylesRepartidorBox.repartidorBoxButton_active }`}> {isDisponible? "Make an order" : "Cancel order"} </div>
        <div>{time}</div>
   </div>
    );
}