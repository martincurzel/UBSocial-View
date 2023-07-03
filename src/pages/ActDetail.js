import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiRead } from "../helpers/apiCallRead";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const ActDetail = () => {

  const params = useParams();
  const [activity, setActivity] = useState([]);
  const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

  useEffect(() => {

    const fetchData = async () => {

      await callApiRead("Activity/ActivityIdentifier/" + params.id)
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
        <div>
          <div className="row justify-content-around">
            <div className="col-md-5 mt-4">            
              <img className="w-100" src={BASE_PATH + activity.URLphotos} alt="foto"></img>
            </div>
            <div className="col-md-4">
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  border: '1.5px solid rgba(108,26,123,255)',
                  borderRadius: 3
                }}
              >
                <div className="container">
                  <Typography className="mb-4" variant="h3">{activity.title}</Typography>
                  <p className="mb-3">Contacto: {activity.contact}</p>
                  <p className="mb-3">Cantidad de miembros: {activity.members}</p>
                  <p className="mb-3">Fecha: {activity.dateFinishActivity}</p>
                </div>

              </Box>
            </div>
          </div>

          <hr className="mt-5" />
          <Typography variant="h4">Descripción</Typography>
          <hr />
          <Box
            sx={{
              width: '100%',
              height: 300,
              border: '1.5px solid rgba(108,26,123,180)',
              borderRadius: 3,
              marginTop: "3rem !important"
            }}
          >
            <div className="container">
              <Typography variant="p">{activity.description}</Typography>
            </div>

          </Box>
        </div>
      )}      
    </div>

  );
}

export default ActDetail;