import React from "react";
import { useState } from "react";
import { callApiNoReadFormData } from "../helpers/apiCallNoRead";
import { Button, Box } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from 'react-router-dom';


const CrearActividades = () => {
    const [Title, setTitulo] = useState("");
    const [Description, setDesc] = useState("");
    const [Contact, setContancto] = useState("");
    const [ActivityDateFinished, setFecha] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();


    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setImage(file);
        } else {
            setImage(null);
        }
    }

    function handlesubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('Description', Description);
        formData.append('Contact', Contact)
        formData.append('ActivityDateFinished', ActivityDateFinished)
        formData.append('File', image)

        callApiNoReadFormData("POST", "Activity", formData)
        .then(response => {
    
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Operacion realizada con exito!',
              showConfirmButton: false,
              timer: 1000
          })
        
          setTimeout(function () {
            navigate('/actividades');
        }, 1150);
        
          }).catch(error => {
            const swalDelete = withReactContent(Swal)
            swalDelete.fire({
                icon: 'error',
                title: error.response.data,
                confirmButtonText: "Aceptar"
            })
        })
    }

    return (
        <div className="Crear">
            <h1 className="mt-3">Crear Actividad</h1>
            <Box className="container mt-5 pb-3 px-4"
                sx={{
                    width: '100%',
                    border: '1.5px solid rgba(108,26,123,255)',
                    borderRadius: 3
                }}
            >
                <form className="mt-3" onSubmit={handlesubmit}>
                    <label >Titulo de la actividad</label>
                    <input
                        type="text"
                        required
                        value={Title}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <label className="mt-2" >Descripcion:</label>
                    <textarea
                        required
                        value={Description}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <label className="mt-2">Contacto:</label>
                    <input
                        type="text"
                        required
                        value={Contact}
                        onChange={(e) => setContancto(e.target.value)}
                    />
                    <label className="mt-3">Fecha de Finalizacion:</label>
                    <input
                        type="date"
                        required
                        value={ActivityDateFinished}
                        onChange={(e) => setFecha(e.target.value)}
                    />

                    <label className="mt-4">Foto de la Actividad:</label>
                    <input type="file" className="form-control" required accept="image/*" onChange={handleImageUpload} />

                    <hr className="mt-4" />

                    <Button className="mt-1" type="submit" variant="outlined" color="secondary">Crear Actividad</Button>



                </form>
            </Box>
        </div>
    );

};

export default CrearActividades;
