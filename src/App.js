import {Routes, Route } from "react-router-dom";// importo los componentes para crear rutas 
import React from "react";


//routes
import LandingView from "./routes/landingRoute";
import LoginView from './routes/loginRoute';
import SignUpView from "./routes/signUpRoute"
import RegistrationView from "./routes/registrationRoute"
import MyApp from "./routes/MyApp";
import RecoverRouter from "./routes/recoverRoute";


//routesModels
import { publicRoutes,restrictedRoutes} from "./models/routes";

// hooks
import {useEffect} from "react";

//react router
import {useNavigate} from "react-router-dom";

//guards
import {AuthGuard} from "./guards/auth.guard";
import DetectorUrlAction from "./guards/detectorUrlAction.guard";


function App() {

  window.history.forward()

  const navigate = useNavigate()

  useEffect( () => {
    let dataUserLocalStorage = JSON.parse(localStorage.getItem("user"));
    if(dataUserLocalStorage){
      if (!dataUserLocalStorage.diplayName) {
        navigate(restrictedRoutes.REGISTARION_RESTRICTED);
      }else{
        navigate(restrictedRoutes.APP_RESTRICTED);
      }
    }
  }, []);


  return (
    
      <Routes>
          <Route element={<DetectorUrlAction/>}>
            <Route path = "/" element = {<React.StrictMode><LandingView/></React.StrictMode> } />
          </Route>
          <Route path = {publicRoutes.PRESENTATION_PUBLIC} element = {<React.StrictMode><LandingView/></React.StrictMode>}/>
          <Route path = {publicRoutes.SIGNUP_PUBLIC} element = {<React.StrictMode><SignUpView/></React.StrictMode>} />
          <Route path = {publicRoutes.LOGIN_PUBLIC} element = {<LoginView/> } />
          <Route element={<AuthGuard/>}>
            <Route path = {restrictedRoutes.APP_RESTRICTED} element = {<React.StrictMode> <MyApp/> </React.StrictMode>}/>
          </Route>
          <Route path = {restrictedRoutes.REGISTARION_RESTRICTED} element = {<React.StrictMode><RegistrationView/></React.StrictMode>}/>

          <Route path={publicRoutes.RECOVERPASSWORD_PUBLIC} element={<React.StrictMode> <RecoverRouter/> </React.StrictMode>}></Route> 
          <Route path = "*" element = {<h1>Error 404?</h1>}/> 
          
      </Routes>

      // why strictMode: strict mode causes components to be rendered twice in order to find bugs
      // but in my login component it has an error because it is rendered twice, I have a confirmation code
      // mail that can only be used once so I get an error
  );
}

export default App;
