import React, { useEffect } from 'react';
import { useState } from 'react';
import ActLista from '../components/ActLista';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { callApiRead } from '../helpers/apiCallRead';
import { useSelector } from "react-redux";
import { Typography  } from '@mui/material';



const ActividadesPage = () => {
  const [activity, setActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  const handleLoginModal = (bool) => {
    setIsLoginModalOpen(bool);
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

      <div className='row mt-5'>
        <div className='col-md-10'>
          <Typography variant="h4">Actividades de los alumnos</Typography>
        </div>
        <div className='col-md-2 mt-3'>
          {isLoggedIn ? (
            <Button component={Link} to={"/crear_a"} variant="outlined" color="secondary">Crear Actividad</Button>
          ) : (
            <Button onClick={() => handleLoginModal(true)} variant="outlined" color="secondary">Crear Actividad</Button>
          )}
        </div>
      </div>

      <div className='row justify-content-center mt-5 mb-5'>

        <div className='col-md-4'>
          <input
            type="text"
            className='form-control col-md-4'
            value={searchTerm}
            onChange={handleChange}
            placeholder="Buscar..."
          />
        </div>

        <div className='col-md-2'>
          <Button onClick={handleClickSearch} variant="outlined" color="secondary">Buscar Actividad</Button>
        </div>

      </div>

      <hr/>


      <ActLista acts={activity} title="Todas las Actividades" />

      

    </div>
  );
};
export default ActividadesPage;