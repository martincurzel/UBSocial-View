import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MisActividades = () => {
  const [activities, setActivities]= useState([]);
  const loginToken = localStorage.getItem('jwtToken');

  const fetchActivities = () => {
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
  }

  useEffect(() => {
    fetchActivities();
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
      fetchActivities();
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
            <Grid container spacing={3} justifyContent="left" alignItems="center">
              <Grid item xs={5}>
                <Button 
                  component={Link}
                  to={"/actividades/" + activity.id}
                  key={"Actividad"}
                  variant="outlined"
                  color="secondary"
                  sx={{ my: 2, color: '#372249', display: 'block' }}
                >
                <Typography variant="h2" sx={{ color: '#372249' }}>{activity.title}</Typography>
                <Typography variant="p" sx={{ color: '#372249' }}>Creado por: {activity.author}</Typography>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={() => deleteActivity(activity.id)} variant="outlined" color="secondary" sx={{ my: 2, color: '#372249', display: 'block' }}
                >
                {"Eliminar"}
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}</>
      ) : (
        <p>No hay actividades creadas por vos</p>
      )}
    </div>
  );
};

export default MisActividades;