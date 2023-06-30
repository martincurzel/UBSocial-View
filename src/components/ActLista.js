import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const ActLista = (props) => {
    
    return (
        <div className="act-lista">
            <h2>{props.title}</h2>
            {props.acts.map((act)=> (
          <div className="act-preview" key={act.id}>

            <Button 
              component={Link}
                to={"/actividades/" + act.id}
                key={"Crear Actividad"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
               <h2>{act.title}</h2>
               <p>Creado por: {act.author}</p>

              
            </Button>
            
          </div>
            ))}
        </div>
    );
}
 
export default ActLista;
