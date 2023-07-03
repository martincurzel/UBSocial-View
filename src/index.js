import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActividadesPage from './pages/ActividadesPage.js';
import PropuestasPage from './pages/PropuestasPage';
import ContenidoPage from './pages/ContenidoPage.js';
import UserPage from './pages/UserPage.js';
import CrearActividades from './pages/CrearActividades.js';
import ActDetail from './pages/ActDetail.js';
import { Provider } from "react-redux";
import store from "./store";
import SubirContenido from './pages/SubirContenido.js';
import MateriasPage from './pages/MateriasPage';
import NoPage from './pages/NoPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<ActividadesPage />} />
            <Route path='actividades/:id' element={<ActDetail/>}/>
            <Route path='actividades' element={<ActividadesPage/>} />
            <Route path='propuestas' element={<PropuestasPage/>} />
            <Route path='materias' element={<MateriasPage/>} />
            <Route path='contenidos/:id' element={<ContenidoPage/>} />
            <Route path='perfil' element={<UserPage/>} />
            <Route path='crear_a' element={<CrearActividades/>}/>
            <Route path='subir_c/:idSubject' element={<SubirContenido />}/>
            <Route path="*" element={<NoPage />} />

            
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
