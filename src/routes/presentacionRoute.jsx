import { Link } from "react-router-dom";

//css
import stylesPresentacionRoute from "../styles/stylesRoutes/presentacionRoute.module.css"
import stylesText from "../styles/texts.module.css"

export default function PresentacionView(){
return (
    <div className={stylesPresentacionRoute.presentacionRouteContainer}>
        <div className={`${stylesPresentacionRoute.ornament} ${stylesPresentacionRoute.ornament1}`}>*******</div>
        <div className={`${stylesPresentacionRoute.ornament} ${stylesPresentacionRoute.ornament2}`}>******</div>
        <div className={stylesPresentacionRoute.descriptionProjectContainer}>
            <p className={stylesText.cursiva1rem}>
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
        </div>
        
        <div className={stylesPresentacionRoute.buttonsLoginContainer}>
            <Link tabIndex={"0"}  to="/login" className={`${stylesPresentacionRoute.button} ${stylesPresentacionRoute.login}`}>Log in</Link>
            <Link tabIndex={"0"}  to="/signup" className={`${stylesPresentacionRoute.button} ${stylesPresentacionRoute.signup}`}>Sign up</Link>
        </div>
    </div>
);

}