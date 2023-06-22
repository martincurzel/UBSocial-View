import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActividadesPage from './pages/ActividadesPage.js';
import PropuestasPage from './pages/PropuestasPage';
import ContenidoPage from './pages/ContenidoPage.js';
import PerfilPage from './pages/PerfilPage.js';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/actividades' component={<ActividadesPage/>} />
        <Route path='/propuestas' component={<PropuestasPage/>} />
        <Route path='/contenido' component={<ContenidoPage/>} />
        <Route path='/perfil' component={<PerfilPage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
