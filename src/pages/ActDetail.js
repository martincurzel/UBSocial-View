import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiRead } from "../helpers/apiCallRead";



const ActDetail = () => {

    
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

         
         

      }, []);
    
    return (
        <div className="Act-Detail">
            
            {activity && (
                <article>
                    <h2>{activity.title}</h2>
                    <p>{activity.URLphotos}</p>
                    <div>{activity.description}</div> 
                </article>
            )}
        </div>
        
    );
}
 
export default ActDetail;