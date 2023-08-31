import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"; // importado desde modules
import { auth } from "../firebase/firebase"; // desde mi carpeta firebase
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/styleComponets/loginComponent.css";


export default function Login(){

    const navigate = useNavigate();

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


   //30/08/2023
   //1-ya iniciaste sesion , la ventena de incio de sesion de pone borrosa con pantalla de carga y procede a ingresar a la cuenta
   //2-no hay sesion, opcion login 1 clic google, opcion colocar tu correo:
            // 1 tienes cuenta-pidela clave /2 no tientes cuenta pide datos y clave para crear una cuenta
   //3-no tenias cuentas, te llego el correo y te quedaste en la ventana de crear cuenta- te manda a esta ventana
   //4- tu cuenta esta bloqueada.

   const [CurrentState, setCurrenState] = useState(0);
   // asi se crean estados es un tipo hook(es el principal parece)
   // CerrentState contiene el estado actual 
   // setCurrenState permite cambiar el estado

    useEffect(()=>{

        // useEffect es un tipo de HOOK que ejecuta un bloque de codigo en un momento puntual del ciclo de vida del componente
        // Por defecto se ejecuta cuando el COMPONENTE SE RENDERIZA
        // UN COMPONENTE SE RENDERIZA CUANDO EL ESTADO CAMBIA O CAUNDO SE RECARGA LA PAGINA
        // EXACTAMENTE SE EJECUTA LUEGO DE PINTAR EL COMPONENTE
        // useEffect PERMITE EJECUTAR CODIGO PRIMERO QUE TODO LO DEMAS, COMPONENTE

        // No secesariamente se ejecuta al inicio "mounting"
        // useEffect son efectos secundarios se ejecutan en cierta parte del codigo
        // a diferencia a los eventos, los eventos son generados por la interacion del usuario
        
        // Actualizacion?


        // El efecto primario de React es motrar html
        // useEffect es un efecto secundario para que react haga mas que solo mostrar html
            // llamada http
            // usar api del navegador 
            // demas...
        // el efecto primario de un componente es renderizar 
        // un componete tambien obtiene datos, usa api de chrome, geolocalizacion 
            // en tiempo de real y demas cosas que invlocruman mas que solo mostrar html
            // react no sabe de estas cosas react solo manejas estados y renderiza(bueno talvez pueda hacer mas cosas estoy iniciando y desconozco)

        // es un efecto secundario de un evento, un evento cambia el estado.
        //  useEffect mira el estado del componente y segun este cambie se ejecutan acciones secundarias que conllevan cambiar el estado del componente

        // ojo con los evenListener se suelen usar en usaState esto no se borran cuando se ejecutan y se acumualan, solo nesecito un even listener
        // para esto colocar el segundo parametr "[]" vacio significa que solo se ejecuta una vez poruq eno tiene dependencias?
        // esto hara que se ejecute una sola vez, a menos que le psasemos el estado por "[]" y se ejecutara cada vez que que cambie, o sea lo mismo que antes

        // limpiar efectos secundarios, caso: dentro de useEffect que decidimos ejecutarlo una vez "[]" ya que adentro habia un listener
        // entonces cuando el componente al que se aplicaba este listener deja de existir por a o b motivo este listener y todo el codigo seguira activo
        // entonces saldra un error ya que intenta buscar un componente que no esta montado "unmounted component"
        // para arreglar esto es que hay que limpiar este codigo de agrega 
        // return () => {
            //remover evento listener
            // no termino de entender por que funciona si se supone que lo que estaba dentro del useEffect solo se ejecuta una vez
        //}

        onAuthStateChanged(auth, handleUseStateChanged);
        // muestra el usuario autenticado actualmente
        //onAuthStateChanged() es el obserbador de firebase que obtiene la secion activa. regresa un user
        // con firebase PERSISTENCE se puede selccionar si la sesion queda activa cuando ce cierra el navegador o no
        // por defecto la sesion queda activa habria que agregar un botton de logOut
    },[]);

    function handleUseStateChanged(user){
        if(user){
            setCurrenState(1);
            console.log(user.displayName);
            // redirigir a App 
            navigate("/")
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

    // if(CurrentState === 1){
    //     return <div>llendo a app</div>
    // }

    // if(CurrentState === 2){
    //     return (
    //         <div>
    //             <button onClick={handleClickLoginGoogle}>Login with Google</button>
    //         </div>
    //     );
    // }


    return (
            <div className="contenedorFormLogin">
                <div className="containerGoogleLogin">
                    <button className="buttonGoogleLogin" onClick={handleClickLoginGoogle}>Login with Google</button>
                </div>
                <div className="containerLoginEmail">
                        <span className="spanLoginEmail">Email</span>
                        <input className="imputLoginEmail" type="text" placeholder="Enter your email address..." />
                        <button className="buttonLoginEmail">Continue with email</button>
                        <a href="" className="ForgotPasswordLoginEmail">Forgot password?</a>
                        {CurrentState}
                </div>
            </div>
    );
}