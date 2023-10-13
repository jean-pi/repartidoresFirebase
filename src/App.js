import {Routes, Route } from "react-router-dom";// importo los componentes para crear rutas 


//manejador de login
//import AnyLogin from "./routes/anylogin";

//routes
import PresentacionView from "./routes/presentacionRoute";
import LoginView from './routes/loginRoute';
import SignUpView from "./routes/signUpRoute"
import RegistrationView from "./routes/registrationRoute"
import MyApp from "./routes/MyApp";

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<PresentacionView/>} />
      <Route path = "/presentacion" element = {<PresentacionView/>}/>
      <Route path = "/login" element = {<LoginView/>} />
      <Route path = "/signup" element = {<SignUpView/>} />
      <Route path = "/registration" element = {<RegistrationView/>}/>
      <Route path = "/app" element = {<MyApp/>}/>
      <Route path = "*" element = {<h1>Error 404?</h1>}/> 
    </Routes>
  );
}

export default App;
