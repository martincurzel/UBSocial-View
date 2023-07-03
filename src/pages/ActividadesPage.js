import React, { useEffect } from 'react';
import {useState} from 'react';
import ActLista from '../components/ActLista';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { callApiRead } from '../helpers/apiCallRead';
// import BarraBusqueda from '../components/BarraBusqueda';



 
const ActividadesPage = () => {
  const [activity, setActivity]= useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };

  const handleClickSearch = async (e) => {
    await callApiRead("Activity/currentTitle/" + searchTerm)
    .then(response => {
      setActivity(response.data)
      console.log(response)
    })
    .catch(error => {
      // Handle any errors from the API
      console.error('Error:', error);
    });

    };
    

  
  return (
    <div>
      <h1>Actividades</h1>

  
        <Button
                component={Link}
                to={"/crear_a"}
                key={"Crear Actividad"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {"Crear Actividad"}
              </Button>
        

        {/* boton de crear actividades */}

        {/* <input type='text' placeholder='Buscar Actividad' className='form-control' /> */}
          
        <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
      />  
        
        {/* <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
      /> */}
        {/* barra de busqueda de actividades */}

        <button className='btn btn-primary' onClick={handleClickSearch} >Buscar Actividad</button>
        {/* Boton de busca actividaes */}
        
       <ActLista acts={activity} title="Todas las Actividades" /> 
       {/* <ActLista acts={act.filter((ACT)=> ACT.author === `Martincito`)} title="Actividades de Martincito"/> Codigo de la lista que filtra por el titulo */}
       
        {/* Mostrar toda la lista de actividades */}

    </div>
  );
};
export default ActividadesPage;