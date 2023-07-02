import React from "react";
import { useState } from "react";
import { callApiNoReadFormData } from "../helpers/apiCallNoRead";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@mui/material";


const SubirContenido = () => {
    const {idSubject} = useParams();
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
        
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
        await callApiNoReadFormData("POST","downloadableContent", formData)
        .then(response => {
            Swal.fire({
                position: 'top-end',
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
            console.error('Error:', error);
          });
        
      }



    return(
        <div className="Crear mt-5">
            <hr/>
            <h1>Subir Contenido</h1>
            <form className="mt-5" onSubmit={handlesubmit}>
                <label>Titulo del contenido</label>
                <input 
                type="text"
                required 
                value={Title}
                onChange={(e) => setTitulo(e.target.value)}
                />
               
                <label className="mt-3">Subir Archivo</label>
                

                <input type="file" accept="*" onChange={handleImageUpload} />


                <Button className="mt-5" type="submit" variant="outlined" color="secondary">Enviar</Button>
            </form>
            <hr/>
        </div>
    );
    
};

export default SubirContenido;
