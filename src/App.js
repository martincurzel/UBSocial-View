import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet/>
    </>
  );
}

export default App;
