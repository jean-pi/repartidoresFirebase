import {Routes, Route } from "react-router-dom";// importo los componentes para crear rutas 


//manejador de login
//import AnyLogin from "./routes/anylogin";

//routes
import PresentacionView from "./routes/presentacionView";
import LoginView from './routes/loginView';
import SignUpView from "./routes/signUpView"
import RegistrationView from "./routes/registationView"
import MyApp from "./routes/MyApp";

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<PresentacionView/>} />
      <Route path = "presentacion" element = {<PresentacionView/>}/>
      <Route path = "login" element = {<LoginView/>} />
      <Route path = "signup" element = {<SignUpView/>} />
      <Route path = "registration" element = {<RegistrationView/>}/>
      <Route path = "app" element = {<MyApp/>}/>
    </Routes>
  );
}

export default App;
