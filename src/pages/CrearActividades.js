import React from "react";
import { useState } from "react";
import { callApiNoReadFormData } from "../helpers/apiCallNoRead";
import { Button } from "@mui/material";



const CrearActividades = () => {
    const [Title, setTitulo] = useState("");
    const [Description, setDesc] = useState("");
    const [File, setFoto] = useState("");
    const [Contact, setContancto] = useState("");
    const [ActivityDateFinished, setFecha] = useState ("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    
    
    
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
        setPreview(URL.createObjectURL(image));
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('Description', Description);
        formData.append('Contact',Contact)
        formData.append('ActivityDateFinished', '25-09-2023')
        formData.append('File', image)

        
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 

        }
        callApiNoReadFormData("POST","Activity", formData)
      }



    return(
        <div className="Crear">
            <h1>Crear Actividades</h1>
            <h2>Crear nueva actividad</h2>
            <form onSubmit={handlesubmit}>
                <label >Titulo de la actividad</label>
                <input 
                type="text"
                required 
                value={Title}
                onChange={(e) => setTitulo(e.target.value)}
                />
                <label >Descripcion:</label>
                <textarea
                required
                value={Description}
                onChange={(e) => setDesc(e.target.value)}  
                />
                <label>Contacto</label>
                <input
                 type="text"
                 required 
                 value={Contact}
                 onChange={(e) => setContancto(e.target.value)}
                /> 
                <label>Fecha de Finalizacion</label>
                <input
                type="date"
                required 
                value={ActivityDateFinished}
                onChange={(e) => setFecha(e.target.value)}
                />
                <label >Foto de la Actividad</label>
                <Button
                variant="contained"
                component="label"
                
                >

                Subir Archivo
                <input type="file" accept="image/*" onChange={handleImageUpload} />


                </Button>
                
                <button>Crear Actividad</button>
                <h2>Preview</h2>
                <p>{Title}</p>
                <p>{Description}</p>
                <p>{Contact}</p>
                <p>{ActivityDateFinished}</p>
                <p>{File}</p>
                {preview && <img src={preview} alt="Preview" />}
            </form>
        </div>
    );
    
};

export default CrearActividades;
