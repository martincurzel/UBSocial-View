import React from "react";
import { useState } from "react";
import { callApiNoReadFormData } from "../helpers/apiCallNoRead";
import { Button } from "@mui/material";

const SubirContenido = () => {
    const [Title, setTitulo] = useState("");
    const [Description, setDesc] = useState("");
    const [Contact, setContancto] = useState("");
    const [file, setFile] = useState(null);
    
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "file") {
          setFile(file);
        } else {
            setFile(null);
        }
    }

    function handlesubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('Description', Description);
        formData.append('Contact',Contact)
        formData.append('File', file)

        
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
        callApiNoReadFormData("POST","Activity", formData)
      }



    return(
        <div className="Crear">
            <h1>Subir Contenido</h1>
            <form onSubmit={handlesubmit}>
                <label >Titulo del contenido</label>
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
                <label >Archivo</label>
                <Button
                variant="contained"
                component="label"
                
                >

                Subir Archivo
                <input type="file" accept="*" onChange={handleImageUpload} />


                </Button>
                
                <button>Terminado</button>
            </form>
        </div>
    );
    
};

export default SubirContenido;
