import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { callApiRead } from "../helpers/apiCallRead";
import { useState } from "react";
import { useEffect } from "react";

const ContentLista = ({sub}) => {
  const[down, setContent] = useState([]);

  const handleDownloadContent = () => {
       callApiRead("DownloadableContent")
        .then(response => {
          setContent(response.data)
          console.log(response)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });
  };

  useEffect(() => {
    const fetchData = async () => {

      await callApiRead("DownloadableContent")
        .then(response => {
          setContent(response.data)
          console.log(response)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });

    }

    fetchData();

  }, []);


    
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
            <Typography sx={{ my: 2, color: 'black', display: 'block' }}>
               <h2>{down.title}</h2>
             
              <Button onClick={handleDownloadContent()}>Descargar</Button>
              
            </Typography>
            
          </div>
            ))}
        </div>
    );
}
 
export default ContentLista;