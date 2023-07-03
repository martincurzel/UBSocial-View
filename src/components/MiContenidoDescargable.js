import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import ContentLista from "../components/ContentLista";

const MiContenidoDescargable = () => {
  const loginToken = localStorage.getItem('jwtToken');
  const [download, setDownload] = useState([]);

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
      {download.length > 0 ? (
        <ContentLista sub={download} deleteFlag={true} fetchContent={fetchContent} title="Todas las Actividades" />
      ) : (
        <p>No hay contenido descagable subido por vos</p>
      )}
    </div>
  );
};

export default MiContenidoDescargable;