import React from "react";
import { useState } from "react";
import { callApiNoReadFormData } from "../helpers/apiCallNoRead";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Box, Typography } from "@mui/material";


const SubirContenido = () => {
    const { idSubject } = useParams();
    const [Title, setTitulo] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    function handleImageUpload(e) {
        const file = e.target.files[0];
        setFile(file);
    }
    const handlesubmit = async (e) => {



        e.preventDefault();
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('File', file)
        formData.append('idSubject', idSubject)

        await callApiNoReadFormData("POST", "downloadableContent", formData)
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Operacion realizada con exito!',
                    showConfirmButton: false,
                    timer: 1000
                })

                setTimeout(function () {
                    navigate("/contenidos/" + idSubject);
                }, 1150);
            })
            .catch(error => {
                // Handle any errors from the API
            });

    }



    return (
        <div className="Crear mt-5">
            {localStorage.getItem("jwtToken") === null ? (
                <>
                    <Typography className="mb-4" variant="p">Porfavor accede a tu cuenta para acceder a esta página.</Typography>
                </>
            ) : (
                <>
                    <h1>Subir Contenido</h1>
                    <Box className="container mt-5 pb-3 px-4"
                        sx={{
                            width: '100%',
                            border: '1.5px solid rgba(108,26,123,255)',
                            borderRadius: 3
                        }}
                    >
                        <form className="mt-3" onSubmit={handlesubmit}>
                            <label>Titulo del contenido</label>
                            <input
                                type="text"
                                required
                                value={Title}
                                onChange={(e) => setTitulo(e.target.value)}
                            />

                            <label className="mt-3">Subir Archivo</label>


                            <input className="form-control" type="file" accept="*" onChange={handleImageUpload} />
                            <hr className="mt-4" />


                            <Button className="mt-3" type="submit" variant="outlined" color="secondary">Enviar</Button>
                        </form>

                    </Box>

                </>
            )}
        </div>
    );

};

export default SubirContenido;
