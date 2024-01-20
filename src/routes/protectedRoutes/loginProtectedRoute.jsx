import {Navigate} from "react-router-dom";


// export const ProtectedRoute = ({children, user}) => {
//     if(!user){
//         return <Navigate to="/landingPage">
//     }else{
//         return children ? children : <Outlet/ >
//         // el children: es para cuando solo tenga un elemento.
//         // el <Outlet/ > cuando tenga varias rutas protegidas a la vez.
//     }
// }

export const ProtectedRoute = ({chindren, user}) =>{
    if(!user.diplayName){
        return <Navigate to="/registration"></Navigate>
    }  
    if(user.diplayName){
        return <Navigate to="/app"></Navigate>
    }
}