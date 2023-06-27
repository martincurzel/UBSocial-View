import React from 'react';
import {useState} from 'react';
import ActLista from './ActLista';



 
const ActividadesPage = () => {
  const [act, setAct]= useState([
    {title: `Jugar Futbol`, body: `xfcgvbhjnkml`, author: `Martincito`, id:1},
    {title: `Jugar lol`, body: `erdcftvgybhunjim`,autror: `Mateito` , id:2},
    {title: `Jugar css`, body:`rtdcfvgyhbujnk`, author: `Martincito`, id:3} /*Codigo para mostrar actividades*/
  ])


  const[name, setName]= useState(` `);

  const handleClick = () => {
    setName (`Figuran estas actividades`)
  }
  return (
    <div>
      <h1>Actividades</h1>
      <p>This is the content of the ActividadesPage.</p>
      <p>{name}</p>
        {/* <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        Crear Actividades
        </Typography> */}
        {/* <Button 
        // Component={Link}
        // to={page.route}
        // key={page.name}
        href='./ActividadesPage.js'
        sx={{md:2, color: `board`, display:`block`}}>
          
        </Button> */}

        <button className='btn btn-secondary'>
          Crear Actividad 
        </button>
        {/* boton de crear actividades */}

        <input type='text' placeholder='Buscar Actividad' className='form-control'>
        </input>
        {/* barra de busqueda de actividades */}
        
       <ActLista acts={act} title="Todas las Actividades"/> 
       {/* <ActLista acts={act.filter((ACT)=> ACT.author === `Martincito`)} title="Actividades de Martincito"/> Codigo de la lista que filtra por el titulo */}
       
        {/* Mostrar toda la lista de actividades */}

        <button className='btn btn-primary' onClick={handleClick}>Buscar Actividad</button> 
        {/* Boton de busca actividaes */}
        

    </div>
  );
};

export default ActividadesPage;