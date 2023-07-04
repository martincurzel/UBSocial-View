import React, { useEffect } from 'react';
import { useState } from 'react';
import ActLista from '../components/ActLista';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { callApiRead } from '../helpers/apiCallRead';
import { useSelector } from "react-redux";
import { Typography, Modal } from '@mui/material';



const ActividadesPage = () => {
  const [activity, setActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTermStatic, setSearchTermStatic] = useState('');
  const [searchError, setSearchError] = useState(null);

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

  const handleJoin = (activityId, isJoined) => {
    // Make API call to update the AreuJoined property of the activity
    // ...
  
    // Update the activity list in the state
    const updatedActivity = activity.map((item) => {
      if (item.id === activityId) {
        return { ...item, isJoined: isJoined };
      }
      return item;
    });
    setActivity(updatedActivity);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoginModal = (bool) => {
    setIsLoginModalOpen(bool);
  };

  const handleCloseSearch = (bool) => {
    window.location.reload();
  };

  const handleClickSearch = async (e) => {
    setSearchError(null);
    if(searchTerm === ''){
      setSearchError("Porfavor inserte un parametro de busqueda")
    }
    else{
      await callApiRead("Activity/currentTitle/" + searchTerm)
        .then(response => {
          setActivity(response.data);
          setIsSearchActive(true);
          setSearchTermStatic(searchTerm);
          console.log(response);
        })
        .catch(error => {
          // Handle any errors from the API
          setSearchError(error.response.data);
          console.error('Error:', error);
        });
    }
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
      {searchError === null ? (
      <>
      </>
      ) : (
      <>
        <Typography variant="p" sx={{ color: '#ff0000' }}>{searchError}</Typography>
      </>)}
      {isSearchActive === false ? (
      <>
      </>
      ) : (
      <>
        <Button 
          component={Link}
          to={"/"}
          color="error"
          variant='outlined'
          onClick={handleCloseSearch}
        >
          {searchTermStatic} X
        </Button>
      </>)}

      <hr/>


      <ActLista acts={activity} title="Todas las Actividades" handleJoin={handleJoin} />
      <Modal open={isLoginModalOpen} onClose={() => handleLoginModal(false)}>
        <div className='text-center' style={{ backgroundColor: '#f0f0f0', width: 300, height: 280, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h4>Iniciar sesion </h4>
          <hr />
          <p>Debes iniciar sesion antes de crear una actividad</p>
          <Button className='mt-5' variant="outlined" onClick={() => handleLoginModal(false)} color="secondary">Aceptar</Button>
        </div>
      </Modal>
    </div>
  );
};
export default ActividadesPage;