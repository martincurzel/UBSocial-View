import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiRead } from "../helpers/apiCallRead";
import { useNavigate} from "react-router-dom";
import { Button } from '@mui/material';

const ContenidoDetail = () => {

    let navigate = useNavigate();
    const params = useParams();
    const [content, setContent]= useState([])

    useEffect(() => {
        
        const fetchData = async () => {
    
          await callApiRead("downloadableContent/"+ params.id)
            .then(response => {
              setContent(response.data[0])
              console.log(response)
            })
            .catch(error => {
              // Handle any errors from the API
              console.error('Error:', error);
            });
    
        }
        
    
        fetchData();

         
         

      }, [params.id]);
    
    return (
        <div className="Content-Detail" style={{ margin: '20px' }}>
            
            {content && (
                <article>
                    <h2>{content.title}</h2>
                    <p>{content.URLphotos}</p>
                    <div>{content.description}</div>
                    <Button onClick={() => navigate(-1)} variant="outlined" color="secondary">Atrás</Button>  
                </article>
            )}
        </div>
        
    );
}
 
export default ContenidoDetail;