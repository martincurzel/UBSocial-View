import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <div className='container mt-5' >
        <Outlet/>  
      </div>
      
    </>
  );
}

export default App;
