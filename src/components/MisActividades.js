import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import ActLista from './ActLista';

const MisActividades = () => {
  const [activity, setActivity]= useState([]);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "activity/current", null, loginToken)
      .then(response => {
        console.log('Response:',response);
        setActivity(response.data);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  return (
    <div style={{ width: 'auto', margin: 'auto' }}>
      {activity.length > 0 ? (
        <ActLista acts={activity} title="Todas las Actividades" />
      ) : (
        <p>No hay actividades creadas por vos</p>
      )}
    </div>
  );
};

export default MisActividades;