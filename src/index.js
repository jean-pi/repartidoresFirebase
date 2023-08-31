import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles/normalize.css"
import App from './App';
import {BrowserRouter, Routes, Route } from "react-router-dom";// importo los componentes para crear rutas 

//rutas
import LoginView from './routes/loginView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<LoginView/>} />
      <Route path = "login" element = {<App/>}/>
    </Routes>
  </BrowserRouter>

);
