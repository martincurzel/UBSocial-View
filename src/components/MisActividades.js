import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MisActividades = () => {
  const [activities, setActivities]= useState([]);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "activity/current", null)
      .then(response => {
        console.log('Response:',response);
        setActivities(response.data);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  const deleteActivity = (id) => {
    callApiNoRead("DELETE", "activity/" + id, null)
      .then(response => {
        console.log('Response:',response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Operacion realizada con exito!',
          showConfirmButton: false,
          timer: 1000
      })
    
      setTimeout(function () {
          window.location.reload();
      }, 1150);
      })
      .catch(error => {
        // Handle any errors from the API
        const swalDelete = withReactContent(Swal);
        swalDelete.fire({
          icon: 'error',
          title: error.response.data,
          confirmButtonText: "Aceptar"
      });
        console.error('Error:',error);
      });
  }

  return (
    <div style={{ width: 'auto', margin: 'auto' }}>
      {activities.length > 0 ? (
        <>
        {activities.map((activity, index) => (
          <div key={index}>
            <hr />
            <Button 
              component={Link}
                to={"/actividades/" + activity.id}
                key={"Actividad"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
               <h2>{activity.title}</h2>
               <p>Creado por: {activity.author}</p>
            </Button>
            <Button
                onClick={() => deleteActivity(activity.id)} variant="outlined" color="secondary"
            >
                {"Eliminar"}
            </Button>
          </div>
        ))}</>
      ) : (
        <p>No hay actividades creadas por vos</p>
      )}
    </div>
  );
};

export default MisActividades;