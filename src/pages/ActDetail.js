import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiRead } from "../helpers/apiCallRead";
import { useNavigate} from "react-router-dom";
import { Button } from '@mui/material';

const ActDetail = () => {

    let navigate = useNavigate();
    const params = useParams();
    const [activity, setActivity]= useState([])
    

    useEffect(() => {
        
        const fetchData = async () => {
    
          await callApiRead("Activity/ActivityIdentifier/"+ params.id)
            .then(response => {
              setActivity(response.data[0])
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
        <div className="Act-Detail" style={{ margin: '20px' }}>
            
            {activity && (
                <article>
                    <h2>{activity.title}</h2>
                    {/* <p>{activity.URLphotos}</p> */}
                    <p>{activity.URLphotos}</p>
                    {activity.URLphotos && <img src={activity.URLphotos} />}
                    <div>{activity.description}</div>
                    <Button onClick={() => navigate(-1)} variant="outlined" color="secondary">Atrás</Button>  
                </article>
            )}
        </div>
        
    );
}
 
export default ActDetail;