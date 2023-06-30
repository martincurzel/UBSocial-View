import React from "react";
import { useState } from "react";
import { callApiNoRead } from "../helpers/apiCallNoRead";



const CrearActividades = () => {
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    
    

    const handlesubmit = (e) => {
        e.preventDefault()
        const actividad = {titulo, desc}

        callApiNoRead("POST","Activity", actividad)
        .then (()=>{
            // history.push('/')
        })
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
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />
                <label >Descripcion:</label>
                <textarea
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}  
                />
                <label >Encargado de la Actividad:</label>

                <button>Crear Actividad</button>
                <h2>Preview</h2>
                <p>{titulo}</p>
                <p>{desc}</p>
               
            </form>
        </div>
    );
    
};

export default CrearActividades;
