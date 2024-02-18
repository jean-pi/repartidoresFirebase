
//hooks
import { useEffect, useState } from "react";


//components
import RepartidorBox from "../components/repartidorBox";
import CardUserLogeado from "../components/cardUserLogeado";

//css
import stylesMyApp from "../styles/stylesRoutes/MyApp.module.css";

// funciones db de firestore
import { collection, getDocs, addDoc, getDoc, doc, query, where, setDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

//mi config firestore
import {dbFirestore} from "../firebase/firebaseMyConfig"


export default function MyApp(){

    const [repartidores, setRepartidores] = useState(["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0",])


    const listenLastestChanges = () =>{
        return onSnapshot(doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo"), (doc) =>{
            const objRepartidores = doc.data()
            setRepartidores(objRepartidores.repartidores)        })
    }

    useEffect( () => {
        listenLastestChanges()
    }, []); 



    

    return(
        <div className={stylesMyApp.contenedorApp}>


            <CardUserLogeado/>


            <p className={stylesMyApp.descriptionProyect}>
                Build a list containing time slots, in 30-min intervals.
                Let it start at 9 am and end at 5 pm. Or a box with a block
                Let it start at 9, then 9:30, 10, :30... like this until 8pm. The company
                has availability of 8 motorcyclists every 30 min. when someone does
                clicking on one of these little boxes should take a biker resource.
                In other words, a counter that starts at 8 and then goes down to 7, in addition to marking the
                box in green If the same user clicks on the same box, he must release
                the resource, if it was in green, you must release the resource, that is, the
                counter again goes from 7 to 8. If other users have taken all
                motorcyclists, the box should appear red and should not let me
                take that schedule. Values must be updated in real time.
            </p>


            <div className={stylesMyApp.repartidorBoxContenedor}>
                <RepartidorBox time="9:00"  repartidoresSpecific={repartidores[0]}  repartidoresTotales={repartidores} arrayIndiceInDb={0} />
                <RepartidorBox time="9:30"  repartidoresSpecific={repartidores[1]}  repartidoresTotales={repartidores} arrayIndiceInDb={1} />
                <RepartidorBox time="10:00" repartidoresSpecific={repartidores[2]}  repartidoresTotales={repartidores} arrayIndiceInDb={2} />
                <RepartidorBox time="10:30" repartidoresSpecific={repartidores[3]}  repartidoresTotales={repartidores} arrayIndiceInDb={3} />
                <RepartidorBox time="11:00" repartidoresSpecific={repartidores[4]}  repartidoresTotales={repartidores} arrayIndiceInDb={4} />
                <RepartidorBox time="11:30" repartidoresSpecific={repartidores[5]}  repartidoresTotales={repartidores} arrayIndiceInDb={5} />
                <RepartidorBox time="12:00" repartidoresSpecific={repartidores[6]}  repartidoresTotales={repartidores} arrayIndiceInDb={6} />
                <RepartidorBox time="12:30" repartidoresSpecific={repartidores[7]}  repartidoresTotales={repartidores} arrayIndiceInDb={7} />
                <RepartidorBox time="13:00" repartidoresSpecific={repartidores[8]}  repartidoresTotales={repartidores} arrayIndiceInDb={8} />
                <RepartidorBox time="13:30" repartidoresSpecific={repartidores[9]}  repartidoresTotales={repartidores} arrayIndiceInDb={9}  />
                <RepartidorBox time="14:00" repartidoresSpecific={repartidores[10]} repartidoresTotales={repartidores} arrayIndiceInDb={10}  />
                <RepartidorBox time="14:30" repartidoresSpecific={repartidores[11]} repartidoresTotales={repartidores} arrayIndiceInDb={11}  />
                <RepartidorBox time="15:00" repartidoresSpecific={repartidores[12]} repartidoresTotales={repartidores} arrayIndiceInDb={12}  />
                <RepartidorBox time="15:30" repartidoresSpecific={repartidores[13]} repartidoresTotales={repartidores} arrayIndiceInDb={13}  />
                <RepartidorBox time="16:00" repartidoresSpecific={repartidores[14]} repartidoresTotales={repartidores} arrayIndiceInDb={14}  />
                <RepartidorBox time="16:30" repartidoresSpecific={repartidores[15]} repartidoresTotales={repartidores} arrayIndiceInDb={15}  />
                <RepartidorBox time="17:00" repartidoresSpecific={repartidores[16]} repartidoresTotales={repartidores} arrayIndiceInDb={16}  />
            </div>
            
  
            
            {/* {`uid = ${user.uid}`} <br />
            {`displayName = ${user.displayName}`} <br />
            {`email = ${user.email}`} <br />
            {`verified? = ${user.emailVerified}`} <br />
            {`photoURL = ${user.photoURL}`} <br />
            <img src={user.photoURL} alt="" /> */}

            
            <footer className={stylesMyApp.footer}>
                <a className={stylesMyApp.footer_a} href="">©ejerciciofirebase.github.io</a>
                <a className={stylesMyApp.footer_a} target="_blank" href="https://twitter.com/sweetJean26">↖X</a>
                <a className={stylesMyApp.footer_a} target="_blank" href="https://github.com/jean-pi">↖Github</a>
                <a className={stylesMyApp.footer_a} target="_blank" href="https://www.instagram.com/jeanpierre_veliz/">↖Instagram</a>
            </footer>
            

        </div>
    );
}
