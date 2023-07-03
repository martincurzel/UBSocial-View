import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import ContentLista from "../components/ContentLista";
import Typography from '@mui/material/Typography';

const MiContenidoDescargable = () => {
  const loginToken = localStorage.getItem('jwtToken');
  const [download, setDownload] = useState(null);

  const fetchContent = () => {
    // Fetch profile data from the API
    callApiNoRead("GET", "downloadableContent/current", null)
      .then(response => {
        console.log('Response:',response);
        setDownload(response.data);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }

  useEffect(() => {
    fetchContent();
  }, [loginToken]);

  return (
    <div style={{ width: 'auto', margin: 'auto' }}>
      {download == null ? (
      <>
        <span>cargando...</span>
      </>
      ) : download.length > 0 ? (
        <div>
          <Typography variant="h3" sx={{ color: '#372249' }}>Mis Contenido Descargable:</Typography>
          <ContentLista sub={download} deleteFlag={true} fetchContent={fetchContent} title="Todas las Actividades" />
        </div>
      ) : (
        <p>No hay contenido descagable subido por vos</p>
      )}
    </div>
  );
};

export default MiContenidoDescargable;