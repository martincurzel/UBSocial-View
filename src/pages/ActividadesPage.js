import React, { useEffect } from 'react';
import {useState} from 'react';
import ActLista from '../components/ActLista';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { callApiRead } from '../helpers/apiCallRead';



 
const ActividadesPage = () => {
  const [activity, setActivity]= useState([])

  // const handleClick = () => {
  //   setName (`Figuran estas actividades`)
  // }
  
  // const crearActividad ={
  //   nombre:"crearActividad", route:"/crearactividades"
  // }

  useEffect(() => {
    const fetchData = async () => {

      await callApiRead("Activity")
        .then(response => {
          setActivity(response.data)
          console.log(response)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });

    }

    fetchData();

  }, []);
  


  // console.log('Datos de tabla', titulo);

  return (
    <div>
      <h1>Actividades</h1>

     

        {/* <button className='btn btn-secondary' >
          Crear Actividad 
        </button> */}
        <Button
                component={Link}
                to={"/crear_a"}
                key={"Crear Actividad"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {"Crear Actividad"}
              </Button>
        

        {/* boton de crear actividades */}

        <input type='text' placeholder='Buscar Actividad' className='form-control'>
           
        </input>
        {/* barra de busqueda de actividades */}

        <button className='btn btn-primary' >Buscar Actividad</button> 
        {/* Boton de busca actividaes */}
        
       <ActLista acts={activity} title="Todas las Actividades" /> 
       {/* <ActLista acts={act.filter((ACT)=> ACT.author === `Martincito`)} title="Actividades de Martincito"/> Codigo de la lista que filtra por el titulo */}
       
        {/* Mostrar toda la lista de actividades */}

        
        

    </div>
  );
};

export default ActividadesPage;