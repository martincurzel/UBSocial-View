import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { callApiRead } from "../helpers/apiCallRead";
import ContentLista from "../components/ContentLista";
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const ContenidoPage = () => {
  const [download, setDownload] = useState(null)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {

      await callApiRead("DownloadableContent/subject/" + id)
        .then(response => {
          setDownload(response.data)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });

    }

    fetchData();

  }, [id]);

  const handleLoginModal = (bool) => {
    setIsLoginModalOpen(bool);
  };


  return (

    <div>

      <div className="mt-5 mb-5">
        <div className='row'>
          <div className='col-md-10 mt-3'>
            <Typography variant="h4" >Contenido Descargable</Typography>
          </div>
          <div className='col-md-2 mt-3'>
            {isLoggedIn ? (
              <Button
                component={Link}
                to={"/subir_c/" + id}
                key={"Subir Contenido"}
                variant="outlined"
                color="secondary"
              >
                Subir
              </Button>
            ) : (
              <Button onClick={() => handleLoginModal(true)} variant="outlined" color="secondary">Subir</Button>
            )}

          </div>

        </div>
      </div>

      {download == null ? (<>

        <span>cargando...</span>
      </>
      ) : download === "" ? (
        <div className="container text-center">
          <hr className="mt-5"/>
          <Typography className="mt-5" variant="h6" >No hay archivos para esta materia :(</Typography>
        </div>

      ) : (
        <>         
          <ContentLista sub={download} deleteFlag={false} title="Todas las Actividades" />          
        </>
      )}
      <Modal open={isLoginModalOpen} onClose={() => handleLoginModal(false)}>
            <div className='text-center' style={{ backgroundColor: '#f0f0f0', width: 300, height: 280, margin: 'auto', marginTop: 100, padding: 20 }}>
              <h4>Iniciar sesion </h4>
              <hr />
              <p>Debes iniciar sesion antes de subir un archivo</p>
              <Button className='mt-5' variant="outlined" onClick={() => handleLoginModal(false)} color="secondary">Aceptar</Button>
            </div>
          </Modal>
    </div >

  );
};

export default ContenidoPage;