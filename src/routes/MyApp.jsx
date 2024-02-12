

//components
import RepartidorBox from "../components/repartidorBox";
import CardUserLogeado from "../components/loginSignupRegisterSistem/cardUserLogeado";


//css
import stylesMyApp from "../styles/stylesRoutes/MyApp.module.css";
import { auth } from "../firebase/firebaseMyConfig";


export default function MyApp(){
    let user = auth.currentUser;
    return(
        <div className={stylesMyApp.contenedorApp}>


            <CardUserLogeado/>

            <p className={stylesMyApp.descriptionProyect}>
                Build a list containing time slots, in 30-min intervals.
                Let it start at 8 am and end at 8 pm. Or a box with a block
                Let it start at 8, then 8:30, 9, 9, 30... like this until 8pm. The company
                has availability of 8 motorcyclists every 30 min. when someone does
                clicking on one of these little boxes should take a biker resource.
                In other words, a counter that starts at 8 and then goes down to 7, in addition to marking the
                box in green If the same user clicks on the same box, he must release
                the resource, if it was in green, you must release the resource, that is, the
                counter again goes from 7 to 8. If other users have taken all
                motorcyclists, the box should appear red and should not let me
                take that schedule.
            </p>

            <div className={stylesMyApp.repartidorBoxContenedor}>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
                <RepartidorBox/>
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
