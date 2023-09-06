
//funciones que firebase ofrece
import {onAuthStateChanged} from "firebase/auth"; // importado desde modules

//mi pase a firebase
import { auth } from "../firebase/firebase";

//hook
import { useEffect, useState } from "react";

//rutas
import { useNavigate } from "react-router-dom";



export default function AnyLogin(){
    const navigate = useNavigate();
    const [CurrentState, setCurrenState] = useState(0);
    /*
    currenState
    0: loading
    1: login completo: manda a app principal
    2: no hay nadie logeado: manda a presentacion
    3: inicio el registro pero no lo termino: manda a terminar el resgristro
    */
    useEffect(()=>{ //TEORIA useEffect: // useEffect es un tipo de HOOK que ejecuta un bloque de codigo en un momento puntual del ciclo de vida del componente// Por defecto se ejecuta cuando el COMPONENTE SE RENDERIZA// UN COMPONENTE SE RENDERIZA CUANDO EL ESTADO CAMBIA O CAUNDO SE RECARGA LA PAGINA// EXACTAMENTE SE EJECUTA LUEGO DE PINTAR EL COMPONENTE// useEffect PERMITE EJECUTAR CODIGO PRIMERO QUE TODO LO DEMAS, COMPONENTE// No secesariamente se ejecuta al inicio "mounting"// useEffect son efectos secundarios se ejecutan en cierta parte del codigo// a diferencia a los eventos, los eventos son generados por la interacion del usuario// Actualizacion?// El efecto primario de React es motrar html// useEffect es un efecto secundario para que react haga mas que solo mostrar html    // llamada http    // usar api del navegador     // demas...// el efecto primario de un componente es renderizar // un componete tambien obtiene datos, usa api de chrome, geolocalizacion     // en tiempo de real y demas cosas que invlocruman mas que solo mostrar html    // react no sabe de estas cosas react solo manejas estados y renderiza(bueno talvez pueda hacer mas cosas estoy iniciando y desconozco)// es un efecto secundario de un evento, un evento cambia el estado.//  useEffect mira el estado del componente y segun este cambie se ejecutan acciones secundarias que conllevan cambiar el estado del componente// ojo con los evenListener se suelen usar en usaState esto no se borran cuando se ejecutan y se acumualan, solo nesecito un even listener// para esto colocar el segundo parametr "[]" vacio significa que solo se ejecuta una vez poruq eno tiene dependencias?// esto hara que se ejecute una sola vez, a menos que le psasemos el estado por "[]" y se ejecutara cada vez que que cambie, o sea lo mismo que antes// limpiar efectos secundarios, caso: dentro de useEffect que decidimos ejecutarlo una vez "[]" ya que adentro habia un listener// entonces cuando el componente al que se aplicaba este listener deja de existir por a o b motivo este listener y todo el codigo seguira activo// entonces saldra un error ya que intenta buscar un componente que no esta montado "unmounted component"// para arreglar esto es que hay que limpiar este codigo de agrega // return () => {    //remover evento listener    // no termino de entender por que funciona si se supone que lo que estaba dentro del useEffect solo se ejecuta una vez//}
        onAuthStateChanged(auth,handleUseStateChanged)
        //explicacion funcion ofrecida por google: // muestra el usuario autenticado actualmente  //onAuthStateChanged() es el obserbador de firebase que obtiene la secion activa. regresa un user  // con firebase PERSISTENCE se puede selccionar si la sesion queda activa cuando ce cierra el navegador o no  // por defecto la sesion queda activa habria que agregar un botton de logOut
    },[]);

    async function handleUseStateChanged(user){
        if(user){
            setCurrenState(1);
            console.log(user);
            // redirigir a App principal
            navigate("/app")
            console.log("se cambio a ruta app")
        } else {
            setCurrenState(2);
            console.log("...no hay nadie registrado");
            // redirigir a presentacion
            navigate("/presentacion");
        }
    }
    return(
        <div>
          
        </div>
    );
}