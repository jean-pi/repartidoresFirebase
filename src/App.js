import {Routes, Route } from "react-router-dom";// importo los componentes para crear rutas 
import React, { useState } from "react";


//routes
import LandingView from "./routes/landingRoute";
import LoginView from './routes/loginRoute';
import SignUpView from "./routes/signUpRoute"
import RegistrationView from "./routes/registrationRoute"
import MyApp from "./routes/MyApp";




function App() {
  return (
      <Routes>
          <Route path = "/" element = {<React.StrictMode><LandingView/></React.StrictMode> } />
          <Route path = "/presentacion" element = {<React.StrictMode><LandingView/></React.StrictMode>}/>
          <Route path = "/signup" element = {<React.StrictMode><SignUpView/></React.StrictMode>} />
          <Route path = "/registration" element = {<React.StrictMode><RegistrationView/></React.StrictMode>}/>
          <Route path = "/app" element = {<React.StrictMode><MyApp/> </React.StrictMode>}/>
          <Route path = "*" element = {<h1>Error 404?</h1>}/> 
          <Route path = "/login" element = {<LoginView/> } />
      </Routes>
      // why strictMode: strict mode causes components to be rendered twice in order to find bugs
      // but in my login component it has an error because it is rendered twice, I have a confirmation code
      // mail that can only be used once so I get an error
  );
}

export default App;
