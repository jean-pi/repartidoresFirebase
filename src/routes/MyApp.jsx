
//hooks
import { useEffect, useState } from "react";


//components
import RepartidorBox from "../components/repartidorBox";
import CardUserLogeado from "../components/cardUserLogeado";

//css
import stylesMyApp from "../styles/stylesRoutes/MyApp.module.css";
import uiStyles from "../styles/uiStyles.module.css"

// funciones db de firestore
import { collection, getDocs, addDoc, getDoc, doc, query, where, setDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

//mi config firestore
import {dbFirestore} from "../firebase/firebaseMyConfig"


export default function MyApp(){

    const [repartidores, setRepartidores] = useState(["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0",]);
    const [repartidoresOcupados, setRepartidoresOcupados] = useState([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],]);
    




    const listenLastestChanges = () =>{
        return onSnapshot(doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo"), (doc) =>{
            const objRepartidores = doc.data()
            setRepartidores(objRepartidores.repartidores);   
            setRepartidoresOcupados([
                objRepartidores.repartidor900,
                objRepartidores.repartidor930,
                objRepartidores.repartidor1000,
                objRepartidores.repartidor1030,
                objRepartidores.repartidor1100,
                objRepartidores.repartidor1130,
                objRepartidores.repartidor1200,
                objRepartidores.repartidor1230,
                objRepartidores.repartidor1300,
                objRepartidores.repartidor1330,
                objRepartidores.repartidor1400,
                objRepartidores.repartidor1430,
                objRepartidores.repartidor1500,
                objRepartidores.repartidor1530,
                objRepartidores.repartidor1600,
                objRepartidores.repartidor1630,
                objRepartidores.repartidor1700,
            ])
        })
    }

    useEffect( () => {
        listenLastestChanges()
        
    }, []); 



    

    return(
        <div className={stylesMyApp.contenedorApp}>


            <CardUserLogeado/>


            <p tabIndex={"0"}  className={stylesMyApp.descriptionProyect}>
                Build a list containing time slots, in 30-min intervals.
                Let it start at 9 am and end at 5 pm. The company
                has availability of 8 motorcyclists every 30 min. when someone does
                clicking on one of these little boxes should take a biker resource.
                In other words, a counter that starts at 3 and then goes down to 2, in addition to marking the
                box in red If the same user clicks on the same box, he must release
                the resource if it was in red  the
                counter again goes from 2 to 3 and it must changes to red. If other users have taken all
                motorcyclists, the box should appear red and should not let me
                take that schedule. Values must be updated in real time.
                
            </p>


            <div className={stylesMyApp.repartidorBoxContenedor}>
                <RepartidorBox time="9:00"  repartidoresSpecific={repartidores[0]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[0]} arrayIndiceInDb={0} />
                <RepartidorBox time="9:30"  repartidoresSpecific={repartidores[1]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[1]} arrayIndiceInDb={1} />
                <RepartidorBox time="10:00" repartidoresSpecific={repartidores[2]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[2]} arrayIndiceInDb={2} />
                <RepartidorBox time="10:30" repartidoresSpecific={repartidores[3]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[3]} arrayIndiceInDb={3} />
                <RepartidorBox time="11:00" repartidoresSpecific={repartidores[4]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[4]} arrayIndiceInDb={4} />
                <RepartidorBox time="11:30" repartidoresSpecific={repartidores[5]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[5]} arrayIndiceInDb={5} />
                <RepartidorBox time="12:00" repartidoresSpecific={repartidores[6]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[6]} arrayIndiceInDb={6} />
                <RepartidorBox time="12:30" repartidoresSpecific={repartidores[7]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[7]} arrayIndiceInDb={7} />
                <RepartidorBox time="13:00" repartidoresSpecific={repartidores[8]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[8]} arrayIndiceInDb={8} />
                <RepartidorBox time="13:30" repartidoresSpecific={repartidores[9]}  repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[9]} arrayIndiceInDb={9}  />
                <RepartidorBox time="14:00" repartidoresSpecific={repartidores[10]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[10]} arrayIndiceInDb={10}  />
                <RepartidorBox time="14:30" repartidoresSpecific={repartidores[11]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[11]} arrayIndiceInDb={11}  />
                <RepartidorBox time="15:00" repartidoresSpecific={repartidores[12]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[12]} arrayIndiceInDb={12}  />
                <RepartidorBox time="15:30" repartidoresSpecific={repartidores[13]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[13]} arrayIndiceInDb={13}  />
                <RepartidorBox time="16:00" repartidoresSpecific={repartidores[14]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[14]} arrayIndiceInDb={14}  />
                <RepartidorBox time="16:30" repartidoresSpecific={repartidores[15]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[15]} arrayIndiceInDb={15}  />
                <RepartidorBox time="17:00" repartidoresSpecific={repartidores[16]} repartidoresTotales={repartidores} repartidoresTomados={repartidoresOcupados[16]} arrayIndiceInDb={16}  />
            </div>
            
            

            
            <footer className={stylesMyApp.footer}>
                <div className={stylesMyApp.footer_aContainer}>
                    <a className={stylesMyApp.footer_a} href="">©ejerciciofirebase.github.io</a>
                </div>
                <div className={stylesMyApp.footer_aContainer}>
                    <a className={stylesMyApp.footer_a} target="_blank" href="https://twitter.com/sweetJean26">X</a>
                </div>
                <div className={stylesMyApp.footer_aContainer}>
                    <a className={stylesMyApp.footer_a} target="_blank" href="https://github.com/jean-pi">Github</a>
                </div>
                <div className={stylesMyApp.footer_aContainer}>
                    <a className={stylesMyApp.footer_a} target="_blank" href="https://www.instagram.com/jeanpierre_veliz/">Instagram</a>
                </div>
            </footer>
            



        </div>
    );
}
