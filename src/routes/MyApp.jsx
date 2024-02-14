
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

    const [repartidores, setRepartidores] = useState({
        repartidor_09_00: "-",
        repartidor_09_30: "-",
        repartidor_10_00: "-",
        repartidor_10_30: "-",
        repartidor_11_00: "-",
        repartidor_11_30: "-",
        repartidor_12_00: "-",
        repartidor_12_30: "-",
        repartidor_13_00: "-",
        repartidor_13_30: "-",
        repartidor_14_00: "-",
        repartidor_14_30: "-",
        repartidor_15_00: "-",
        repartidor_15_30: "-",
        repartidor_16_00: "-",
        repartidor_16_30: "-",
        repartidor_17_00: "-",
    })


    const listenLastestChanges = () =>{
        return onSnapshot(doc(dbFirestore, "repartidoresCollection", "3Y2mm2xA0C8nlde2UVgo"), (doc) =>{
            const objRepartidores = doc.data()
            setRepartidores(objRepartidores)
        })
    }

    useEffect( () => {
        listenLastestChanges()
    }, []); 


    // async function a(){
    //     try {
    //         const querySnapshot = await getDocs(collection(dbFirestore, "repartidoresCollection"));
    //         //getDocs acepta una coleccion y devuelve todos los doc que estan en esa coleccion, la respuesta de cada doc viene con los datos que tiene dentro
    //         querySnapshot.forEach((doc) =>{
    //             objDbRepartidores = doc.data();
    //         })
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }


    

    return(
        <div className={stylesMyApp.contenedorApp}>


            <CardUserLogeado/>

            {/* <button onClick={a}>a</button> */}

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
                take that schedule. Values must be updated in real time
            </p>

            <div className={stylesMyApp.repartidorBoxContenedor}>
                <RepartidorBox time="9:00" repartidores= {repartidores.repartidor_09_00} />
                <RepartidorBox time="9:30" repartidores= {repartidores.repartidor_09_30} />
                <RepartidorBox time="10:00" repartidores={repartidores.repartidor_10_00} />
                <RepartidorBox time="10:30" repartidores={repartidores.repartidor_10_30} />
                <RepartidorBox time="11:00" repartidores={repartidores.repartidor_11_00} />
                <RepartidorBox time="11:30" repartidores={repartidores.repartidor_11_30} />
                <RepartidorBox time="12:00" repartidores={repartidores.repartidor_12_00} />
                <RepartidorBox time="12:30" repartidores={repartidores.repartidor_12_30} />
                <RepartidorBox time="13:00" repartidores={repartidores.repartidor_13_00} />
                <RepartidorBox time="13:30" repartidores={repartidores.repartidor_13_30} />
                <RepartidorBox time="14:00" repartidores={repartidores.repartidor_14_00} />
                <RepartidorBox time="14:30" repartidores={repartidores.repartidor_14_30} />
                <RepartidorBox time="15:00" repartidores={repartidores.repartidor_15_00} />
                <RepartidorBox time="15:30" repartidores={repartidores.repartidor_15_30} />
                <RepartidorBox time="16:00" repartidores={repartidores.repartidor_16_00} />
                <RepartidorBox time="16:30" repartidores={repartidores.repartidor_16_30} />
                <RepartidorBox time="17:00" repartidores={repartidores.repartidor_17_00} />
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
