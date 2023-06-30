import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActividadesPage from './pages/ActividadesPage.js';
import PropuestasPage from './pages/PropuestasPage';
import ContenidoPage from './pages/ContenidoPage.js';
<<<<<<< Updated upstream
import UserPage from './pages/UserPage.js';
=======
import PerfilPage from './pages/PerfilPage.js';
import CrearActividades from './pages/CrearActividades.js';
import ActDetail from './pages/ActDetail.js'
>>>>>>> Stashed changes
import { Provider } from "react-redux";
import store from "./store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='actividades' element={<ActividadesPage/>} />
            <Route path='propuestas' element={<PropuestasPage/>} />
            <Route path='contenido' element={<ContenidoPage/>} />
<<<<<<< Updated upstream
            <Route path='perfil' element={<UserPage/>} />
=======
            <Route path='perfil' element={<PerfilPage/>} />
            <Route path='crear_a' element={<CrearActividades/>}/>
            <Route path='act_d/:id' element={<ActDetail/>}/>
>>>>>>> Stashed changes
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
