import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActividadesPage from './pages/ActividadesPage.js';
import PropuestasPage from './pages/PropuestasPage';
import ContenidoPage from './pages/ContenidoPage.js';
import PerfilPage from './pages/PerfilPage.js';
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
            <Route path='perfil' element={<PerfilPage/>} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
