import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ContentLista = ({sub}) => {
    
    return (
        <div className="content-lista">
            <h2>{sub.title}</h2>
            {sub.map((down)=> (
          <div className="download-preview" key={sub.id}>

            <Button 
              component={Link}
                to={"/contenido/" + down.id}
                key={"Contenido"}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
               <h2>{down.title}</h2>
               <p>Creado por: {down.author}</p>

              
            </Button>
            
          </div>
            ))}
        </div>
    );
}
 
export default ContentLista;