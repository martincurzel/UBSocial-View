import React from "react";
import { useState } from "react";


const CrearActividades = () => {
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [autor, setAutor] = useState ("");
    

    const handlesubmit = (e) => {
        e.preventDefault()
        const actividad = {titulo, desc, autor}

        fetch("",{
            method:"POST",
            headers:{"tipo de contenido": ""},
            body:JSON.stringify(actividad) /*Cambiar por la BD correcta */
        }).then (()=>{
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
                <input 
                type="text"
                required 
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                />
                <button>Crear Actividad</button>
                <h2>Previe</h2>
                <p>{titulo}</p>
                <p>{desc}</p>
                <p>{autor}</p>
            </form>
        </div>
    );
    
};

export default CrearActividades;
