import { Button } from "@mui/material";
import { callApiReadBlob } from "../helpers/apiCallRead";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ContentLista = ({ sub }) => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleDownload = async (url) => {
    await callApiReadBlob("downloadableContent/download?URL=" + encodeURIComponent(url))
      .then(response => {
        const urlAux = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlAux;
        link.setAttribute('download', url); // o cualquier otro nombre de archivo que desees
        document.body.appendChild(link);
        link.click();      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:', error);

        if(error.response.status === 429){
          const swalDelete = withReactContent(Swal)
          swalDelete.fire({
              icon: 'error',
              title: error.response.data,
              confirmButtonText: "Aceptar"
          })
        }
      
      });
  }

  const handleLoginModal = (bool) => {
    setIsLoginModalOpen(bool);
  };

  return (

    <div className="content-lista">

      <main className="container">
        <table className="table mt-3 table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha</th>
              <th scope="col">Descargar</th>
            </tr>
          </thead>
          <tbody>
            {sub.map((item) => (
              <tr key={item.id}>
                <td className="col-md-5">{item.title}</td>
                <td className="col-md-5">{item.dateCreation}</td>
                {isLoggedIn ? (
                  <td>
                    <Button onClick={() => handleDownload(item.URL)} variant="outlined" color="secondary">Descargar</Button>
                  </td>) : (
                  <td>
                    <Button onClick={() => handleLoginModal(true)} variant="outlined" color="secondary">Descargar</Button>
                  </td>
                )}


              </tr>
            ))}
          </tbody>
        </table>

      </main>

      <Modal open={isLoginModalOpen} onClose={() => handleLoginModal(false)}>
        <div className='text-center' style={{ backgroundColor: '#f0f0f0', width: 300, height: 280, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h4>Iniciar sesion </h4>
          <hr />
          <p>Debes iniciar sesion antes de descargar un archivo</p>
          <Button className='mt-5' variant="outlined" onClick={() => handleLoginModal(false)} color="secondary">Aceptar</Button>
        </div>
      </Modal>



    </div>
  );
}

export default ContentLista;