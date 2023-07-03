import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";


const MisActividades = () => {
  const [activities, setActivities]= useState(null);
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
          position: 'center',
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
      {activities == null ? (
      <>
        <span>cargando...</span>
      </>
      ) : activities.length > 0 ? (
        <>
        <Typography component={'span'} variant={'h2'} sx={{ color: '#372249' }}>Mis Actividades:</Typography>
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
                <Box flexDirection="row" display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Typography component={'span'} variant={'h4'} sx={{ color: '#372249', mr: 2 }}>{activity.title}</Typography>
                  <Typography variant="p" sx={{ color: '#372249', mr: 2 }}>
                    Fecha de la actividad: {
                      format(new Date(activity.dateActivity), 'd/M/yyyy')
                    }
                  </Typography>
                  <Typography variant="p" sx={{ color: '#372249' }}>Participantes: {activity.members}</Typography>
                </Box>
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