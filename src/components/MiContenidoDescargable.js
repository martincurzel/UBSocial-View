import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const MiContenidoDescargable = () => {
  const [downloads, setDownloads]= useState([])
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "downloadableContent/current", null)
      .then(response => {
        console.log('Response:',response);
        setDownloads(response.data);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  const deleteContent = (id) => {
    callApiNoRead("DELETE", "downloadableContent/" + id, null)
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
      {downloads.length > 0 ? (
        <>
        {downloads.map((download, index) => (
          <div key={index}>
            <hr />
            <Button 
              component={Link}
                to={"/contenido/" + download.id}
                key={"Contenido"}
                variant='outlined'
                color="secondary"
                sx={{ my: 2, color: 'black', display: 'block' }}
            >
              <Typography variant="h3" sx={{ color: '#372249' }}>{download.title}</Typography>
              <Typography variant="p" sx={{ color: '#372249' }}>{download.description}</Typography>
            </Button>
            
            <Button
                onClick={() => deleteContent(download.id)} variant="outlined" color="secondary"
            >
                {"Eliminar"}
            </Button>
          </div>
        ))}</>
      ) : (
        <p>No hay contenido descagable subido por vos</p>
      )}
    </div>
  );
};

export default MiContenidoDescargable;