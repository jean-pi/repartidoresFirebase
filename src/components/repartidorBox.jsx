import { useState, useEffect } from "react";


//firestore desde modules
import { doc, updateDoc } from "firebase/firestore";


//mi config firestore
import { dbFirestore } from "../firebase/firebaseMyConfig";

//css
import stylesRepartidorBox from  "../styles/styleComponets/repartidorBoxComponent.module.css"

export default function RepartidorBox({time, repartidoresSpecific, repartidoresTotales, repartidoresTomados, arrayIndiceInDb}){

 
 
    const [isDisponible,setDisponible] = useState(true);



    const docRepartidoresRef = doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo");

    
    async function handleClickOrdenar(e){



        let userLocalStorage = JSON.parse(localStorage.getItem("user"));
        let uidUser = userLocalStorage.uid
        let objRepartidoresOcupados = repartidoresTomados[arrayIndiceInDb];


        if(isDisponible){
            setDisponible(false)
            repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific - 1);
            objRepartidoresOcupados = {
                ...objRepartidoresOcupados,
                uidUser: uidUser,
            }
            repartidoresTomados.splice(arrayIndiceInDb, 1, objRepartidoresOcupados)
        } 
        if(!isDisponible) {
            setDisponible(true)
            repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific + 1)
            delete objRepartidoresOcupados.uidUser;
            repartidoresTomados.splice(arrayIndiceInDb, 1, objRepartidoresOcupados)

        }
        
        console.log(objRepartidoresOcupados)
        console.log(repartidoresTomados)

        try {
            await updateDoc(docRepartidoresRef, {
                repartidores: repartidoresTotales,
                // repartidoresTomados: repartidoresTomados,
                // repartidoresTomadosMap: objRepartidoresOcupados
            });
            console.log(objRepartidoresOcupados)
            console.log(repartidoresTomados)



            // console.log(repartidoresTomados[arrayIndiceInDb])
            // let arreglo = repartidoresTomados[arrayIndiceInDb]
            // let arregloCopia = {...repartidoresTomados[arrayIndiceInDb]}


            // let uid = "zyx1234567"
            // let uid2 = "xyz1234567"
            // arregloCopia = {
            //     uid: uid
            // }
            // console.log(arregloCopia);
            // console.log(arreglo);
            // arregloCopia = {
            //     ...arregloCopia,
            //     uid2: uid2
            // }
            // console.log(arregloCopia);
            // console.log(arreglo);

            // delete arregloCopia.uid2;
            // console.log(arregloCopia);
            // console.log(arreglo);


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