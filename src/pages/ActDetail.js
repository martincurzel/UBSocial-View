import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiRead } from "../helpers/apiCallRead";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { callApiNoRead } from '../helpers/apiCallNoRead';
import { Button } from '@mui/material';

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

  const handleJoin = (act) => {
    const updatedActivity = { ...activity };

    updatedActivity.isJoined = !updatedActivity.isJoined;
    if(updatedActivity.isJoined === true){
      updatedActivity.members = updatedActivity.members + 1;
    }
    else{
      updatedActivity.members = updatedActivity.members - 1;
    }

    callApiNoRead("POST", "Activity/join/" + act.id, null)
      .then(response => {
        console.log(response);
        setActivity(updatedActivity);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:', error);
        // Revert the button state if the API call fails
        updatedActivity.isJoined = !updatedActivity.isJoined;
        setActivity(updatedActivity);
      });
  };

  return (
    <div style={{ margin: '20px' }}>
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
                  border: '1.5px solid rgba(108,26,123,255)',
                  borderRadius: 3,
                  paddingTop: 3,
                }}
              >
                <div className="container">
                  <Typography className="mb-4" variant="h5" style={{ wordWrap: 'break-word' }}>{activity.title}</Typography>
                  <p className="mb-3" style={{ wordWrap: 'break-word' }}>Contacto: {activity.contact}</p>
                  <p className="mb-3" style={{ wordWrap: 'break-word' }}>Cantidad de miembros: {activity.members}</p>
                  <p className="mb-3" style={{ wordWrap: 'break-word' }}>Fecha: {activity.dateFinishActivity}</p>
                  {activity.isJoined === null ? (
                  <>
                  </>
                  // eslint-disable-next-line
                  ) : activity.isJoined == false ? (
                  <div className="mb-4">
                    <Button onClick={() => handleJoin(activity)} variant="outlined" color="secondary">
                      unirme
                    </Button>
                  </div>
                  ) : (
                  <div className="mb-4">
                    <Button onClick={() => handleJoin(activity)} variant="outlined" color="secondary">
                      dejar
                    </Button>
                  </div>
                  )}
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
              border: '1.5px solid rgba(108,26,123,180)',
              borderRadius: 3,
              marginTop: "3rem !important",
              paddingTop: 2,
              paddingBottom: 2
            }}
          >
            <div className="container" style={{ wordWrap: 'break-word' }}>
              <Typography variant="p">{activity.description}</Typography>
            </div>

          </Box>
        </div>
      )}      
    </div>

  );
}

export default ActDetail;