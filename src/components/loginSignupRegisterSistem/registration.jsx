//hooks
import { useState, useRef, useEffect} from "react";
//rutas
import { Link, useNavigate } from "react-router-dom";
//mi config firebase
import { auth } from "../../firebase/firebaseMyConfig";
import { storage } from "../../firebase/firebaseMyConfig";
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

    let imgUserImage = useRef();

    let navigate = useNavigate();

    const [values, setValues] = useState({
        userPhoto : emptyUserImage,
        nameUser: "",
    });

    const handleInputChangeValues = (e) =>{
        const {name,value} = e.target;
        setValues({
            ...values,
            [name] : value,
        }); 
    }

    //  ----------------------------------
    // FOPRMAS DE AGREGAR Y CLASES

    // const condition_1 = true;
    // const condition_2 = false;

    //  ${condition_1 ? 'class_1' : 'class_2'}
    //  ${condition_2 ? 'class_3' : ''}`} /> // => "class_0 class_1"
    


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

    const formSubmit = async (e) =>{
        e.preventDefault();
        try {
            const refUserAvatar = ref(storage, `avatarUsers/useravatar:${auth.currentUser.uid}`);
            await uploadString(refUserAvatar, values.userPhoto, "data_url");
            let urlServerImg = await getDownloadURL(refUserAvatar);
            await updateProfile(auth.currentUser,{
                displayName: values.nameUser, 
                photoURL: urlServerImg,
            });
            navigate("/app")
        } catch (error) {
            console.log(error);
        }
    }


    const logOut = async () =>{
        try {
            console.log(auth.currentUser);
            console.log("se cerro sesion")
            let a=await auth.signOut();
            console.log(a)
        } catch (error) {
            console.log(error)
        }
    }
 
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
                {/* <span className={stylesText.text070rem}>What about your date of birth?</span>
                <input className={uiStyless.inputText} type="date" name="dateBirth" value={values.dateBirth} onChange={handleInputChangeValues}  />   */}
                <button tabIndex={"0"} className={`${uiStyless.buttonSubmit2} ${values.nameUser.length > 0 ? uiStyless.buttonSubmit2_active : "" }`} type="submit" disabled = {values.nameUser? false: true}>
                    <span></span>
                    Continue
                </button>
            </form>
            <p className={stylesText.text070rem}>Didn't intend to create a new account?</p>
                <Link to={"/login"} tabIndex={"0"} onClick={logOut} className={`${stylesText.text070rem} ${stylesText.text070remLink} ${stylesText.text070remStriking}`} >Sign in whith another email</Link>
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