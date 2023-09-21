//hooks
import { useState, useRef, useEffect} from "react";
//rutas
import { Link, useNavigate } from "react-router-dom";
//mi config firebase
import { auth } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
//firebase dependencias
import { updateProfile, } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
//css
import stylesRegistration from "../../styles/styleComponets/registration.module.css";
import stylesText from "../../styles/texts.module.css"
import uiStyless from "../../styles/uiStyles.module.css"
//img
import emptyUserImage from "../../img/empty-avatar.png";


export default function RegistrationForm(){

    let registrationSubmit = useRef();
    let imgUserImage = useRef();
    let navigate = useNavigate();

    const [submitState, setSubmitState] = useState("disabled");
    const [values, setValues] = useState({
        userPhoto : emptyUserImage,
        nameUser: "",
        // dateBirth: "",
    });

    
    //OnChange: input name 
    const handleInputChangeValues = (e) =>{
        const {name,value} = e.target;
        setValues({
            ...values,
            [name] : value,
        });
    }

    //OnChanges: input file
    const handleInputChangeFiles = (e) =>{
        if(e.target.files[0]){
            const reader = new FileReader();
            const {name} = e.target;
            reader.onload = (e)=>{
                let urlData = e.target.result;
                imgUserImage.current.src = urlData ;
                setValues({
                    ...values,
                    [name] : urlData,
                });
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    useEffect(()=>{
        const obtSubmitState = {
            ...(submitState === "disabled" && "buttonSubmit2_disabled"),
            ...(submitState === "active" && "buttonSubmit2_active"),
            ...(submitState === "loading" && "buttonSubmit2_loading")
        };
        if(values.nameUser){
            setSubmitState("active");
            // registrationSubmit.current.classList.remove(uiStyless.buttonSubmit2_active);
            // registrationSubmit.current.disabled = true;
        } else{
            setSubmitState("disabled")
            // registrationSubmit.current.classList.add(uiStyless.buttonSubmit2_active);
            // registrationSubmit.current.disabled = false;
        }
    },[values])


    //submit: form
    const formSubmit = async (e) =>{
        e.preventDefault();
        console.log(submitState)
        try {
            setSubmitState("loading");
            // registrationSubmit.current.classList.remove(uiStyless.buttonSubmit2_active);
            // registrationSubmit.current.classList.add(uiStyless.buttonSubmit2_loading);
            const refUserAvatar = ref(storage, `avatausers/useravatar:${auth.currentUser.uid}`);
            await uploadString(refUserAvatar, values.userPhoto, "data_url");
            let urlServerImg = await getDownloadURL(refUserAvatar);
            await updateProfile(auth.currentUser,{
                displayName: values.name, 
                photoURL: urlServerImg,
            });
            setSubmitState("disabled");
            // registrationSubmit.current.classList.remove(uiStyless.buttonSubmit2_loading)
            // registrationSubmit.current.classList.add(uiStyless.buttonSubmit2_active);
            //navigate("/app")
            console.log(values)
        } catch (error) {
            console.log(error)
        }
    }

    //storageFirebase pide configurar las reglas de acceso publico
    //se puede tener varios buckets(ubicaciones de servidores al rededor del mundo)
    


    return (
        <div className={stylesRegistration.registrationContainerComponent}>
            <h1 className={stylesRegistration.h1}>Welcome</h1>
            <h3 className={stylesRegistration.h3}>First things first, tell us a bit about yourself.</h3>
            <form className={stylesRegistration.registrationForm} tabIndex={0} onSubmit={formSubmit}>
                <img className={stylesRegistration.image} src={values.userPhoto} alt="avatar" ref={imgUserImage} />
                <div  className={stylesRegistration.buttonAddFotoContainer}>
                    <input tabIndex={"0"} 
                    className={stylesRegistration.buttonAddFoto} 
                    files={values.userPhoto} 
                    onChange={handleInputChangeFiles} 
                    name="userPhoto" 
                    type="file" 
                    aria-label="foto ususario"
                    accept="image/png, image/jpeg"
                    />
                    add a photo
                </div>
                <span className={stylesText.text070rem}>What should we call you?</span>
                <input tabIndex={"0"} className={uiStyless.inputText} type="text" name="nameUser" value={values.nameUser} onChange={handleInputChangeValues} autoComplete="off" placeholder="e.g. Ada Lovelace, Ada, AL" />
                <button tabIndex={"0"} className={`${uiStyless.buttonSubmit2} ${uiStyless.obtSubmitState}`} type="submit" ref={registrationSubmit} disabled = {submitState == "loading" || submitState == "disabled" ? true : false   } >
                    <span></span>
                    Continue
                </button>
                
                {/* <span className={styles.Span}>What about your date of birth?</span>buttonSubmit2_active
                <input className={styles.inputText} type="date" name="dateBirth" value={values.dateBirth} onChange={handleInputChangeValues}  />   */}
            </form>
            <p className={stylesText.text070rem}>Didn't intend to create a new account?</p>
                <Link to={"/"} tabIndex={"0"} className={`${stylesText.text070rem} ${stylesText.text070remLink} ${stylesText.text070remStriking}`} >Sign in whith another email</Link>
        </div>
    );
}

//push(): añade un alemento al final del arreglo
//unshift(): añade un elemento al inicio del arreglo
//pop(): eliminar el ultimo elemento
//shift(): elimina el primer elemento
//slice(): hace una copia exacta del arreglo sin modificar el original [] === copia[] //returns false
//const ensaladaCloned = [...ensalada]; tambien crea una copi exacta operador spread
//Array.isArray([]) //returns true
//let [tomate, hongo, zanahoria] = ['?', '?', '?'];
//fruits[4][2]; // returns '?':arreglo anidados
//let [,,,,[,,zanahoria]] = ['?', '?', '?', '?', ['?', '?', '?']]; lo mismo que lo pasado
//const emotionalVeggies = [...emotion, ...veggies]; combinar arreglos
//array.concat(arr1, arr2,..,..,..,arrN); cmbinar varios arreglos
//join(,): une los elementos de un arreglo, regresa una cadena 
//fill(): cambia lo elementos que yo selecciono
//includes(): false o true , si encuentra una coincidencia en le arreglo
//indexOf(): indice de un elemento
//reverse()
//sort(): convierte los elementos a cadenad e texto y luego los ordena segun UTF-16
//filter(): crea un nuevo arreglo , con los que cumplan la condicion indicada
//map()