import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import React, { useEffect } from 'react';
import {useState} from 'react';
import { callApiRead } from "../helpers/apiCallRead";
import ContentLista from "../components/ContentLista";

const ContenidoPage = () => {
  const [download, setDownload]= useState([])
  

  useEffect(() => {
    const fetchData = async () => {

      await callApiRead("DownloadableContent")
        .then(response => {
          setDownload(response.data)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });

    }

    fetchData();

  }, []);

  return (
    <div>
      <h1>Welcome to the ContenidoPage</h1>
      <p>This is the content of the ContenidoPage.</p>

      <Button
                component={Link}
                to={"/subir_c"}
                key={"Subir Contenido"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {"Subir Conenido"}
              </Button>
        
              <ContentLista sub={download} title="Todas las Actividades" /> 
    </div>
    
  );
};

export default ContenidoPage;