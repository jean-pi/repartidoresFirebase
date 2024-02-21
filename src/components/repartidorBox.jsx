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

    let uidUser = JSON.parse(localStorage.getItem("user")).diplayName;

    

    async function handleClickOrdenar(e){


        console.log(repartidoresTomados)

        if(repartidoresSpecific === 0 && isRepartidorTomado){ 
            setDisponible(false);
            return;
        }

        if(isDisponible){
            setDisponible(false)
            repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific - 1);
            repartidoresTomados.splice(0,0, uidUser);
        } 
        if(!isDisponible) {
            setDisponible(true)
            repartidoresTotales.splice(arrayIndiceInDb, 1, repartidoresSpecific + 1);
            repartidoresTomados = repartidoresTomados.filter( (i)=> {return i != uidUser});
        }
 
        function whatRepartidor(){
            if(arrayIndiceInDb === 0) return {repartidores: repartidoresTotales,  repartidor900: repartidoresTomados}
            if(arrayIndiceInDb === 1) return {repartidores: repartidoresTotales,  repartidor930: repartidoresTomados}
            if(arrayIndiceInDb === 2) return {repartidores: repartidoresTotales,  repartidor1000: repartidoresTomados}
            if(arrayIndiceInDb === 3) return {repartidores: repartidoresTotales,  repartidor1030: repartidoresTomados}
            if(arrayIndiceInDb === 4) return {repartidores: repartidoresTotales,  repartidor1100: repartidoresTomados}
            if(arrayIndiceInDb === 5) return {repartidores: repartidoresTotales,  repartidor1130: repartidoresTomados}
            if(arrayIndiceInDb === 6) return {repartidores: repartidoresTotales,  repartidor1200: repartidoresTomados}
            if(arrayIndiceInDb === 7) return {repartidores: repartidoresTotales,  repartidor1230: repartidoresTomados}
            if(arrayIndiceInDb === 8) return {repartidores: repartidoresTotales,  repartidor1300: repartidoresTomados}
            if(arrayIndiceInDb === 9) return {repartidores: repartidoresTotales,  repartidor1330: repartidoresTomados}
            if(arrayIndiceInDb === 10) return {repartidores: repartidoresTotales, repartidor1400: repartidoresTomados}
            if(arrayIndiceInDb === 11) return {repartidores: repartidoresTotales, repartidor1430: repartidoresTomados}
            if(arrayIndiceInDb === 12) return {repartidores: repartidoresTotales, repartidor1500: repartidoresTomados}
            if(arrayIndiceInDb === 13) return {repartidores: repartidoresTotales, repartidor1530: repartidoresTomados}
            if(arrayIndiceInDb === 14) return {repartidores: repartidoresTotales, repartidor1600: repartidoresTomados}
            if(arrayIndiceInDb === 15) return {repartidores: repartidoresTotales, repartidor1630: repartidoresTomados}
            if(arrayIndiceInDb === 16) return {repartidores: repartidoresTotales, repartidor1700: repartidoresTomados}

        }


        try {
            await updateDoc(docRepartidoresRef, whatRepartidor());
        } catch (error) {
            console.log(error)
        }
    };

    let isRepartidorTomado = true;

    useEffect( () => {
        repartidoresTomados.forEach( (uid) => {
            if(uid === uidUser || repartidoresSpecific === 0) isRepartidorTomado = false;
        });
        setDisponible(isRepartidorTomado)
    }, [repartidoresTomados]);




    return(
    <div className={`${stylesRepartidorBox.repartidorBox} ${!isDisponible? stylesRepartidorBox.repartidorBox_disabled : stylesRepartidorBox.repartidorBox_active }`}>
        <p >Motorcyclists: {repartidoresSpecific} </p>
        <div  onClick={handleClickOrdenar} className={`${stylesRepartidorBox.repartidorBoxButton} ${!isDisponible? stylesRepartidorBox.repartidorBoxButton_disabled : stylesRepartidorBox.repartidorBoxButton_active }`}> {isDisponible? "Make an order" : "Cancel order"} </div>
        <div>{time}</div>
        
        <span className={stylesRepartidorBox.repartidorUserSpan}>Users:</span>
        <div className={stylesRepartidorBox.repartidorUserContainer}>
            <div className={stylesRepartidorBox.repartidorbox_users}>{`${repartidoresTomados[0]}`} </div>
            <div className={stylesRepartidorBox.repartidorbox_users}>{`${repartidoresTomados[1]}`} </div>
            <div className={stylesRepartidorBox.repartidorbox_users}>{`${repartidoresTomados[2]}`} </div>
        </div>



   </div>
    );
}