import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"; // importado desde modules
import { auth } from "../firebase/firebase"; // desde mi carpeta firebase
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginView(){

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    /*
    currenState
    0: loading
    1: login completo
    2: no hay nadie logeado
    */
   // Cuando un usuario se quiera registrar va a haber varios casos
   // el usuario no puede esta logeado y si o talvez nesesite completar su registro
   // currentState definira cual sera la siguiente ventana que vera el ususario
   // case1Ejemplo: ya se logeo anteriormente => pasa directamente a la app
   // case2Ejemplo: no esta logeado => tiene que loguearse
   // case3Ejemplo: tu cuenta esta bloqueada => muestra info del bloqueo
   // case4Ejemplo: tienes login pero no has completado los datos para crear tu cuenta => te llevara a la creacion de cuenta

   const [CurrentState, setCurrenState] = useState(0);

    useEffect(()=>{
        // useEffect es un tipo de HOOK que ejecuta un bloque de codigo en un momento puntual del ciclo de vida del componente
        // useEffect se jecuta en la primera fase "mounting" 
        // useEffect PERMITE EJECUTAR CODIGO PRIMERO QUE TODO LO DEMAS, COMPONENTE
        
        onAuthStateChanged(auth, handleUserStateChanged);
        // muestra el usuario autenticado actualmente
    },[]);

    function handleUserStateChanged(user){
        if(user){
            setCurrenState(1);
            console.log(user.displayName);
            // redirigir a App 
            navigate("/")
            console.log("a");
        } else {
            setCurrenState(2);
            console.log("...no hay nadie registrado");
            // redirigir a login?
            navigate("/login");
        }
    }


    async function handleClickLoginGoogle(){
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);

        async function signInWithGoogle(googleProvider){
            try{
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
            } catch(error){
                console.log(error);
            }
        }
        // no trates de entender este codigo a profundidad ahora 
    }

    if(CurrentState === 1){
        return <div>ya estas logeado</div>
    }

    if(CurrentState === 2){
        return (
            <div>
                <button onClick={handleClickLoginGoogle}>Login with Google</button>
            </div>
        );
    }


    return <div>Loading...</div>
}